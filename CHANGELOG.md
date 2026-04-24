# Changelog

## 0.1.2 — 2026-04-24

- README updated: the upstream server now exposes a sixth MCP tool, `get_credit` (wallet balance + bucket breakdown + autorefill state). No extension-side code change — the tool is registered by the server; the README update makes it visible on the Marketplace listing.

## 0.1.1 — 2026-04-22

Listing refresh + toolchain compatibility. No runtime behavior change.

- Refreshed listing copy to lead with the cross-model reactions + iterative rounds value proposition.
- Added screenshots to the README: Copilot Chat invocation in VS Code, the mumo.chat claim map, and a multi-round session carrying context forward.
- Compatibility: explicit `activationEvents: []` in the manifest for `@vscode/vsce` 3.x, which now rejects `main`-declaring manifests that omit the property.
- Compatibility: narrowed the `resolveMcpServerDefinition` `server` parameter type to `McpHttpServerDefinition` — `@types/vscode` 1.116 tightened the callback union, which surfaced a `TS2339` on `server.uri`.

## 0.1.0 — 2026-04-22

Initial release.

- Registers `mumo` MCP server via VS Code's `lm.registerMcpServerDefinitionProvider` API (stable on VS Code 1.101+). Streamable-HTTP transport to `https://mumo.chat/api/mcp`.
- First-run API key prompt; key stored in VS Code `SecretStorage` (OS-native keychain). No env-var export required.
- Commands: `mumo: Set API Key`, `mumo: Open Recent Sessions`.
- 512×512 dark-background icon (shared with the Claude Code / Cursor plugins).
- Auto-triggering skill from `mumo-chat/mumo-mcp` is not bundled in v0.1.0 — VS Code's extension packaging for SKILL.md bundling is still unclear. Users who want skill auto-triggering should additionally install via the GitHub MCP Registry (pending listing).
