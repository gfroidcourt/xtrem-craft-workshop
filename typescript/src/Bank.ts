import { Currency } from './Currency'
import Money from './Money'
import { MissingExchangeRateError } from './MissingExchangeRateError'

export class Bank {
  public pivotCurrency: Currency
  private readonly _exchangeRates: Map<string, number> = new Map()

  static createBankWithExchangeRate (from: Currency, to: Currency, rate: number): Bank {
    const bank = new Bank()
    bank.AddExchangeRate(from, to, rate)
    return bank
  }

  AddExchangeRate (from: Currency, to: Currency, rate: number): void {
    this._exchangeRates.set(this.createKey(from, to), rate)
  }

  public Convert (money: Money, converted: Currency): Money {
    if (!this.canConvert(money.getCurrency(), converted)) {
      throw new MissingExchangeRateError(money.getCurrency(), converted)
    }

    return converted === money.getCurrency()
      ? money
      : new Money(money.getAmount() * this._exchangeRates.get(this.createKey(money.getCurrency(), converted)), converted)
  }

  private canConvert (original: Currency, converted: Currency): boolean {
    return (original === converted || this._exchangeRates.has(this.createKey(original, converted)))
  }

  private createKey (original: Currency, converted: Currency): string {
    return original + '->' + converted
  }
}
