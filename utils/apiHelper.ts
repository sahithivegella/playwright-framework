import { request } from '@playwright/test';

export async function createUser() {
  const apiContext = await request.newContext();

  const response = await apiContext.post(
    'https://jsonplaceholder.typicode.com/users',
    {
      data: {
        name: 'Sahithi',
        job: 'Tester'
      }
    }
  );

  const responseBody = await response.json();

  console.log('Inside helper:', responseBody);

  return responseBody;
}