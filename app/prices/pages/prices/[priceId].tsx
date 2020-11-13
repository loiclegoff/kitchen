import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getPrice from "app/prices/queries/getPrice"
import deletePrice from "app/prices/mutations/deletePrice"

export const Price = () => {
  const router = useRouter()
  const priceId = useParam("priceId", "number")
  const [price] = useQuery(getPrice, { where: { id: priceId } })
  const [deletePriceMutation] = useMutation(deletePrice)

  return (
    <div>
      <h1>Price {price.id}</h1>
      <pre>{JSON.stringify(price, null, 2)}</pre>

      <Link href={`/prices/${price.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deletePriceMutation({ where: { id: price.id } })
            router.push("/prices")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowPricePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/prices">
          <a>Prices</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Price />
      </Suspense>
    </div>
  )
}

ShowPricePage.getLayout = (page) => <Layout title={"Price"}>{page}</Layout>

export default ShowPricePage
