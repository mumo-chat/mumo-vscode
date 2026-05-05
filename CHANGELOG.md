# Changelog

## 0.3.1 — 2026-05-05

Marketplace listing cleanup. No runtime behavior change.

- README intro no longer directs visitors to companion plugins for other IDEs. Cross-product discovery stays in the footer Links section where it belongs.
- "Why explicit invocation" rewritten without comparison to other agent platforms. The positive framing ("naming `mumo` routes deterministically") replaces the previous "VS Code's Copilot doesn't have what those other platforms have" framing.

## 0.3.0 — 2026-05-05

Native UX lift. The runtime MCP path is unchanged — same `https://mumo.chat/api/mcp`, same `SecretStorage`-backed key flow. What changes is everything around the install moment.

- **Walkthrough** — auto-opens on first install. Three steps: create a mumo API key, paste it via the **mumo: Set API Key** command, try mumo in Copilot Chat with a copyable sample prompt. Closes the "where does the key go?" gap that previously left first-time users hunting.
- **Status bar item** — persistent `$(comment-discussion) mumo` when configured, `$(warning) mumo: no key` when not. Clicking it opens the key prompt. Refreshes on activate, after every key-set, and on `mumo.serverUrl` config changes.
- **`mumo.serverUrl` setting** — override the MCP endpoint for self-hosted or staging. Read inside `provideMcpServerDefinitions` so config changes take effect without a window reload; `onDidChangeConfiguration` fires the provider's `didChange` event.
- **`untrustedWorkspaces.supported: true`** — the extension only stores a secret and registers a remote HTTP MCP server. No filesystem reads, no command execution. Trust prompt is gone.
- **`skills/` excluded from the published `.vsix`** — VS Code has no `SKILL.md` loader, so the directory was inert dead weight in the bundle. Still in the GitHub repo as cross-repo reference.

## 0.2.0 — 2026-05-05

Architecture parity with [`mumo-mcp@0.2.x`](https://github.com/mumo-chat/mumo-mcp) and [`mumo-cursor@0.2.x`](https://github.com/mumo-chat/mumo-cursor). VS Code's Copilot agent doesn't consume `SKILL.md` directly the way Claude Code and Cursor do, so the skill content ships as informational/cross-repo reference, not active behavior. The MCP server registration + native `SecretStorage` for the API key are unchanged.

- `package.json` — version bump to 0.2.0, author updated to `mumo`, homepage updated to `/install`, description aligned with the family ("Multi-model deliberation panel..."), keywords reorganized.
- README — `wait_for_round` added to the tool list (seven tools, was missing since 0.1.2). Cowork dropped from cross-references. Links repointed to `/install` and `/docs/mcp`.
- `skills/mumo/SKILL.md`, `skills/mumo/playbooks/`, `skills/mumo/reference/` — copied over from the v0.2.x skill content for cross-repo consistency. Inert in VS Code today; if Copilot's skill story matures, no source-of-truth divergence to reconcile.

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
