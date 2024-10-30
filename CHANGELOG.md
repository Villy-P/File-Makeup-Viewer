# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Upcoming

### Added

- Added `types/ui.ts`
- Added `Badge.svelte`
- Added `Button.svelte`
- Added `Checkbox.svelte`
- Added `Dropdown.svelte`
- Added `Option.svelte`
- Added `TextArea.svelte`
- Added `Tooltip.svelte`

### Changed

- Changed UI to conform to the VSCode style
- Moved `styles/style.css` to main `app.css` file
- Updated `animation.gif` to use the new UI style

### Fixed

- Fixed type error relating to ChartJS
- Fixed `CONTRIBUTING.md` having incorrect run command
- Fixed `CONTRIBUTING.md` having incorrect startup command
- Fixed `CONTRIBUTING.md` folder structure

## 1.1.1 - 2024-10-9

### Added

- Added PostCSS (`postcss.config.js`)
- Added Tailwind (`tailwind.config.js`)
- Added `app.css`
- Added Visual Studio Code badge to `README.md`

### Changed

- Converted CSS plugin to PostCSS in `rollup.config.mjs`
- Convert CSS styles to Tailwind in `App.svelte`

### Removed

- Deleted dev dependency rollup-plugin-css-only

## 1.1.0 - 2024-08-31

### Added

- Added new guidelines for contributing files
- Added Badges to `README.md`

#### Files

- `.vsix (Visual Studio Extension Installer)`
- `.vscodeignore (Visual Studio Code Ignore)`
- `.gif (Graphics Interchange Format)`
- `.svg (Scalable Vector Graphics)`
- `.meta (Unity Asset Metadata)`
- `.rsp (Response)`
- `.prefab (Prefab)`
- `.uss (Unity Style Sheet)`
- `.xcconfig (XCode Configuration File)`
- `.fbx (Filmbox)`
- `.obj (Object)`
- `.zip (ZIP)`

### Changed

- Changed the way `getFilesForChangelog.mjs` displayed files
- Updated version `1.0.0` to match this change
- Minified `pie-chart-683.png` and `animation.gif`
- Placed webview and extension code in the same `src` directory
- Updated all dependencies

### Fixed

- Fixed bug where extension tab would not function if user left and returned.

## 1.0.6 - 2024-04-29

### Fixed

- Fixed bug where directory name wouldn't show up

### Removed

- Removed `console.log` from `App.svelte`.

## 1.0.5 - 2024-04-29

### Added

- Added instructions to `CONTRIBUTING.md` to add things to `CHANGELOG.md` before opening Pull Request.
- Added `getFilesForChangelog.mjs` for easy additions.
- Added all previous file types to `1.0.0`.

### Fixed

- Fixed `animation.gif` not appearing.

### Changed

- Edited `animation.gif`

## 1.0.4 - 2024-04-29

### Fixed

- Fix dependencies not appearing in final build

## 1.0.0 - 2024-04-26

### Added

- Display Chart based on the current working directory
- Change between file size and file count
- Hide hidden directories
- Group related files
- Hide certain folders
- Display all files with extension
- Hide non-language files

#### Files

- `.md (Markdown)`
- `.html (HTML)`
- `.cpp (C++)`
- `.c (C)`
- `.json (JSON)`
- `.ts (TypeScript)`
- `.d.ts (Typescript Module)`
- `.d.ts.map (Typescript Module Map)`
- `.gitignore (Git Ignore)`
- `.js (JavaScript)`
- `.js.map (JavaScript Map)`
- `.mjs (EMCAScript)`
- `.cjs (CommonJS)`
- `.sample (Sample)`
- `.idx (Index)`
- `.pack (Git Packfile)`
- `.rev (Recovery)`
- `.ninja_deps (Ninja Dependency)`
- `.ninja_log (Ninja Log)`
- `.ninja (Ninja)`
- `.txt (Text)`
- `.cmake (CMake)`
- `.bin (Binary)`
- `.h (Header)`
- `.hpp (C++ Header)`
- `.cpp.obj (C++ Object)`
- `.exe (Executable)`
- `.check_cache (CMake Check Cache)`
- `.yaml (YAML)`
- `.glsl (GLSL)`
- `.css (CSS)`
- `.ps1 (Powershell Script)`
- `.png (PNG)`
- `.jpg (JPG)`
- `.java (Java)`
- `.jar (Java Archive)`
- `.cs (C#)`
- `.dll (Dynamic Link Library)`
- `.scss (SASS)`
- `.class (Java Class)`
- `.vue (Vue)`
- `.pdb (Program Database)`
- `.cache (Cache)`
- `.editorconfig (Editor Config)`
- `.ejs (Embedded Javascript)`
- `.csproj (C# Project)`
- `.props (C# Props)`
- `.py (Python)`
- `.pyc (Compiled Python Binaries)`
- `.ico (Icon)`
- `.svelte (Svelte)`
