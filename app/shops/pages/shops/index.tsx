import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getShops from "app/shops/queries/getShops"

const ITEMS_PER_PAGE = 100

export const ShopsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ shops, hasMore }] = usePaginatedQuery(getShops, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {shops.map((shop) => (
          <li key={shop.id}>
            <Link href={`/shops/${shop.id}`}>
              <a>{shop.name}</a>
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

const ShopsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/shops/new">
          <a>Create Shop</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ShopsList />
      </Suspense>
    </div>
  )
}

ShopsPage.getLayout = (page) => <Layout title={"Shops"}>{page}</Layout>

export default ShopsPage
