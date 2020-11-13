import { Ctx } from "blitz"
import db, { PriceCreateArgs } from "db"

type CreatePriceInput = Pick<PriceCreateArgs, "data">
export default async function createPrice({ data }: CreatePriceInput, ctx: Ctx) {
  ctx.session.authorize()

  const price = await db.price.create({ data })

  return price
}
