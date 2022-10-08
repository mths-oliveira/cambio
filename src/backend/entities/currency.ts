import currencies from "../../../currencies.json"
import { getCurrencyQuote } from "../services/get-currency-quote"

type ObserverFn<T = any> = (value: T) => void

class Observer<T = any> {
  private observers: ObserverFn<T>[] = []
  subscribe(fn: ObserverFn) {
    this.observers.push(fn)
  }
  protected notifyAll(data: T) {
    for (const observerFn of this.observers) {
      observerFn(data)
    }
  }
}

export class Currency extends Observer<Currency> {
  public readonly name: string
  public readonly symbol: string
  private _value: number = 1
  constructor(public readonly code: string) {
    super()
    this.name = currencies[code].name
    this.symbol = currencies[code].symbol
    this.updateValue()
  }
  get value() {
    return this._value
  }
  private set value(value: number) {
    this._value = value
    this.notifyAll(this)
  }
  updateValue() {
    getCurrencyQuote(this.code).then((value) => {
      this.value = value
    })
  }
}
