import { Ctx } from "blitz"
import db, { FindManyUnitArgs } from "db"

type GetUnitsInput = Pick<FindManyUnitArgs, "where" | "orderBy" | "skip" | "take">

export default async function getUnits(
  { where, orderBy, skip = 0, take }: GetUnitsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const units = await db.unit.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.unit.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    units,
    nextPage,
    hasMore,
    count,
  }
}
