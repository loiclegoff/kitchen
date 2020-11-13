import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstShopArgs } from "db"

type GetShopInput = Pick<FindFirstShopArgs, "where">

export default async function getShop({ where }: GetShopInput, ctx: Ctx) {
  ctx.session.authorize()

  const shop = await db.shop.findFirst({ where })

  if (!shop) throw new NotFoundError()

  return shop
}
