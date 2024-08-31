import { commands, ExtensionContext } from "vscode";
import { SveltePanel } from "./panel";
import * as vscode from 'vscode'
import path from 'path';
import fs from 'fs';
import dirTree from 'directory-tree'

function setupExtension(context: ExtensionContext) {
	const FILE_JSON = vscode.Uri.file(path.join(context.extensionPath, "src", 'file.json'));
	const cwd = vscode.workspace.workspaceFolders![0].uri.fsPath;

	SveltePanel.currentPanel?.post({title: "cwd",  msg: cwd});
	SveltePanel.currentPanel?.post({title: "file", msg: fs.readFileSync(FILE_JSON.fsPath, 'utf8')});
	SveltePanel.currentPanel?.post({title: "dir",  msg: JSON.stringify(dirTree(cwd, {attributes: [
		"size", "type"
	]}))});
}

export function activate(context: ExtensionContext) {
    const showHelloWorldCommand = commands.registerCommand("file-makeup-viewer.show-makeup", () => {
		SveltePanel.render('showPanel', 'File Makeup', context.extensionUri);
		SveltePanel.currentPanel?.panel.onDidChangeViewState(e => {
			setupExtension(context);
		}, null, context.subscriptions)

		setupExtension(context);
    });

	context.subscriptions.push(showHelloWorldCommand);
}
