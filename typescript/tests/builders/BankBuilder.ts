import { Currency } from '../../src/Currency'
import { Bank } from '../../src/Bank'

class BankBuilder {
  private currency: Currency = Currency.EUR

  private readonly rates: Map<Currency, number> = new Map<Currency, number>()

  static aBank (): BankBuilder {
    return new BankBuilder()
  }

  withPivotCurrency (currency: Currency): BankBuilder {
    this.currency = currency
    return this
  }

  withExchangeRate (rate: number, currency: Currency): BankBuilder {
    this.rates.set(currency, rate)
    return this
  }

  build (): Bank {
    const bank = new Bank()
    bank.pivotCurrency = this.currency
    bank.AddExchangeRate(this.currency, this.currency, 1)
    this.rates.forEach((rate: number, currency: Currency) => {
      bank.AddExchangeRate(this.currency, currency, rate)
    })

    return bank
  }
}

export const aEuropeanBank = (): BankBuilder => {
  return BankBuilder.aBank()
}

export const aBank = (): BankBuilder => {
  return BankBuilder.aBank()
}
