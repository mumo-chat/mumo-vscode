# Try mumo in Copilot Chat

mumo's tools are available to Copilot's agent automatically, but the agent doesn't always reach for them. Naming **mumo** explicitly the first time makes the routing reliable.

[Open Copilot Chat](command:workbench.action.chat.open)

Then paste a prompt that names mumo. Examples:

```
Ask mumo to compare Postgres and MongoDB for our event store.
Include the constraints from this repo and tell me where the models disagree.
```

```
Run this design doc by a mumo panel — what would we regret 6 months in?
```

The first round returns each model's prose plus a cross-model claim map. You can stop there or `append_round` with typed snippets (KEEP / EXPLORE / CHALLENGE / CORE / SHIFT) to steer further.
