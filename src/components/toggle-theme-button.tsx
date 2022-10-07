import { Center, Icon, useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"

export function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Center
      as="button"
      bg="secondary"
      height="3rem"
      width="3rem"
      borderRadius="8px"
      margin="1rem"
      onClick={toggleColorMode}
    >
      <Icon as={colorMode === "light" ? MoonIcon : SunIcon} />
    </Center>
  )
}
