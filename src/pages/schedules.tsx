import { Box, Text } from "@chakra-ui/react"
import { TableRow } from "../components/table-row"

export default function () {
  return (
    <Box>
      <Box display="table">
        <TableRow>
          <Text>Segunda e Quarta</Text>
          <Text>07:00h às 23:00h</Text>
        </TableRow>
        <TableRow>
          <Text>Terça e Quinta</Text>
          <Text>07:00h às 23:00h</Text>
        </TableRow>
        <TableRow>
          <Text>Sexta</Text>
          <Text>07:00h às 18:00h</Text>
        </TableRow>
        <TableRow>
          <Text>Sábado</Text>
          <Text>08:00h às 17:00h</Text>
        </TableRow>
      </Box>
    </Box>
  )
}
