export class CurrencyFormatter {
  private _locale: string = 'fr-FR'
  private _currency: string = 'EUR'
  currencyFormatter: Intl.NumberFormat = new Intl.NumberFormat()

  constructor() {
    this.locale = navigator.language || 'fr-FR'
  }

  set locale(value: string) {
    this._locale = value
    this.updateFormatter()
  }

  set currency(value: string) {
    this._locale = value
    this.updateFormatter()
  }

  get locale(): string {
    return this._locale
  }

  get currency(): string {
    return this._currency
  }

  updateFormatter(): void {
    this.currencyFormatter = new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  format(value: number): string {
    return this.currencyFormatter.format(value)
  }
}
