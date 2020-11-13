import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getPrices from "app/prices/queries/getPrices"

const ITEMS_PER_PAGE = 100

export const PricesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ prices, hasMore }] = usePaginatedQuery(getPrices, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {prices.map((price) => (
          <li key={price.id}>
            <Link href={`/prices/${price.id}`}>
              <a>{price.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const PricesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/prices/new">
          <a>Create Price</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <PricesList />
      </Suspense>
    </div>
  )
}

PricesPage.getLayout = (page) => <Layout title={"Prices"}>{page}</Layout>

export default PricesPage
