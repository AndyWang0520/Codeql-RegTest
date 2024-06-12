import * as vscode from 'vscode';
import { authenticate } from './github';
import { analyzeCodebase } from './analyze';
import { compareScans } from './compare';
import { showResults } from './ui';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('codeql-detective.start', async () => {
    await authenticate();

    const sarifFiles = await vscode.window.showOpenDialog({ 
      canSelectMany: true, 
      filters: { 'SARIF files': ['sarif'] },
      defaultUri: vscode.Uri.file('/path/to/codeql-reg/tensorflow') // Ensure this path points to your TensorFlow SARIF results directory
    });

    if (!sarifFiles) {
      return;
    }

    const results = await analyzeCodebase(sarifFiles);
    const newIssues = compareScans(results);
    showResults(newIssues);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
