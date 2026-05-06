import { test, expect } from '@playwright/test';
import { createUser } from '../../utils/apiHelper';

test('API Test - Validate Name', async () => {
  const user = await createUser();

  console.log('API Response:', user);

  expect(user).toBeDefined();

  expect(user.name).toBe('Sahithi');

  expect(user.id).toBeDefined();
});