import { removeEmptyFields } from './form'

describe('removeEmptyFields', () => {
  it('works', () => {
    const obj = {
      a: '',
      b: 'foo',
    }

    expect(removeEmptyFields(obj)).toStrictEqual({
      b: 'foo',
    })
  })
})
