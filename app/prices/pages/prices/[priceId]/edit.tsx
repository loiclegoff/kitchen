import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getPrice from "app/prices/queries/getPrice"
import updatePrice from "app/prices/mutations/updatePrice"
import PriceForm from "app/prices/components/PriceForm"

export const EditPrice = () => {
  const router = useRouter()
  const priceId = useParam("priceId", "number")
  const [price, { setQueryData }] = useQuery(getPrice, { where: { id: priceId } })
  const [updatePriceMutation] = useMutation(updatePrice)

  return (
    <div>
      <h1>Edit Price {price.id}</h1>
      <pre>{JSON.stringify(price)}</pre>

      <PriceForm
        initialValues={price}
        onSubmit={async () => {
          try {
            const updated = await updatePriceMutation({
              where: { id: price.id },
              data: { value: 100 },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/prices/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating price " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditPricePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPrice />
      </Suspense>

      <p>
        <Link href="/prices">
          <a>Prices</a>
        </Link>
      </p>
    </div>
  )
}

EditPricePage.getLayout = (page) => <Layout title={"Edit Price"}>{page}</Layout>

export default EditPricePage
