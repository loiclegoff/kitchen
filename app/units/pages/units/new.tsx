import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createUnit from "app/units/mutations/createUnit"
import UnitForm from "app/units/components/UnitForm"

const NewUnitPage: BlitzPage = () => {
  const router = useRouter()
  const [createUnitMutation] = useMutation(createUnit)

  return (
    <div>
      <h1>Create New Unit</h1>

      <UnitForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const unit = await createUnitMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(unit))
            router.push(`/units/${unit.id}`)
          } catch (error) {
            alert("Error creating unit " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/units">
          <a>Units</a>
        </Link>
      </p>
    </div>
  )
}

NewUnitPage.getLayout = (page) => <Layout title={"Create New Unit"}>{page}</Layout>

export default NewUnitPage
