import { test as base, mergeTests } from '@playwright/test'
import { test as lambdaFixture } from './fixtures/lambda-fixture'
import { test as apiRequestFixture } from './fixtures/api-request-fixture'

const test = mergeTests(base, lambdaFixture, apiRequestFixture)

const expect = base.expect
export { test, expect }
