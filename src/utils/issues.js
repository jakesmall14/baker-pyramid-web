import { readdirSync } from 'fs';
import path from 'path';

export function getIssues() {
  const issuesDir = path.join(process.cwd(), 'public/issues');
  return readdirSync(issuesDir)
    .filter(f => /^pyramid-issue-(\d+)\.pdf$/.test(f))
    .map(f => {
      const num = parseInt(f.match(/(\d+)/)[1], 10);
      return { num, filename: f, url: `/issues/${f}` };
    })
    .sort((a, b) => a.num - b.num);
}

export function getLatestIssue() {
  const issues = getIssues();
  return issues[issues.length - 1];
}
