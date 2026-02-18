import { test, expect } from '@playwright/test';

test('Reach Loan Page successfully', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/dashboard');

  // Expect a title "to contain" a substring.
  await expect(page.getByText('Loan', {exact: true})).toBeVisible;
});

test('Create Loan link', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/dashboard/loans2/');

  // Click the get started link.
  await page.getByText('Create Loan', { exact: true}).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText('Loan', { exact: true })).toBeVisible();
});
