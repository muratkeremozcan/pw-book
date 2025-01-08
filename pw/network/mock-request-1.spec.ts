import { test, expect } from '@playwright/test'

test('Mock Tags Data', async ({ page }) => {
  await page.route('https://conduit.productionready.io/api/tags', (route) =>
    route.fulfill({
      json: {
        tags: ['Cypress', 'Playwright', 'Japan test community']
      }
    })
  )

  await page.goto('https://demo.realworld.io/')
  await expect(page.getByText('Japan test community')).toBeVisible()
})

test('Mock Articles Data', async ({ page }) => {
  await page.route(
    'https://conduit.productionready.io/api/articles?limit=10&offset=0',
    (route) =>
      route.fulfill({
        json: {
          articles: [
            {
              title: 'Hi qaautomationlabs.com',
              slug: 'Hi - qaautomationlabs.com',
              body: 'qaautomationlabs',
              createdAt: '2020-09-26T03:18:26.635Z',
              updatedAt: '2020-09-26T03:18:26.635Z',
              tagList: [],
              description: 'SLASSCOM QUALITY SUMMIT 2023',
              author: {
                username: 'Kailash Pathak',
                bio: null,
                image:
                  'https://static.productionready.io/images/smiley-cyrus.jpg',
                following: false
              },
              favorited: false,
              favoritesCount: 1000
            }
          ],
          articlesCount: 500
        }
      })
  )

  await page.goto('https://demo.realworld.io/')
  await expect(page.getByText('Hi qaautomationlabs.com')).toBeVisible()
})
