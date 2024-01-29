import { commands, ExtensionContext } from "vscode";
import { HelloWorldPanel } from "./panels/HelloWorldPanel";

export function activate(context: ExtensionContext) {
    const showHelloWorldCommand = commands.registerCommand("file-makeup-viewer.show-makeup", () => {
		HelloWorldPanel.render(context.extensionUri);
    });

	context.subscriptions.push(showHelloWorldCommand);
}
