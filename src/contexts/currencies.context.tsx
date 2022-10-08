import Cookies from "js-cookie"
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react"
import { Currency } from "../backend/entities/currency"

interface Context {
  currency: Currency
  setCurrencyCode: (code: string) => void
}

const currenciesContext = createContext({} as Context)

interface Props {
  children: ReactNode
}

export function CurrenciesContextProvider({ children }: Props) {
  const [currencyCode, setCurrencyCode] = useState("")
  const [currency, setCurrency] = useState<Currency>(null)
  useEffect(() => {
    if (!currencyCode) return
    const currency = new Currency(currencyCode)
    currency.subscribe(setCurrency)
    Cookies.set("currency-code", currencyCode)
  }, [currencyCode])
  return (
    <currenciesContext.Provider value={{ currency, setCurrencyCode }}>
      {children}
    </currenciesContext.Provider>
  )
}

export function useCurrenciesContext() {
  const context = useContext(currenciesContext)
  return context
}
