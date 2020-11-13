import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getUnit from "app/units/queries/getUnit"
import updateUnit from "app/units/mutations/updateUnit"
import UnitForm from "app/units/components/UnitForm"

export const EditUnit = () => {
  const router = useRouter()
  const unitId = useParam("unitId", "number")
  const [unit, { setQueryData }] = useQuery(getUnit, { where: { id: unitId } })
  const [updateUnitMutation] = useMutation(updateUnit)

  return (
    <div>
      <h1>Edit Unit {unit.id}</h1>
      <pre>{JSON.stringify(unit)}</pre>

      <UnitForm
        initialValues={unit}
        onSubmit={async () => {
          try {
            const updated = await updateUnitMutation({
              where: { id: unit.id },
              data: { name: "MyNewName" },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/units/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating unit " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditUnitPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditUnit />
      </Suspense>

      <p>
        <Link href="/units">
          <a>Units</a>
        </Link>
      </p>
    </div>
  )
}

EditUnitPage.getLayout = (page) => <Layout title={"Edit Unit"}>{page}</Layout>

export default EditUnitPage
