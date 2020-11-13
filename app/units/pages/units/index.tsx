import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getUnits from "app/units/queries/getUnits"

const ITEMS_PER_PAGE = 100

export const UnitsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ units, hasMore }] = usePaginatedQuery(getUnits, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {units.map((unit) => (
          <li key={unit.id}>
            <Link href={`/units/${unit.id}`}>
              <a>{unit.name}</a>
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

const UnitsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/units/new">
          <a>Create Unit</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <UnitsList />
      </Suspense>
    </div>
  )
}

UnitsPage.getLayout = (page) => <Layout title={"Units"}>{page}</Layout>

export default UnitsPage
