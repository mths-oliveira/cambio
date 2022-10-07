import currencies from "../../currencies.json"
import { Box, Flex, FlexProps, Image, Text } from "@chakra-ui/react"
import { removeAccent } from "../utils/remove-accent"

interface CurrencyProfileProps extends FlexProps {
  code: string
}

export function CurrencyProfile({
  code,
  children,
  ...rest
}: CurrencyProfileProps) {
  const currency = currencies[code]
  const country = currency.countries[0]
  const srcString = removeAccent(country).replace(/\W/g, "-").toLowerCase()
  return (
    <Flex alignItems="center" {...rest}>
      <Box position="relative" marginX="1rem">
        <Image
          src={`/${srcString}.png`}
          alt={country}
          filter="drop-shadow(0 0 8px rgba(0,0,0,0.15))"
        />
        {children}
      </Box>
      <Box>
        <Text fontWeight="bold">{code}</Text>
        <Text>{currency.name}</Text>
      </Box>
    </Flex>
  )
}
