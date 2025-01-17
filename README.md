# Pw examples

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
npm run pw:run-smoke  # grep run by tag
npm run pw:burn-in-changed # the new/changed files in this commit (recommended)
npm run pw:burn-in -- pw/iframe.spec.ts # test burn-in: specific file
npm run pw:burn-in -- --grep "dropdown" # Run burn-in with pattern
```
