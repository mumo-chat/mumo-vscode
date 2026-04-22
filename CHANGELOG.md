# Changelog

## 0.1.0 — 2026-04-22

Initial release.

- Registers `mumo` MCP server via VS Code's `lm.registerMcpServerDefinitionProvider` API (stable on VS Code 1.101+). Streamable-HTTP transport to `https://mumo.chat/api/mcp`.
- First-run API key prompt; key stored in VS Code `SecretStorage` (OS-native keychain). No env-var export required.
- Commands: `mumo: Set API Key`, `mumo: Open Recent Sessions`.
- 512×512 dark-background icon (shared with the Claude Code / Cursor plugins).
- Auto-triggering skill from `mumo-chat/mumo-mcp` is not bundled in v0.1.0 — VS Code's extension packaging for SKILL.md bundling is still unclear. Users who want skill auto-triggering should additionally install via the GitHub MCP Registry (pending listing).
