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

const initialCurrencyCode = "BRL"
const initialCurrency = new Currency(initialCurrencyCode)
export function CurrenciesContextProvider({ children }: Props) {
  const [currencyCode, setCurrencyCode] = useState(initialCurrencyCode)
  const [currency, setCurrency] = useState(initialCurrency)
  useEffect(() => {
    const currency = new Currency(currencyCode)
    currency.subscribe(setCurrency)
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
