import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getShop from "app/shops/queries/getShop"
import deleteShop from "app/shops/mutations/deleteShop"

export const Shop = () => {
  const router = useRouter()
  const shopId = useParam("shopId", "number")
  const [shop] = useQuery(getShop, { where: { id: shopId } })
  const [deleteShopMutation] = useMutation(deleteShop)

  return (
    <div>
      <h1>Shop {shop.id}</h1>
      <pre>{JSON.stringify(shop, null, 2)}</pre>

      <Link href={`/shops/${shop.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteShopMutation({ where: { id: shop.id } })
            router.push("/shops")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowShopPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/shops">
          <a>Shops</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Shop />
      </Suspense>
    </div>
  )
}

ShowShopPage.getLayout = (page) => <Layout title={"Shop"}>{page}</Layout>

export default ShowShopPage
