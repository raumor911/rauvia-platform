import 'dotenv/config';
import { VisibilityRunner } from '../server/geo/visibilityRunner';
import { MockProvider } from '../server/geo/providers/mockProvider';
import { closeDbPool } from '../server/db';

async function main() {
  const args = process.argv.slice(2);
  let queryCode: string | null = null;
  let scenario: 'positive' | 'negative' | 'error' = 'positive';

  // Parse arguments
  // e.g., npm run geo:check GQ-001 negative
  if (args.length > 0) {
    if (!['positive', 'negative', 'error'].includes(args[0])) {
      queryCode = args[0];
      if (args[1] && ['positive', 'negative', 'error'].includes(args[1])) {
        scenario = args[1] as 'positive' | 'negative' | 'error';
      }
    } else {
      scenario = args[0] as 'positive' | 'negative' | 'error';
    }
  }

  console.log(`[GEO Runner] Starting checks...`);
  console.log(`  Scenario: ${scenario}`);
  console.log(`  Query: ${queryCode || 'ALL ACTIVE'}`);

  const provider = new MockProvider(scenario);
  const runner = new VisibilityRunner(provider);

  try {
    let results;
    if (queryCode) {
      results = await runner.runByCode(queryCode);
    } else {
      results = await runner.runAll();
    }
    console.log('\n[GEO Runner] Execution completed successfully:\n');
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('\n[GEO Runner] Execution failed:', error);
  } finally {
    console.log('\n[GEO Runner] Closing database connection...');
    await closeDbPool();
    process.exit(0);
  }
}

main();
