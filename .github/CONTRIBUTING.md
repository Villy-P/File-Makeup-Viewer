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
7. Add a list of all files added to the unreleased section of `CHANGELOG.md` It should be under `#### Files` under `### Added` within `# Unreleased`. See release `1.0.0` for an example.

> You can run `.\src\scripts\getFilesForChangelog.mjs` to get a list of all files in `file.json` to put into the changelog.
> Make sure you aren't copying files already included in previous releases.

Name your PR `Added number_of_files Files`, and add the changes into the changelog for what you did under `Unreleased`.

### Changing the source code

Want to change the source code to add a new feature or solve an issue?

These are the folders you want to look out for:

``` txt
.
└── src
    ├── extension         
    │   └── extension.ts   // Backend of the extension
    ├── App.svelte         // The main webpanel
    ├── ui                 // Folder containing all UI Svelte Components
    └── app.css            // File containing all CSS
```

> Although there is a CSS file, try using Tailwind for any elements in `App.svelte`
> If you are changing something in the `ui` folder, update the `CSS` in the `style` tag.

Fork the repo, then run `npm install`

After that, make your changes.

To run the extension, run `npm run compile` to update the code.
Then press `F5` to run the extension.

> The command `npm run compile` will automatically run whenever you change the frontend or backend code
> Because of ths, in order to refresh the page you can close the tab and reopen it using `Ctrl-Shift-P` > `Display File Makeup`

Add your changes, additions, or removals to the `Unreleased` section of `CHANGELOG.md`.
This project follows [this](https://keepachangelog.com/en/1.1.0/) format.

Once you're finished

1. Open a pull request.
2. If your PR solved an issue, be sure to reference it in the title.
3. Write a detailed explanation about what your PR does
4. Wait for the PR to be merged

## Final Remarks

Once accepted, your PR will appear in the next version of File Makeup Viewer

Thank you for opening a pull request!
