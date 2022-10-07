import { Search2Icon, ArrowBackIcon } from "@chakra-ui/icons"
import {
  Box,
  Center,
  Flex,
  FormLabel,
  Icon,
  Input,
  Stack,
} from "@chakra-ui/react"
import currencies from "../../currencies.json"
import { removeAccent } from "../utils/remove-accent"
import { useRouter } from "next/router"
import { CurrencyProfile } from "../components/currency-profile"
import { useCurrenciesContext } from "../contexts/currencies.context"
import { KeyboardEvent, useState } from "react"
import { debounce } from "../utils/debounce"
const currencyCodes = Object.keys(currencies)
function getIdByValue(value: string) {
  const regexp = RegExp(value, "i")
  let firstResult = ""
  for (const code of currencyCodes) {
    const currency = currencies[code]
    if (code.match(regexp) || regexp.exec(removeAccent(currency.name))) {
      firstResult = code
      break
    }
  }
  return firstResult
}
export default function () {
  const router = useRouter()
  const { setCurrencyCode } = useCurrenciesContext()
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("")
  return (
    <>
      <Flex padding="1rem" position="sticky" top="0" bg="primary" zIndex="1">
        <Center
          as="button"
          width="3rem"
          height="3rem"
          marginX="0.5rem"
          onClick={router.back}
        >
          <Icon as={ArrowBackIcon} fontSize="1.5rem" />
        </Center>
        <Stack
          flex="1"
          bg="secondary"
          direction="row"
          spacing="1rem"
          align="center"
          padding="0.25rem 1.5rem"
          borderRadius="full"
        >
          <Input
            bg="transparent"
            textTransform="capitalize"
            border="none"
            padding="0"
            placeholder="Pesquise o Nome ou Codigo da Moeda"
            _focus={{ boxShadow: "none" }}
            onKeyUp={(e) => {
              if (e.key !== "Enter") return
              setCurrencyCode(selectedCurrencyCode)
              router.back()
            }}
            onChange={(e) => {
              debounce(() => {
                const id = getIdByValue(e.target.value)
                if (!id) return
                const input = document.getElementById(id)
                const paddingTop = 110
                const top = input.offsetTop - paddingTop
                setSelectedCurrencyCode(id)
                window.scrollTo({
                  top,
                })
              })
            }}
          />
          <Icon as={Search2Icon} />
        </Stack>
      </Flex>
      <Box
        as="form"
        onChange={(e: any) => {
          setCurrencyCode(e.target.value)
          router.back()
        }}
      >
        {currencyCodes.map((code) => (
          <FormLabel
            htmlFor={code}
            key={code}
            display="flex"
            margin="0"
            alignItems="center"
            cursor="pointer"
            _selected={{
              bg: "secondary",
            }}
            data-selected={code === selectedCurrencyCode ? true : null}
          >
            <Box
              as="input"
              type="radio"
              name="country"
              id={code}
              value={code}
              width={0}
            />
            <CurrencyProfile code={code} pointerEvents="none" />
          </FormLabel>
        ))}
      </Box>
    </>
  )
}
