import { e2eSeedTest as test, expect } from '../helpers/e2e-seed';

test.describe('E2E Seed Flow', () => {

  test('Complete E2E flow executed successfully', async ({ e2eFlowPage }) => {

    await expect(e2eFlowPage).toHaveURL(/checkout|cart|account/);

  });

});