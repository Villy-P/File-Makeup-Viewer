import { commands, ExtensionContext } from "vscode";
import { HelloWorldPanel } from "./panels/HelloWorldPanel";

export function activate(context: ExtensionContext) {
    const showHelloWorldCommand = commands.registerCommand("file-makeup-viewer.show-makeup", () => {
		HelloWorldPanel.render(context.extensionUri);

		HelloWorldPanel.currentPanel?.post({title: "cwd", msg: vscode.workspace.workspaceFolders![0].uri.fsPath})
    });

	context.subscriptions.push(showHelloWorldCommand);
}
