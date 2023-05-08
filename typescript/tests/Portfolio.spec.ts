import { aBank } from './builders/BankBuilder'
import Money from '../src/Money'
import { Currency } from '../src/Currency'
import { Portfolio } from '../src/Portfolio'
import { Bank } from '../src/Bank'

describe('Portfolio', () => {
  let bank: Bank

  beforeEach(() => {
    bank = aBank()
      .withPivotCurrency(Currency.EUR)
      .withExchangeRate(1344, Currency.KRW)
      .withExchangeRate(1.2, Currency.USD)
      .build()
  })

  test('5 USD + 10 EUR = 17 USD', () => {
    const portfolio: Portfolio = new Portfolio()
    portfolio.addMoney(new Money(10, Currency.EUR))
    portfolio.addMoney(new Money(5, Currency.USD))
    const sumInUsd = portfolio.evaluateToCurrency(bank, Currency.USD)
    expect(sumInUsd).toBe(17)
  })
  test('10 EUR + 5 USD = 19000 KWN', () => {
    const portfolio: Portfolio = new Portfolio()
    // const bank = new Bank()
    // bank.AddExchangeRate(Currency.USD, Currency.KRW, 1100)
    // bank.AddExchangeRate(Currency.EUR, Currency.KRW, 1344)
    portfolio.addMoney(new Money(10, Currency.EUR))
    portfolio.addMoney(new Money(5, Currency.USD))
    const sumInKrw = portfolio.evaluateToCurrency(bank, Currency.KRW)
    expect(sumInKrw).toBe(19000)
  })
  test('1 USD + 1100 KRW = 2200 KWN', () => {
    const portfolio: Portfolio = new Portfolio()
    // const bank = new Bank()
    // bank.AddExchangeRate(Currency.USD, Currency.KRW, 1100)
    // bank.AddExchangeRate(Currency.EUR, Currency.KRW, 1344)
    portfolio.addMoney(new Money(1, Currency.USD))
    portfolio.addMoney(new Money(1100, Currency.KRW))
    const sumInKrw = portfolio.evaluateToCurrency(bank, Currency.KRW)
    expect(sumInKrw).toBe(2200)
  })
  test('5 USD + 5 USD + 10 EUR = 22 USD', () => {
    const portfolio: Portfolio = new Portfolio()
    // const bank = new Bank()
    // bank.AddExchangeRate(Currency.EUR, Currency.USD, 1.2)
    portfolio.addMoney(new Money(5, Currency.USD))
    portfolio.addMoney(new Money(5, Currency.USD))
    portfolio.addMoney(new Money(10, Currency.EUR))
    const sumInKrw = portfolio.evaluateToCurrency(bank, Currency.USD)
    expect(sumInKrw).toBe(22)
  })
})
