import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createPrice from "app/prices/mutations/createPrice"
import PriceForm from "app/prices/components/PriceForm"

const NewPricePage: BlitzPage = () => {
  const router = useRouter()
  const [createPriceMutation] = useMutation(createPrice)

  return (
    <div>
      <h1>Create New Price</h1>

      <PriceForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const price = await createPriceMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(price))
            router.push(`/prices/${price.id}`)
          } catch (error) {
            alert("Error creating price " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/prices">
          <a>Prices</a>
        </Link>
      </p>
    </div>
  )
}

NewPricePage.getLayout = (page) => <Layout title={"Create New Price"}>{page}</Layout>

export default NewPricePage
