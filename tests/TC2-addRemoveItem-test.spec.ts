import { test, expect } from '@playwright/test';

test('can add and remove item for standard_user', async ({ browser }) => {
    const page = await browser.newPage();

    // Go to login page
    await page.goto('https://www.saucedemo.com/');

    // Login with standard_user
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.press('#password', 'Enter');

    // Expects /inventory
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    //Reset app state to clear 'cache'
    await page.click('#react-burger-menu-btn');
    await page.click('#reset_sidebar_link');

    // Add two items to the cart, expect cart to have two items
    await page.click('#add-to-cart-sauce-labs-bike-light');
    await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // Remove items, expect cart to be empty
    await page.click('#remove-sauce-labs-bike-light');
    await expect(page.locator('#add-to-cart-sauce-labs-bike-light')).toBeVisible();
    await page.click('#remove-sauce-labs-bolt-t-shirt');
    await expect(page.locator('#add-to-cart-sauce-labs-bolt-t-shirt')).toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

    // Logout
    await page.click('#logout_sidebar_link');
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Login with problem_user
    await page.fill('#user-name', 'problem_user');
    await page.fill('#password', 'secret_sauce');
    await page.press('#password', 'Enter');

    //Reset app state to clear 'cache'
    await page.click('#react-burger-menu-btn');
    await page.click('#reset_sidebar_link');

    // Add two items to the cart, expect cart to have two items
    await page.click('#add-to-cart-sauce-labs-bike-light');
    await page.click('#add-to-cart-sauce-labs-backpack');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // Remove the items. However, problem_user won't be able to remove items
    await page.click('#remove-sauce-labs-bike-light');
    await expect(page.locator('#add-to-cart-sauce-labs-bike-light')).not.toBeVisible();
    await page.click('#remove-sauce-labs-backpack');
    await expect(page.locator('#add-to-cart-sauce-labs-backpack')).not.toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});
