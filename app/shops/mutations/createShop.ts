import { Ctx } from "blitz"
import db, { ShopCreateArgs } from "db"

type CreateShopInput = Pick<ShopCreateArgs, "data">
export default async function createShop({ data }: CreateShopInput, ctx: Ctx) {
  ctx.session.authorize()

  const shop = await db.shop.create({ data })

  return shop
}
