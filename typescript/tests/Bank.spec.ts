import { Currency } from '../src/Currency'
import { Bank } from '../src/Bank'
import { MissingExchangeRateError } from '../src/MissingExchangeRateError'
import Money from '../src/Money'

describe('Bank', function () {
  test('Should return number when converting from eur to usd', () => {
    // Given
    const bank = Bank.createBankWithExchangeRate(Currency.EUR, Currency.USD, 1.2)
    // When
    // const actual: number = bank.Convert(10, Currency.EUR, Currency.USD)
    const actual = bank.Convert(new Money(10, Currency.EUR), Currency.USD)
    // Then
    expect(actual).toEqual(new Money(12, Currency.USD))
  })

  test('Should return the same value when ConvertOlding from usd to usd', () => {
    const bank: Bank = Bank.createBankWithExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const actual = bank.Convert(new Money(10, Currency.USD), Currency.USD)
    expect(actual).toEqual(new Money(10, Currency.USD));
  })

  test('Should throw error in case of missing exchange rates', () => {
    const bank: Bank = Bank.createBankWithExchangeRate(Currency.EUR, Currency.USD, 1.2)
    // When - Then
    expect(() => bank.Convert(new Money(10, Currency.EUR,), Currency.KRW)).toThrow(MissingExchangeRateError).toThrow('EUR->KRW')
  })

  test('Should return different numbers when converting with different exchange rates', () => {
    let bank = Bank.createBankWithExchangeRate(Currency.EUR, Currency.USD, 1.2)
    let actual = bank.Convert(new Money(10, Currency.EUR), Currency.USD)
    expect(actual).toEqual(new Money(12, Currency.USD))

    bank = Bank.createBankWithExchangeRate(Currency.EUR, Currency.USD, 1.3)
    actual = bank.Convert(new Money(10, Currency.EUR), Currency.USD)
    expect(actual).toEqual(new Money(13, Currency.USD))

    bank = Bank.createBankWithExchangeRate(Currency.EUR, Currency.USD, 1.5)
    actual = bank.Convert(new Money(10, Currency.EUR), Currency.USD)
    expect(actual).toEqual(new Money(15, Currency.USD))
  })
})
