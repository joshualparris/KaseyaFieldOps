import { test, expect } from '@playwright/test';

test.describe('Kaseya Field Ops E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Clear storage before each test
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  test('Main Learning Flow', async ({ page }) => {
    // 1. Open app and Onboarding
    await page.goto('/');
    
    // Welcome modal should be visible
    // Welcome modal should be visible
    await expect(page.locator('text=Welcome to Field Ops')).toBeVisible();
    await page.click('text=Start Training');

    // 2. Home screen shows today's training or products
    await expect(page.locator('text=Good')).toBeVisible();
    
    // 3. Navigate to Products
    await page.click('text=Products');
    await expect(page.locator('text=Product Modules')).toBeVisible();

    // 4. Choose Datto RMM
    await page.click('text=Datto RMM');
    await expect(page.locator('h1', { hasText: 'Datto RMM' })).toBeVisible();

    // 5. Start scenario
    await page.click('text=Offline Endpoint Triage');
    
    // 6. Verify scenario loaded and choose WRONG answer
    await expect(page.locator('text=Step 1')).toBeVisible();
    // Click wrong answer "Reboot the device"
    await page.click('text=Reboot the device from the Datto RMM console.');
    await page.click('button:has-text("Guessing")');
    await page.click('text=Submit Decision');

    // Verify feedback is wrong
    await expect(page.locator('text=Not quite.')).toBeVisible();
    
    // Click next step (which loops back due to wrong answer)
    await page.click('text=Next Step');
    
    // Choose correct answer
    await page.click('text=Check the device details in Datto RMM');
    await page.click('button:has-text("Confident")');
    await page.click('text=Submit Decision');
    
    // Verify feedback is correct
    await expect(page.locator('text=Correct!')).toBeVisible();

    // Next step
    await page.click('text=Next Step');

    // 7. Complete the scenario
    await page.click('text=Check if there is an active Datto EDR alert');
    await page.click('button:has-text("Confident")');
    await page.click('text=Submit Decision');
    await page.click('text=Next Step');

    await page.click('text=Investigated offline status for LAPTOP-014.');
    await page.click('button:has-text("Confident")');
    await page.click('text=Submit Decision');
    await page.click('text=Complete Scenario');

    // 8. Verify mistake/progress (we should have 1 mistake from the first wrong answer)
    await page.click('text=Home');
    await page.click('text=View Mistake Bank');
    
    // Active Recall Repair shows the original prompt
    await expect(page.getByText('Jane\'s laptop')).toBeVisible();

    // choose wrong repair answer
    await page.getByText('Reboot the device from the Datto RMM console').click();
    await page.getByRole('button', { name: 'Submit Answer' }).click();
    
    // mistake remains unresolved
    await expect(page.getByText('Still incorrect.')).toBeVisible();
    await page.getByRole('button', { name: 'Try Again Later' }).click();
    
    // choose correct repair answer
    await page.getByText('Check the device details in Datto RMM').click();
    await page.getByRole('button', { name: 'Submit Answer' }).click();
    
    // feedback appears
    await expect(page.getByText('Correct! Misconception repaired.')).toBeVisible();
    
    // mistake repair recorded
    await page.getByRole('button', { name: 'Mark Understood' }).click();
    await expect(page.getByText('Great job! You have no unresolved mistakes.')).toBeVisible();

    // 9. Start review
    await page.click('text=Home');
    
    // Click the review link regardless of its text
    await page.click('a[href="/review"]');
    
    await expect(page.locator('text=Review Queue')).toBeVisible();
    
    // Answer card
    await page.click('button:has-text("Confident")');
    await page.click('text=Reveal Answer');
    await page.click('text=Easy');

    // 10. Reload page and verify persistence
    await page.reload();
    await expect(page.locator('text=Review Queue').or(page.locator('text=Session Complete!'))).toBeVisible();
    
    // 11. Direct-load nested URL
    await page.goto('/modules/datto-edr');
    await expect(page.locator('h1', { hasText: 'Datto EDR' })).toBeVisible();
  });
});
