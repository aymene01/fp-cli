import { it, describe, expect } from 'vitest'

const sum = (a: number, b: number) => a + b

describe('sum test', () => {
  it('should succed', () => {
    const result = sum(1, 4)

    expect(result).toBe(5)
  })
})
