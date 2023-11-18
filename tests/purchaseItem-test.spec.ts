const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Go to login page
    await page.goto('https://www.saucedemo.com/');

    // Type in id and pw
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.press('#password', 'Enter');

    // Assert the URL is the inventory page
    await page.waitForURL('https://www.saucedemo.com/inventory.html');

    // Add an item to the cart
    await page.click('#add-to-cart-sauce-labs-backpack');

    // Assert that the cart has 1 item
    await page.waitForSelector('.shopping_cart_badge');
    const itemsInCart = await page.textContent('.shopping_cart_badge');
    if (itemsInCart !== '1') {
      throw new Error(`Expected 1 item in cart, found ${itemsInCart}`);
    }

    // Navigate to the cart page
    await page.click('.shopping_cart_link');
    await page.waitForURL('https://www.saucedemo.com/cart.html');

    // Assert that the correct item is added
    const itemAdded = await page.isVisible('text=Sauce Labs Backpack');
    if (!itemAdded) {
      throw new Error('The item was not added to the cart.');
    }

    // Proceed to checkout
    await page.click('text=Checkout');

    // Fill in the checkout information
    await page.fill('#first-name', 'Joel');
    await page.fill('#last-name', 'Lee');
    await page.fill('#postal-code', '642684');

    // Click continue
    await page.click('#continue');

    // Click finish on the next page
    await page.waitForURL('https://www.saucedemo.com/checkout-step-two.html');
    await page.click('#finish');

    // Assert that the checkout is complete
    await page.waitForURL('https://www.saucedemo.com/checkout-complete.html');
    const header = await page.textContent('.complete-header');
    if (header !== 'Thank you for your order!') {
      throw new Error('The thank you message did not appear as expected.');
    }
    console.log('TC3 Purchase Item Test completed successfully.');
  } catch (error) {
    console.error('TC3 Purchase Item Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
