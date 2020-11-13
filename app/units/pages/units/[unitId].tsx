import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getUnit from "app/units/queries/getUnit"
import deleteUnit from "app/units/mutations/deleteUnit"

export const Unit = () => {
  const router = useRouter()
  const unitId = useParam("unitId", "number")
  const [unit] = useQuery(getUnit, { where: { id: unitId } })
  const [deleteUnitMutation] = useMutation(deleteUnit)

  return (
    <div>
      <h1>Unit {unit.id}</h1>
      <pre>{JSON.stringify(unit, null, 2)}</pre>

      <Link href={`/units/${unit.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteUnitMutation({ where: { id: unit.id } })
            router.push("/units")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowUnitPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/units">
          <a>Units</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Unit />
      </Suspense>
    </div>
  )
}

ShowUnitPage.getLayout = (page) => <Layout title={"Unit"}>{page}</Layout>

export default ShowUnitPage
