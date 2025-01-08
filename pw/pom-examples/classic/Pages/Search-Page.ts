import type { Page } from '@playwright/test'

export class SearchPage {
  constructor(
    private page: Page,
    public categoryAllCategories = page.locator(
      '#entry_217822 button:has-text("All Categories")'
    ),
    public categorySoftware = page.locator('#entry_217822 >> text=Software'),
    public searchField = page.getByRole('textbox', {
      name: 'Search For Products'
    }),
    public searchButton = page.locator('text=Search'),
    public hover = page.locator('.lazy-load')
  ) {}

  async selectTheCategory() {
    await this.categoryAllCategories.click()
    await this.categorySoftware.click()
  }

  async searchForTheProduct(product) {
    await this.searchField.fill(product)
    await this.searchButton.click()
  }
}
