import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getShop from "app/shops/queries/getShop"
import updateShop from "app/shops/mutations/updateShop"
import ShopForm from "app/shops/components/ShopForm"

export const EditShop = () => {
  const router = useRouter()
  const shopId = useParam("shopId", "number")
  const [shop, { setQueryData }] = useQuery(getShop, { where: { id: shopId } })
  const [updateShopMutation] = useMutation(updateShop)

  return (
    <div>
      <h1>Edit Shop {shop.id}</h1>
      <pre>{JSON.stringify(shop)}</pre>

      <ShopForm
        initialValues={shop}
        onSubmit={async () => {
          try {
            const updated = await updateShopMutation({
              where: { id: shop.id },
              data: { name: "MyNewName" },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/shops/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating shop " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditShopPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditShop />
      </Suspense>

      <p>
        <Link href="/shops">
          <a>Shops</a>
        </Link>
      </p>
    </div>
  )
}

EditShopPage.getLayout = (page) => <Layout title={"Edit Shop"}>{page}</Layout>

export default EditShopPage
