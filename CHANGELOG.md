# Changelog

## Unreleased — 2026-11-21

The bundled `skills/mumo/` files were re-rendered from the mumo-mcp 0.9.0 baseline, which goes with mumo MCP server 1.4.0: `wait_for_round` results are text only and the skill branches on the `Action:` line (the second line of the result); a new section, "Hand the wait to a subagent", covers delegating the wait where the client supports subagents; refusals start with `Error: <code>`; `references/operating-notes.md` and `references/synthesis.md` are updated to match. No extension code changed.

## Unreleased — 2026-11-20

The bundled `skills/mumo/` files were re-rendered from the mumo-mcp 0.8.0 baseline: the skill says "reactions" where it said "claim map", and two reference files are renamed (`references/claim-maps.md` is now `references/reading-reactions.md`; `references/snippets.md` is now `references/writing-reactions.md`). The extension does not ship those files, and the extension itself is unchanged.

## 0.7.0 — 2026-11-19

Coordinated client release rendered from the mumo-mcp 0.7.0 baseline.

- New tool: `ask_a_model` puts a question to one model of your choice and returns one answer, with no cross-model reactions or claim map. The extension registers the server without a tool allowlist, so the tool is available as soon as the server lists it.
- README tool list updated; the bundled `skills/mumo/SKILL.md` re-rendered from the baseline (the extension does not ship it).

## 0.6.0 — 2026-09-08

Coordinated client release rendered from the mumo-mcp 0.6.0 baseline. Version jumps from 0.3.2 to rejoin the shared line: the 0.5.0 skill content landed on 2026-07-04 without a release.

- `README.md`: all eight tools named (`share_session` was missing); intro names the current model families and the typed cross-model reactions.
- `skills/mumo/SKILL.md` (repo-facing only; not shipped in the `.vsix`): `share_session` in the tools table; `wait_for_round` one-id form; updated intro. `references/operating-notes.md` re-synced.
- No change to the extension code, MCP provider, or walkthrough.

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
