import * as vscode from "vscode";

const MUMO_MCP_URL = "https://mumo.chat/api/mcp";
const API_KEY_SECRET = "mumo.apiKey";

export async function activate(context: vscode.ExtensionContext) {
  const didChange = new vscode.EventEmitter<void>();
  context.subscriptions.push(didChange);

  context.subscriptions.push(
    vscode.commands.registerCommand("mumo.setApiKey", async () => {
      const key = await promptForKey();
      if (key) {
        await context.secrets.store(API_KEY_SECRET, key);
        vscode.window.showInformationMessage("mumo API key saved.");
        didChange.fire();
      }
    }),
    vscode.commands.registerCommand("mumo.openSessions", () => {
      vscode.env.openExternal(vscode.Uri.parse("https://mumo.chat/s"));
    })
  );

  context.subscriptions.push(
    vscode.lm.registerMcpServerDefinitionProvider("mumo", {
      onDidChangeMcpServerDefinitions: didChange.event,
      provideMcpServerDefinitions: async () => [
        new vscode.McpHttpServerDefinition(
          "mumo",
          vscode.Uri.parse(MUMO_MCP_URL),
          {},
          context.extension.packageJSON.version
        ),
      ],
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
