import { Ctx } from "blitz"
import db, { UnitCreateArgs } from "db"

type CreateUnitInput = Pick<UnitCreateArgs, "data">
export default async function createUnit({ data }: CreateUnitInput, ctx: Ctx) {
  ctx.session.authorize()

  const unit = await db.unit.create({ data })

  return unit
}
