import { Currency } from './Currency'
import Money from './Money'

import { Bank } from './Bank'

export class Portfolio {
  private readonly _money: Map<Currency, number> = new Map()

  addMoneyOld (amount: number, currency: Currency): void {
    if (isNaN(amount)) {
      throw new Error('Amount must be a number')
    }
    const currentAmount: number = this._money.get(currency) ?? 0
    this._money.set(currency, currentAmount + amount)
  }

  addMoney (money: Money): void {
    const currentAmount: number = this._money.get(money.getCurrency()) ?? 0
    this._money.set(money.getCurrency(), currentAmount + money.getAmount())
  }

  evaluateToCurrency (bank: Bank, to: Currency): number {
    return Array.from(this._money.entries())  //TODO refacto Array.from
      .reduce((total: number, [currency, amount]: [Currency, number]) =>
        total + bank.ConvertOld(amount, currency, to), 0)
  }
}
