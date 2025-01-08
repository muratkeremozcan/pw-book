import { test as base, mergeTests } from '@playwright/test'
import { test as lambdaFixture } from './lambda-fixture'

const test = mergeTests(base, lambdaFixture)

const expect = base.expect
export { test, expect }
