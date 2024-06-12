import * as vscode from 'vscode';
import { Octokit } from '@octokit/rest';

let octokit: Octokit;

export async function authenticate() {
  const token = await vscode.window.showInputBox({ prompt: 'Enter your GitHub Personal Access Token' });
  if (!token) {
    vscode.window.showErrorMessage('GitHub token is required');
    return;
  }

  octokit = new Octokit({ auth: token });
}

export async function getCommitDetails(repo: string, commitHash: string) {
  const [owner, repoName] = repo.split('/');
  const commit = await octokit.repos.getCommit({ owner, repo: repoName, ref: commitHash });
  return commit.data;
}

export async function getCommitDiff(repo: string, base: string, head: string) {
  const [owner, repoName] = repo.split('/');
  const diff = await octokit.repos.compareCommits({ owner, repo: repoName, base, head });
  return diff.data;
}
