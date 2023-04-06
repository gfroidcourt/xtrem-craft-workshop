import { Currency } from './Currency'
import Money from './Money'

import { Bank } from './Bank'

export class Portfolio {
  private readonly _money: Map<Currency, number> = new Map()

  addMoney (money: Money): void {
    const currentAmount: number = this._money.get(money.getCurrency()) ?? 0
    this._money.set(money.getCurrency(), currentAmount + money.getAmount())
  }

  evaluateToCurrency (bank: Bank, to: Currency): number {
    const fund: number = Array.from(this._money.entries())
      .reduce((total: number, [currency, amount]: [Currency, number]) =>
        total + bank.Convert(new Money(amount, currency), bank.pivotCurrency).getAmount(), 0)

    return bank.Convert(new Money(fund, bank.pivotCurrency), to).getAmount()
  }
}
