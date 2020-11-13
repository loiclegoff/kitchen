import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstUnitArgs } from "db"

type GetUnitInput = Pick<FindFirstUnitArgs, "where">

export default async function getUnit({ where }: GetUnitInput, ctx: Ctx) {
  ctx.session.authorize()

  const unit = await db.unit.findFirst({ where })

  if (!unit) throw new NotFoundError()

  return unit
}
