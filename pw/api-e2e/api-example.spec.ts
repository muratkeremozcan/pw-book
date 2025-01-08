import { test, expect } from '@playwright/test'

test.describe('API Testing', () => {
  let userId
  test('GET Request To verify Response Status', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/3')
    expect(response.status()).toBe(200)
  })

  test('GET Request With Getting User Detail And Verify it', async ({
    request
  }) => {
    const response = await request.get('https://reqres.in/api/users/2')
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(2)
    expect(responseBody.data.first_name).toBe('Janet')
    expect(responseBody.data.last_name).toBe('Weaver')
    expect(responseBody.data.email).toBeTruthy()
  })

  test('POST Request - Login', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users/login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }
    })
    expect(response.status()).toBe(201)
  })

  test('POST Request To Generate New Record In DB', async ({ request }) => {
    const name = 'Murat'
    const job = 'test architect'
    const response = await request.post('https://reqres.in/api/users/', {
      data: { name, job }
    })

    const responseBody = JSON.parse(await response.text())
    expect(responseBody.createdAt).toBeTruthy()
    expect(responseBody.id).toBeDefined()
    expect(responseBody.name).toBe(name)
    expect(responseBody.job).toBe(job)

    // update
    const updatedName = 'Kerem'
    const updatedJob = 'test director'
    const updateResponse = await request.put('https://reqres.in/api/users/2', {
      data: {
        name: updatedName,
        job: updatedJob
      }
    })

    const updateResponseBody = JSON.parse(await updateResponse.text())
    expect(updateResponseBody.updatedAt).toBeTruthy()
    expect(updateResponseBody.name).toBe(updatedName)
    expect(updateResponseBody.job).toBe(updatedJob)

    // delete
    const deleteResponse = await request.delete(
      'https://reqres.in/api/users/' + userId
    )
    expect(deleteResponse.status()).toBe(204)
  })
})
