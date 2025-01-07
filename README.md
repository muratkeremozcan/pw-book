# Cy, Node template

A template with tooling, configuration and best practices for a Cy api e2e testing in a Node.js project.

## Setup

```bash
npm i
```

Use the sample `.env.example` file to create a `.env` file of your own. These values will also have to exist in your CI secrets.

```bash
SERVERPORT=3001
```

### Scripts

```bash
npm run lint
npm run typecheck
npm run fix:format
npm run validate # all the above in parallel

npm run pw:open       # open mode
npm run pw:open-debug # open with debug
npm run pw:run        # run mode
npm run pw:run-debug  # run with debug
npm run pw:trace      # drag & drop a trace.zip from local or CI
npm run pw:codegen    # point-and-click wizard
npm run pw:clear      # remove all temporary pw files
```
