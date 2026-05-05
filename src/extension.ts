import * as vscode from "vscode";

const DEFAULT_MCP_URL = "https://mumo.chat/api/mcp";
const API_KEY_SECRET = "mumo.apiKey";
const SERVER_URL_SETTING = "mumo.serverUrl";

export async function activate(context: vscode.ExtensionContext) {
  const didChange = new vscode.EventEmitter<void>();
  context.subscriptions.push(didChange);

  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBar.command = "mumo.setApiKey";
  context.subscriptions.push(statusBar);

  async function refreshStatusBar(): Promise<void> {
    const key = await context.secrets.get(API_KEY_SECRET);
    if (key) {
      statusBar.text = "$(comment-discussion) mumo";
      statusBar.tooltip = "mumo is configured. Click to update the API key.";
    } else {
      statusBar.text = "$(warning) mumo: no key";
      statusBar.tooltip = "mumo needs an API key. Click to set it.";
    }
    statusBar.show();
  }

  await refreshStatusBar();

  context.subscriptions.push(
    vscode.commands.registerCommand("mumo.setApiKey", async () => {
      const key = await promptForKey();
      if (key) {
        await context.secrets.store(API_KEY_SECRET, key);
        vscode.window.showInformationMessage("mumo API key saved.");
        didChange.fire();
      }
      await refreshStatusBar();
    }),
    vscode.commands.registerCommand("mumo.openSessions", () => {
      vscode.env.openExternal(vscode.Uri.parse("https://mumo.chat/s"));
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(SERVER_URL_SETTING)) {
        didChange.fire();
        void refreshStatusBar();
      }
    })
  );

  context.subscriptions.push(
    vscode.lm.registerMcpServerDefinitionProvider("mumo", {
      onDidChangeMcpServerDefinitions: didChange.event,
      provideMcpServerDefinitions: async () => {
        const url = resolveServerUrl();
        return [
          new vscode.McpHttpServerDefinition(
            "mumo",
            vscode.Uri.parse(url),
            {},
            context.extension.packageJSON.version
          ),
        ];
      },
      resolveMcpServerDefinition: async (server: vscode.McpHttpServerDefinition) => {
        let key = await context.secrets.get(API_KEY_SECRET);

        if (!key) {
          const action = await vscode.window.showInformationMessage(
            "mumo needs an API key. Create one at mumo.chat/settings/api-keys.",
            "Enter key",
            "Get a key"
          );

          if (action === "Get a key") {
            await vscode.env.openExternal(
              vscode.Uri.parse("https://mumo.chat/settings/api-keys")
            );
            return undefined;
          }

          if (action === "Enter key") {
            const newKey = await promptForKey();
            if (newKey) {
              await context.secrets.store(API_KEY_SECRET, newKey);
              key = newKey;
              await refreshStatusBar();
            }
          }
        }

        if (!key) {
          return undefined;
        }

        return new vscode.McpHttpServerDefinition(
          server.label,
          server.uri,
          { Authorization: `Bearer ${key}` },
          server.version
        );
      },
    })
  );
}

function resolveServerUrl(): string {
  const configured = vscode.workspace
    .getConfiguration()
    .get<string>(SERVER_URL_SETTING);
  if (typeof configured === "string" && configured.trim().length > 0) {
    return configured.trim();
  }
  return DEFAULT_MCP_URL;
}

async function promptForKey(): Promise<string | undefined> {
  return vscode.window.showInputBox({
    prompt: "Enter your mumo API key",
    placeHolder: "mmo_live_...",
    ignoreFocusOut: true,
    password: true,
    validateInput: (value) => {
      if (!value) {
        return "Key is required";
      }
      if (!value.startsWith("mmo_live_")) {
        return "Keys should start with mmo_live_";
      }
      return null;
    },
  });
}

export function deactivate() {}
