import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createShop from "app/shops/mutations/createShop"
import ShopForm from "app/shops/components/ShopForm"

const NewShopPage: BlitzPage = () => {
  const router = useRouter()
  const [createShopMutation] = useMutation(createShop)

  return (
    <div>
      <h1>Create New Shop</h1>

      <ShopForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const shop = await createShopMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(shop))
            router.push(`/shops/${shop.id}`)
          } catch (error) {
            alert("Error creating shop " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/shops">
          <a>Shops</a>
        </Link>
      </p>
    </div>
  )
}

NewShopPage.getLayout = (page) => <Layout title={"Create New Shop"}>{page}</Layout>

export default NewShopPage
