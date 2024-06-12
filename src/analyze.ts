import * as fs from 'fs';
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
    const content = fs.readFileSync(file.fsPath, 'utf8');
    const result: SarifLog = JSON.parse(content);
    results.push(result);
  }
  return results;
}
