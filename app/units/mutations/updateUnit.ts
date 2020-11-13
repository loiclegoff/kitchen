import { Ctx } from "blitz"
import db, { UnitUpdateArgs } from "db"

type UpdateUnitInput = Pick<UnitUpdateArgs, "where" | "data">

export default async function updateUnit({ where, data }: UpdateUnitInput, ctx: Ctx) {
  ctx.session.authorize()

  const unit = await db.unit.update({ where, data })

  return unit
}
