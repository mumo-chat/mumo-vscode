# Changelog

## 0.4.0 — 2026-06-19

Coordinated release — all clients aligned on 0.4.0. Skill triggering + prompt-voice updates (Trello #245), rendered from the mumo-mcp baseline.

- Triggering: dropped the "contested" gate — the description now leads with pre-implementation review (esp. anything touching auth, security, tokens, payments, data exposure, or migrations), not "contested decisions only."
- Author-bias counter (When to use): if you authored the plan or code under review, that's a reason FOR a panel — the author is the worst-positioned reviewer of their own work.
- New "Prompt voice" section: write the prompt first-person as the operator, not "You are X" case-study framing.
- Surface `claim_map_url` after each round so the user can open the claim map directly.

## 0.3.2 — 2026-05-22

README update.

## 0.3.1 — 2026-05-05

Marketplace listing cleanup. No runtime behavior change.

- README intro tightened; cross-IDE pointers removed.
- "Why explicit invocation" rewritten with positive framing — "naming `mumo` routes deterministically" — replacing the prior comparison-based framing.

## 0.3.0 — 2026-05-05

Native UX lift. The runtime MCP path is unchanged — same `https://mumo.chat/api/mcp`, same `SecretStorage`-backed key flow. What changes is everything around the install moment.

- **Walkthrough** — auto-opens on first install. Three steps: create a mumo API key, paste it via the **mumo: Set API Key** command, try mumo in Copilot Chat with a copyable sample prompt. Closes the "where does the key go?" gap that previously left first-time users hunting.
- **Status bar item** — persistent `$(comment-discussion) mumo` when configured, `$(warning) mumo: no key` when not. Clicking it opens the key prompt. Refreshes on activate, after every key-set, and on `mumo.serverUrl` config changes.
- **`mumo.serverUrl` setting** — override the MCP endpoint for self-hosted or staging. Read inside `provideMcpServerDefinitions` so config changes take effect without a window reload; `onDidChangeConfiguration` fires the provider's `didChange` event.
- **`untrustedWorkspaces.supported: true`** — the extension only stores a secret and registers a remote HTTP MCP server. No filesystem reads, no command execution. Trust prompt is gone.
- **`skills/` excluded from the published `.vsix`** — VS Code has no `SKILL.md` loader, so the directory was inert dead weight in the bundle. Still in the GitHub repo for reference.

## 0.2.0 — 2026-05-05

Architecture rewrite. VS Code's Copilot agent doesn't consume `SKILL.md` directly the way some other host agents do, so the skill content ships as informational reference, not active behavior. The MCP server registration + native `SecretStorage` for the API key are unchanged.

- `package.json` — version bump to 0.2.0, author updated to `mumo`, homepage updated to `/install`, description updated to "Multi-model deliberation panel...", keywords reorganized.
- README — `wait_for_round` added to the tool list (seven tools, was missing since 0.1.2). Links repointed to `/install` and `/docs/mcp`.
- `skills/mumo/SKILL.md`, `skills/mumo/playbooks/`, `skills/mumo/reference/` — added for informational reference. Inert in VS Code today; if Copilot's skill story matures, the content is already in place.

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
- 512×512 dark-background icon.
