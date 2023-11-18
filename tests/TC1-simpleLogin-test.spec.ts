import { test, expect } from '@playwright/test';

test('can login with standard_user, cannot login with locked_out_user', async ({ browser }) => {
    const page = await browser.newPage();

    // Go to login page
    await page.goto('https://www.saucedemo.com/');

    // Login with standard_user
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.press('#password', 'Enter');

    // Expects /inventory
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Expand menu and click logout
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    

    // Login with locked_out_user
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.press('#password', 'Enter');

    // Expect error message and still be on login page
    await expect(page.locator('div.error-message-container.error')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');

});
