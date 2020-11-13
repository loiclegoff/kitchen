import { Ctx } from "blitz"
import db, { UnitDeleteArgs } from "db"

type DeleteUnitInput = Pick<UnitDeleteArgs, "where">

export default async function deleteUnit({ where }: DeleteUnitInput, ctx: Ctx) {
  ctx.session.authorize()

  const unit = await db.unit.delete({ where })

  return unit
}
