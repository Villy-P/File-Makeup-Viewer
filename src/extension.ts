import { commands, ExtensionContext } from "vscode";
import { HelloWorldPanel } from "./panels/HelloWorldPanel";
import * as vscode from 'vscode'
import path = require('path')
import fs = require('fs')
import dirTree from 'directory-tree'

export function activate(context: ExtensionContext) {
    const showHelloWorldCommand = commands.registerCommand("file-makeup-viewer.show-makeup", () => {
		HelloWorldPanel.render(context.extensionUri);

		const FILE_JSON = vscode.Uri.file(path.join(context.extensionPath, "src", 'file.json'));
		const cwd = vscode.workspace.workspaceFolders![0].uri.fsPath;

		HelloWorldPanel.currentPanel?.post({title: "cwd",  msg: cwd});
		HelloWorldPanel.currentPanel?.post({title: "file", msg: fs.readFileSync(FILE_JSON.fsPath, 'utf8')});
		HelloWorldPanel.currentPanel?.post({title: "dir",  msg: JSON.stringify(dirTree(cwd))});
    });

	context.subscriptions.push(showHelloWorldCommand);
}
