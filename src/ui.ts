import * as vscode from 'vscode';
import { exec } from 'child_process';

export function showResults(newIssues: any[]): void {
  const panel = vscode.window.createWebviewPanel(
    'codeqlDetectiveResults',
    'CodeQL Detective Results',
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  const issueList = newIssues.map(issue => `
    <li class="issue">
      <div class="issue-hash">Hash: ${issue.partialFingerprints.primaryLocationLineHash.split(":")[0]}</div>
      <div class="issue-file">File: ${issue.locations[0].physicalLocation.artifactLocation.uri}</div>
      <div class="issue-message">Message: ${issue.message.text}</div>
    </li>
  `).join('');
  
  panel.webview.html = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          background-color: #f5f5f5;
        }
        .issue {
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background-color: #fff;
        }
        .issue-hash, .issue-file, .issue-message {
          margin-bottom: 5px;
          font-size: 14px;
        }
        .issue-hash {
          color: #007acc;
        }
        .issue-file {
          color: #585858;
        }
        .issue-message {
          color: #a31515;
        }
      </style>
    </head>
    <body>
      <h1>New Issues Detected</h1>
      <ul>
        ${issueList}
      </ul>
      <button onclick="filterIssues()">Filter</button>
      <script>
        function filterIssues() {
          // Implement filtering logic
        }
      </script>
    </body>
  </html>
`;
}
