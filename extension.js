const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    let disposable = vscode.commands.registerCommand('terminal-to-here.cdToCurrentFile', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        let document = editor.document;
        let filePath = document.fileName;

        if (process.platform === 'win32') {
            filePath = filePath.replace(/\\/g, '/'); // Properly escape backslashes on Windows
        }

        const folderPath = filePath.substring(0, filePath.lastIndexOf('/'));

        const terminal = vscode.window.activeTerminal || vscode.window.createTerminal();
        terminal.sendText(`cd "${folderPath}"`);
        terminal.show();
    });

    context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('terminal-to-here.newTerminalInCurrentFile', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        let document = editor.document;
        let filePath = document.fileName;

        if (process.platform === 'win32') {
            filePath = filePath.replace(/\\/g, '/'); // Properly escape backslashes on Windows
        }

        const folderPath = filePath.substring(0, filePath.lastIndexOf('/'));

        const terminal = vscode.window.createTerminal({ cwd: folderPath });
        terminal.show();
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('terminal-to-here.navigateUp', function () {
        // The code you place here will be executed every time your command is executed
        const terminal = vscode.window.activeTerminal || vscode.window.createTerminal();
        if (terminal) {
            terminal.sendText('cd ..');
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
