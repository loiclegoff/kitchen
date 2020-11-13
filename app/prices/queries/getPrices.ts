import { Ctx } from "blitz"
import db, { FindManyPriceArgs } from "db"

type GetPricesInput = Pick<FindManyPriceArgs, "where" | "orderBy" | "skip" | "take">

export default async function getPrices(
  { where, orderBy, skip = 0, take }: GetPricesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const prices = await db.price.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.price.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    prices,
    nextPage,
    hasMore,
    count,
  }
}
