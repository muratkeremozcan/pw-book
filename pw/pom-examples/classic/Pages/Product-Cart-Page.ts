import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class ProductCartPage {
  constructor(
    private page: Page,
    public hover = page.locator('.lazy-load'),
    public clickFirstElement = page.locator('.product-action > button'),
    public viewCart = page.locator('text=View Cart'),
    public addedProduct = page.locator('#content >> text=iPod Touch'),
    public cartPopup = page.locator('div[role="alert"]'),
    public removeProduct = page.locator('//button[@class="btn btn-danger"]'),
    public message = page.locator(
      '(//p[contains(text(),"Your shopping cart is empty!")])[2]'
    )
  ) {}

  async addProductIntoCart(message: string) {
    await this.hover.first().hover()
    await this.clickFirstElement.first().click()
    await expect(this.cartPopup).toContainText(message)
    await this.viewCart.click()
    await expect(this.addedProduct).toBeVisible()
  }

  async removeProductIntoCart() {
    await this.removeProduct.click()
    await expect(this.message).toBeVisible()
  }
}
