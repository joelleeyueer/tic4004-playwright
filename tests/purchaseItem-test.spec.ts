import { test, expect } from '@playwright/test';

test('can purchase and checkout', async ({ browser }) => {
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

  // Go to cart page
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

  // Expect that the backpack is added
  await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible();

  // Go to checkout
  await page.click('text=Checkout');

  // Fill in the checkout information and continue
  await page.fill('#first-name', 'Joel');
  await page.fill('#last-name', 'Lee');
  await page.fill('#postal-code', '642684');
  await page.click('#continue');

  // Expect checkout step two page, and click finish
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  await page.click('#finish');

  // Expect checkout complete page
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');

  // Assert the "Thank you for your order!" text is present
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});
