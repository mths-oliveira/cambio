import products from "../../products.json"
import { RepeatIcon } from "@chakra-ui/icons"
import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import { TableRow } from "../components/table-row"
import { currencyMask } from "../utils/currency-mask"
import { CurrencyProfile } from "../components/currency-profile"
import { ToggleThemeButton } from "../components/toggle-theme-button"
import { useCurrenciesContext } from "../contexts/currencies.context"
import Link from "next/link"
import { GetServerSideProps } from "next"
import { Currency } from "../backend/entities/currency"
import { getCurrencyQuote } from "../backend/services/get-currency-quote"

interface Props {
  lastCurrency: Currency
}

export default function ({ lastCurrency }: Props) {
  let { currency } = useCurrenciesContext()
  if (!currency) currency = lastCurrency
  return (
    <Box>
      <Flex paddingY="1rem" alignItems="center" justifyContent="space-between">
        <Link href="/currencies">
          <Box>
            <CurrencyProfile code={currency.code}>
              <Icon
                as={RepeatIcon}
                position="absolute"
                bottom="0.25rem"
                right="-0.25rem"
                bg="primary"
                height="1.5rem"
                width="1.5rem"
                padding="0.25rem"
                borderRadius="full"
              />
            </CurrencyProfile>
          </Box>
        </Link>
        <ToggleThemeButton />
      </Flex>
      <Box display="table">
        <TableRow>
          <Text>Wol</Text>
          <Text>{currency.symbol}</Text>
          <Text>
            {currencyMask(products.wol.monthlyPayment / currency.value)}
          </Text>
        </TableRow>
        <TableRow>
          <Text>Multi Wol</Text>
          <Text>{currency.symbol}</Text>
          <Text>
            {currencyMask(products.multiWol.monthlyPayment / currency.value)}
          </Text>
        </TableRow>
        <TableRow>
          <Text>Live - Matrícula</Text>
          <Text>{currency.symbol}</Text>
          <Text>
            {currencyMask(products.live.enrolmentFee / currency.value)}
          </Text>
        </TableRow>
        <TableRow>
          <Text>Live - Mensalidade</Text>
          <Text>{currency.symbol}</Text>
          <Text>
            {currencyMask(products.live.monthlyPayment / currency.value)}
          </Text>
        </TableRow>
        <TableRow>
          <Text>Multi Live - Matrícula</Text>
          <Text>{currency.symbol}</Text>
          <Text>
            {currencyMask(products.multiLive.enrolmentFee / currency.value)}
          </Text>
        </TableRow>
        <TableRow>
          <Text>Multi Live - Mensalidade</Text>
          <Text>{currency.symbol}</Text>
          <Text>
            {currencyMask(products.multiLive.monthlyPayment / currency.value)}
          </Text>
        </TableRow>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const currencyCode = ctx.req.cookies["currency-code"]
  let lastCurrency = new Currency(currencyCode || "BRL")
  const value = await getCurrencyQuote(currencyCode)
  return {
    props: {
      lastCurrency: {
        ...lastCurrency,
        value,
      },
    },
  }
}
