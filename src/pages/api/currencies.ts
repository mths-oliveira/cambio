import { NextApiRequest, NextApiResponse } from "next"
import { api } from "../../config/api"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query
  const isDollarQuote = code === "USD"
  let url = "https://economia.awesomeapi.com.br/json/last/USD-BRL"
  if (!isDollarQuote) url += `,USD-${code}`
  const response = await api.get(url)
  const dollarPurchaseValue = Number(response.data["USDBRL"].bid)
  if (isDollarQuote) return res.json(dollarPurchaseValue)
  const currencySaleValue = Number(response.data[`USD${code}`].ask)
  const currencyQuote = dollarPurchaseValue / currencySaleValue
  return res.json(currencyQuote)
}
