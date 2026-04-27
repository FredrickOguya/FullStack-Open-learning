const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('../../Part 5/backend/tests/helper')


describe('Note app', () => {

  
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        username: "Onynodifre",
        name: "Fredericko Onyi",
        password: "WsxfThm"
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'Onynodifre', 'wrong')

    const errorDiv = page.locator('.error')

    await expect(errorDiv).toContainText('wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Fredericko Onyi logged')).not.toBeVisible()
  })

  test('front page can be opened', async ({ page }) => {

    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await loginWith(page, 'Onynodifre', 'WsxfThm')
    await expect(page.getByText('Fredericko Onyi logged')).toBeVisible()
  })

  describe('when logged in', () => {

    beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173')
      await loginWith(page, 'Onynodifre', 'WsxfThm')
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright')
      await expect(page.getByText('a note created by playwright').last()).toBeVisible()
    })
    
    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        createNote(page, 'another note by playwright')
      })

      test('importance can be changed', async ({ page }) => {
        await page.getByRole('button', { name: 'make not important' }).click()
        await expect(page.getByText('make important')).toBeVisible()
      })
    })
  })
})
