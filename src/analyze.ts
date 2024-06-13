import * as fs from 'fs/promises';
import * as vscode from 'vscode';

export interface SarifLog {
  runs: Array<{
    results: Array<{
      message: {
        text: string;
      };
    }>;
  }>;
}

export async function analyzeCodebase(sarifFiles: vscode.Uri[]): Promise<SarifLog[]> {
  const results: SarifLog[] = [];
  for (const file of sarifFiles) {
    try {
      const content = await fs.readFile(file.fsPath, 'utf8');
      const result: SarifLog = JSON.parse(content);
      results.push(result);
    } catch (error) {
      if (error instanceof Error) {
        vscode.window.showErrorMessage(`Failed to read or parse SARIF file: ${file.fsPath}. Error: ${error.message}`);
      } else {
        vscode.window.showErrorMessage(`Failed to read or parse SARIF file: ${file.fsPath}.`);
      }
    }
  }
  return results;
}
