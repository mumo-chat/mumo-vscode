# mumo — VS Code extension

**Multi-model responses + cross-model reactions. Want more rounds? Context carries automatically. Stop when you have what you need.**

Claude, GPT, Gemini, Grok, Qwen, GLM, Kimi in parallel. For contested decisions — architecture, plan review, strategy — where a single model might be confidently wrong.

---

![Copilot Chat in VS Code invokes mumo via MCP](./images/screenshot-copilot-invocation.png)

*Invoke mumo from Copilot Chat — the agent routes through MCP, convenes the panel, and returns the models' synthesis inside VS Code.*

![The mumo claim map — what every model agreed on, challenged, or flagged for deeper exploration](./images/screenshot-claim-map.png)

*The claim map at [mumo.chat](https://mumo.chat) — each contested statement plus every model's reaction (keep, challenge, explore, core, shift). Not a consensus answer; the structure underneath it.*

![A multi-round mumo session carrying context forward across rounds](./images/screenshot-rounds.png)

*Context carries forward automatically — add follow-up rounds until you have what you need, without re-pasting anything.*

---

## What's in the box

- **MCP server registration** — wires `https://mumo.chat/api/mcp` into VS Code's MCP provider registry. Seven tools: `create_deliberation`, `wait_for_round`, `append_round`, `get_session`, `list_sessions`, `list_models`, `get_credit`.
- **Native key storage** — uses VS Code's `SecretStorage` (macOS Keychain / Windows Credential Manager / Linux libsecret). No `MUMO_API_KEY` env-var export required.
- **Walkthrough** — auto-opens on first install: create a key, paste it, try mumo in Copilot Chat.
- **Status bar** — shows `mumo` when configured, `mumo: no key` otherwise. Click to set the key.
- **Settings** — override the server URL (`mumo.serverUrl`) for self-hosted or staging endpoints.
- **Commands** — `mumo: Set API Key` (re-prompt), `mumo: Open Recent Sessions` (opens mumo.chat).

## Install

```
ext install mumo.mumo-vscode
```

Or search `mumo` in the Extensions panel. The Get Started walkthrough opens automatically on first install — three steps to get you to your first deliberation. Create your mumo API key at [mumo.chat/settings/api-keys](https://mumo.chat/settings/api-keys) (keys start with `mmo_live_`).

## Using the panel

In Copilot Chat (Agent mode), invoke mumo explicitly for reliable routing:

- "Ask mumo about…"
- "Run this by a mumo panel"
- "Get me a second opinion from mumo on…"

See [mumo.chat/install](https://mumo.chat/install) for setup and [mumo.chat/docs/mcp](https://mumo.chat/docs/mcp) for the tool reference, the deliberation loop, and prompt patterns.

### Why explicit invocation

Copilot's agent mode picks tools based on intent. Naming `mumo` in your prompt routes the call deterministically; vague phrasings like "ask a panel" may resolve to a different tool or a generic Copilot response. The panel is available whenever you mention `mumo` in Agent chat.

## Requirements

- VS Code 1.101 or later (MCP extension API is stable as of this release)
- An active mumo account — sign up at [mumo.chat](https://mumo.chat)

## Links

- Product — https://mumo.chat
- Install guide — https://mumo.chat/install
- MCP reference — https://mumo.chat/docs/mcp
- REST API — https://mumo.chat/docs/api
- Issues — https://github.com/mumo-chat/mumo-vscode/issues

## License

MIT
