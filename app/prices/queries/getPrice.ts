import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstPriceArgs } from "db"

type GetPriceInput = Pick<FindFirstPriceArgs, "where">

export default async function getPrice({ where }: GetPriceInput, ctx: Ctx) {
  ctx.session.authorize()

  const price = await db.price.findFirst({ where })

  if (!price) throw new NotFoundError()

  return price
}
