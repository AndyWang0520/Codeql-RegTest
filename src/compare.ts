import { SarifLog, analyzeCodebase } from './analyze';

export function compareScans(scans: SarifLog[], baseline: SarifLog): any[] {
  const newIssues: any[] = [];

  const baselineIssues = new Set(baseline.runs[0].results.map(result => result.message.text));

  for (const scan of scans) {
    for (const result of scan.runs[0].results) {
      if (!baselineIssues.has(result.message.text)) {
        newIssues.push(result);
      }
    }
  }

  return newIssues;
}
