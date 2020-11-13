import { Ctx } from "blitz"
import db, { PriceDeleteArgs } from "db"

type DeletePriceInput = Pick<PriceDeleteArgs, "where">

export default async function deletePrice({ where }: DeletePriceInput, ctx: Ctx) {
  ctx.session.authorize()

  const price = await db.price.delete({ where })

  return price
}
