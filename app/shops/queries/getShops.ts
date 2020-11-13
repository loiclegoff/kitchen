import { Ctx } from "blitz"
import db, { FindManyShopArgs } from "db"

type GetShopsInput = Pick<FindManyShopArgs, "where" | "orderBy" | "skip" | "take">

export default async function getShops(
  { where, orderBy, skip = 0, take }: GetShopsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const shops = await db.shop.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.shop.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    shops,
    nextPage,
    hasMore,
    count,
  }
}
