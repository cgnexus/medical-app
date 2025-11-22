import { test, expect } from '@playwright/test';
import path from 'path';

test('upload page loads and allows file selection', async ({ page }) => {
    await page.goto('/report-upload');

    // Verify title
    await expect(page).toHaveTitle(/Medical App/);

    // Verify upload card exists
    await expect(page.getByText('Upload Report')).toBeVisible();
    await expect(page.getByText('Upload your medical report image here.')).toBeVisible();

    // Verify file input exists (it's hidden but present)
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeAttached();

    // Verify upload button is initially disabled
    const uploadButton = page.getByRole('button', { name: 'Upload' });
    await expect(uploadButton).toBeDisabled();
});
