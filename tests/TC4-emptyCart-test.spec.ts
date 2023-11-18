import { test, expect } from '@playwright/test';

test('cant checkout with empty cart', async ({ browser }) => {
  const page = await browser.newPage();

  // Go to login page
  await page.goto('https://www.saucedemo.com/');

  // Type in id and pw
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.press('#password', 'Enter');

  // Expects /inventory
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Add an item to the cart
  await page.click('#add-to-cart-sauce-labs-backpack');

  // Expect that the cart has 1 item
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Go to cart page and remove item
  await page.click('.shopping_cart_link');
  await page.click('#remove-sauce-labs-backpack');
  await page.click('.shopping_cart_link');
  await expect(page).not.toHaveURL('https://www.saucedemo.com/cart.html');

});
