import { Ctx } from "blitz"
import db, { PriceUpdateArgs } from "db"

type UpdatePriceInput = Pick<PriceUpdateArgs, "where" | "data">

export default async function updatePrice({ where, data }: UpdatePriceInput, ctx: Ctx) {
  ctx.session.authorize()

  const price = await db.price.update({ where, data })

  return price
}
