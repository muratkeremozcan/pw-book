// import { test, expect } from '@playwright/test'
import { test, expect } from '../support/all-fixtures'

test.describe('API Testing', () => {
  type UserData = {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
  }

  test('GET Request To verify Response Status', async ({ apiRequest }) => {
    const { status } = await apiRequest({
      method: 'GET',
      url: 'https://reqres.in/api/users/3'
    })
    expect(status).toBe(200)
  })

  test('GET Request With Getting User Detail And Verify it', async ({
    apiRequest
  }) => {
    const {
      status,
      body: { data }
    } = await apiRequest<{ data: UserData }>({
      method: 'GET',
      url: 'https://reqres.in/api/users/2'
    })
    expect(status).toBe(200)
    expect(data.id).toBe(2)
    expect(data.first_name).toBe('Janet')
    expect(data.last_name).toBe('Weaver')
    expect(data.email).toBeTruthy()
  })

  test('POST Request - Login', async ({ apiRequest }) => {
    const { status } = await apiRequest({
      method: 'POST',
      url: 'https://reqres.in/api/users/login',
      body: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }
    })
    expect(status).toBe(201)
  })

  test('POST Request To Generate New Record In DB', async ({
    apiRequest,
    request
  }) => {
    const name = 'Murat'
    const job = 'test architect'
    const { body: postResponseBody } = await apiRequest<{
      id: number
      createdAt: Date
      name: string
      job: string
    }>({
      method: 'POST',
      url: 'https://reqres.in/api/users/',
      body: { name, job }
    })

    expect(postResponseBody.createdAt).toBeTruthy()
    expect(postResponseBody.id).toBeDefined()
    const userId = postResponseBody.id
    expect(postResponseBody.name).toBe(name)
    expect(postResponseBody.job).toBe(job)

    // update
    const updatedName = 'Kerem'
    const updatedJob = 'test director'
    const { body: updateResponseBody } = await apiRequest<{
      id: number
      updatedAt: Date
      name: string
      job: string
    }>({
      method: 'PUT',
      url: 'https://reqres.in/api/users/2',
      body: {
        name: updatedName,
        job: updatedJob
      }
    })

    expect(updateResponseBody.updatedAt).toBeTruthy()
    expect(updateResponseBody.name).toBe(updatedName)
    expect(updateResponseBody.job).toBe(updatedJob)

    // delete
    // const deleteResponse = await request.delete(
    //   'https://reqres.in/api/users/' + userId
    // )
    // expect(deleteResponse.status()).toBe(204)

    const { body, status: deleteStatus } = await apiRequest({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/' + userId
    })
    expect(deleteStatus).toBe(204)
  })
})
