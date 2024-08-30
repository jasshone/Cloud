import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://cloudresume.cloud.s3-website.us-east-2.amazonaws.com');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Jasmine Shone/);
});


test('put', async ({ request }) => {
  const res = await request.put("https://g5ydhtxnbi.execute-api.us-east-2.amazonaws.com/Prod/item", {})
  expect(res.status()).toBe(200);
  const body = await res.json();
  console.log(body);
});
test('get', async ({ request }) => {
  const res = await request.get("https://g5ydhtxnbi.execute-api.us-east-2.amazonaws.com/Prod/item", {})
  expect(res.status()).toBe(200);
  const body = await res.json();
  console.log(body);
});


