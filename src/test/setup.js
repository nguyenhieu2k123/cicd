import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
  // Clear localStorage after each test
  localStorage.clear()
})

// Mock window.alert
global.alert = vi.fn()

