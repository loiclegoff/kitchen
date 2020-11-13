import { Ctx } from "blitz"
import db, { ShopUpdateArgs } from "db"

type UpdateShopInput = Pick<ShopUpdateArgs, "where" | "data">

export default async function updateShop({ where, data }: UpdateShopInput, ctx: Ctx) {
  ctx.session.authorize()

  const shop = await db.shop.update({ where, data })

  return shop
}
