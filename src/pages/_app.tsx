import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import { CurrenciesContextProvider } from "../contexts/currencies.context"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CurrenciesContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </CurrenciesContextProvider>
  )
}
