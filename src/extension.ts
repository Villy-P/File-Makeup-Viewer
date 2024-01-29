import { commands, ExtensionContext } from "vscode";
import { HelloWorldPanel } from "./panels/HelloWorldPanel";
import * as vscode from 'vscode'
import path = require('path')
import fs = require('fs')

export function activate(context: ExtensionContext) {
    const showHelloWorldCommand = commands.registerCommand("file-makeup-viewer.show-makeup", () => {
		HelloWorldPanel.render(context.extensionUri);

		const FILE_JSON = vscode.Uri.file(path.join(context.extensionPath, "src", 'file.json'));

		HelloWorldPanel.currentPanel?.post({title: "cwd", msg: vscode.workspace.workspaceFolders![0].uri.fsPath});
		HelloWorldPanel.currentPanel?.post({title: "file", msg: fs.readFileSync(FILE_JSON.fsPath, 'utf8')})
    });

	context.subscriptions.push(showHelloWorldCommand);
}
