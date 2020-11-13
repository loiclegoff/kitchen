import { Ctx } from "blitz"
import db, { ShopDeleteArgs } from "db"

type DeleteShopInput = Pick<ShopDeleteArgs, "where">

export default async function deleteShop({ where }: DeleteShopInput, ctx: Ctx) {
  ctx.session.authorize()

  const shop = await db.shop.delete({ where })

  return shop
}
