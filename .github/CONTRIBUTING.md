# Contribution Guidelines

## Before you start

Make sure your idea hasn't already been added (see `Upcoming` under [`CHANGELOG.md`](../CHANGELOG.md))

## **Issues**

1. Make sure the issue you have hasn't already been encountered.
2. Fill out the issue template, being sure to add as many details as possible as well as steps to reproduce your issue.

## **Pull Requests**

### Adding files

Adding files is a good way to make your first pull request.

All files are stored within [`.\src\file.json`](../src/file.json).
Any file extensions are welcome, even the most obscure, but make sure the data is true and the file does not already exist.
You can press the edit button in the top right corner to fork the repo and quickly edit the file, adding the files you need, be sure your addition follows these rules:

1. Style your contribution in the same way all other files are within the files.
2. Add a `name` that corresponds to the name of the file. For example, `.html` files will be `HTML`. Additionally, the name will be suffixed with `File` in the graph.
3. Add an `file` extension. This starts with a period, then the file name (e.x. `.html` `.svelte` `.js`).
4. Add an `color`. If your file has an easily recognizable logo (like Reacts atom logo), use the primary color of that logo. If not, use another color.
5. (Optional) If your file is a language file (`.cpp` `.java` `.python`) or relating to a language (`.hpp` `.h`), add `lang: true` to the JSON object. `lang` defaults to false, so don't put `lang: false` for non-language files.
6. (Optional) If your file is related to another language (like `.hpp` for `.cpp` files or `.mjs / .cjs` for `.js` files) add `groupWith: file_extension`.

Name your PR `Added Files file1_name, file2name, etc.`

### Changing the source code

Want to change the source code to add a new feature or solve an issue?

These are the folders you want to look out for:

``` txt
.
├── src
│   └── extension.ts        // Backend of the extension
└── webview-ui
    └── src
        ├── App.svelte      // The webpanel containing TS and the UI
        └── styles
            └── style.css   // CSS of the application
```

Fork the repo, then run these commands:

``` cmd
npm i
cd webview-ui
npm i
cd ..
```

After that, make your changes.

To run the extension, run `npm run build:webview` to update the code.
Then press `F5` to run the extension.

> You must run `npm run build:webview` after making any changes

Once you're finished

1. Open a pull request.
2. If your PR solved an issue, be sure to reference it in the title.
3. Write a detailed explanation about what your PR does
4. Wait for the PR to be merged

## Final Remarks

Once accepted, your PR will appear in the next version of File Makeup Viewer

Thank you for opening a pull request!
