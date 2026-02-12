import { loginSeedTest as test, expect } from '../helpers/login-seed';
import type { Page } from '@playwright/test';
// ...existing code...

test.describe('Seed for logged in user', () => {

  test('seed using loggedInPage fixture', async ({ loggedInPage }: { loggedInPage: Page }) => {

    // Validate My Account page is visible
    
    await expect(loggedInPage).toHaveURL(/account/);

  });

});