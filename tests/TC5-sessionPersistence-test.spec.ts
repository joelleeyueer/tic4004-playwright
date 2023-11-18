import { test, expect } from '@playwright/test';

test('user session persistence when switching accounts ', async ({ browser }) => {
    const page = await browser.newPage();

    // Go to login page
    await page.goto('https://www.saucedemo.com/');

    // Login with standard_user
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.press('#password', 'Enter');

    // Expects /inventory
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Expect cart to be empty, then logout
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Login with performance glitch user
    await page.fill('#user-name', 'performance_glitch_user');
    await page.fill('#password', 'secret_sauce');
    await page.press('#password', 'Enter');

    // Expects /inventory
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Expect cart to be empty, add items to the cart, then logout
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('#add-to-cart-sauce-labs-bike-light');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Re-login with standard_user
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.press('#password', 'Enter');

    // Expects /inventory
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Expect cart to be empty
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

});