export class PercentageFormatter {
  private _locale: string = 'fr-FR'
  currencyFormatter: Intl.NumberFormat = new Intl.NumberFormat()

  constructor() {
    this.locale = navigator.language || 'fr-FR'
  }

  set locale(value: string) {
    this._locale = value
    this.updateFormatter()
  }

  get locale(): string {
    return this._locale
  }

  updateFormatter(): void {
    this.currencyFormatter = new Intl.NumberFormat(this.locale, {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  format(value: number): string {
    return this.currencyFormatter.format(value)
  }
}
