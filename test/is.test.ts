import { describe, expect, it } from 'vitest'
import { isEven, isNumber, isObject, isOdd, isString } from '../src/utils/is'

describe('isObject', () => {
  it('should be true when the value is an object.', () => {
    expect(isObject({}))
    expect(isObject(Object.create({})))
    expect(isObject(Object.create(Object.prototype)))
    expect(isObject(Object.create(null)))
    expect(isObject(/foo/))

    function Foo() {}
    expect(isObject(new Foo()))
    expect(isObject(new Foo()))
  })

  it('should be false when the value is not an object.', () => {
    expect(!isObject('whatever'))
    expect(!isObject(1))
    expect(!isObject(() => {}))
    expect(!isObject([]))
    expect(!isObject(['foo', 'bar']))
    expect(!isObject())
    expect(!isObject(undefined))
    expect(!isObject(null))
  })
})
describe('isNumber', () => {
  const fixtures = [
    0xFF,
    5e3,
    0,
    0.1,
    -0.1,
    -1.1,
    37,
    3.14,

    1,
    1.1,
    10,
    10.1,
    100,
    -100,

    '0.1',
    '-0.1',
    '-1.1',
    '0',
    '012',
    '0xff',
    '1',
    '1.1',
    '10',
    '10.10',
    '100',
    '5e3',
    '   56\r\n  ', // issue#3

    Math.LN2,

    // 012, Octal literal not allowed in strict mode
    Number.parseInt('012'),
    Number.parseFloat('012'),
    Math.abs(1),
    Math.acos(1),
    Math.asin(1),
    Math.atan(1),
    Math.atan2(1, 2),
    Math.ceil(1),
    Math.cos(1),
    Math.E,
    Math.exp(1),
    Math.floor(1),
    Math.LN10,
    Math.LN2,
    Math.log(1),
    Math.LOG10E,
    Math.LOG2E,
    Math.max(1, 2),
    Math.min(1, 2),
    Math.PI,
    1 ** 2,
    5 ** 5,
    Math.random(1),
    Math.round(1),
    Math.sin(1),
    Math.sqrt(1),
    Math.SQRT1_2,
    Math.SQRT2,
    Math.tan(1),

    Number.MAX_VALUE,
    Number.MIN_VALUE,

    '0.0',
    '0x0',
    '0e+5',
    '000',
    '0.0e-5',
    '0.0E5',

    +'',
    +1,
    +3.14,
    +37,
    +5,
    +[],
    +false,
    +Math.LN2,
    +true,
    +null,
    +new Date(),
  ]

  fixtures.forEach((num) => {
    it(`${JSON.stringify(num)} should be a number`, () => {
      expect(isNumber(num), `expected "${String(num)}" to be a number`)
    })
  })
})

describe('isOdd', () => {
  it('should return true if the number is odd:', () => {
    expect(!isOdd(0))
    expect(!isOdd(2))
    expect(isOdd(1))
    expect(isOdd(3))
    expect(isOdd(-1))
    expect(isOdd(-3))
    expect(isOdd(1.0e0))
    expect(isOdd(9007199254740991))
  })

  it('should work with strings:', () => {
    expect(!isOdd('0'))
    expect(!isOdd('2'))
    expect(isOdd('1'))
    expect(isOdd('3'))
    expect(isOdd('1.0e0'))
    expect(isOdd('9007199254740991'))
  })
})

describe('isEven', () => {
  it('should return true if the number is even:', () => {
    expect(isEven(0))
    expect(!isEven(1))
    expect(isEven(2))
    expect(!isEven(3))
  })

  it('should work with strings:', () => {
    expect(isEven('0'))
    expect(!isEven('1'))
    expect(isEven('2'))
    expect(!isEven('3'))
  })
})

describe('isString', () => {
  it('should return true if the value is a string:', () => {
    expect(!isString(1))
    expect(!isString([]))
    expect(!isString({}))
    expect(!isString(null))
    expect(!isString(undefined))
    expect(!isString(true))
    expect(!isString(false))
    expect(!isString(new Date()))
    expect(!isString(() => {}))
    expect(isString(''))
    expect(isString('foo'))
  })
})
