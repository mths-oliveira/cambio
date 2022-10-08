import { Box, Text } from "@chakra-ui/react"
import { useCurrenciesContext } from "../contexts/currencies.context"
import { currencyMask } from "../utils/currency-mask"
import { TableRow } from "./table-row"
import products from "../../products.json"

export function Table() {
  const { currency } = useCurrenciesContext()
  return (
    <Box display="table">
      <TableRow>
        <Text>Wol</Text>
        <Text>{currency.symbol}</Text>
        <Text>{currencyMask(products.wol.monthlyPayment)}</Text>
      </TableRow>
      <TableRow>
        <Text>Multi Wol</Text>
        <Text>{currency.symbol}</Text>
        <Text>{currencyMask(products.multiWol.monthlyPayment)}</Text>
      </TableRow>
      <TableRow>
        <Text>Live - Matrícula</Text>
        <Text>{currency.symbol}</Text>
        <Text>{currencyMask(products.live.enrolmentFee)}</Text>
      </TableRow>
      <TableRow>
        <Text>Live - Mensalidade</Text>
        <Text>{currency.symbol}</Text>
        <Text>{currencyMask(products.live.monthlyPayment)}</Text>
      </TableRow>
      <TableRow>
        <Text>Multi Live - Matrícula</Text>
        <Text>{currency.symbol}</Text>
        <Text>{currencyMask(products.multiLive.enrolmentFee)}</Text>
      </TableRow>
      <TableRow>
        <Text>Multi Live - Mensalidade</Text>
        <Text>{currency.symbol}</Text>
        <Text>{currencyMask(products.multiLive.monthlyPayment)}</Text>
      </TableRow>
    </Box>
  )
}
