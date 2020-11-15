import { Link, BlitzPage, useMutation } from "blitz"
import Layout from "app/layouts/Layout"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Suspense } from "react"
import LoginForm from "app/auth/components/LoginForm"
import { texts } from "app/i18n"

const Home: BlitzPage = () => {
  return (
    <div className="mx-auto max-w-6xl p-12">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="md:w-1/2 max-w-md flex flex-col justify-center">
          <div className="md:text-4xl text-xl font-black uppercase">{texts.home.title}</div>
          <div className="text-xl mt-4">{texts.home.subtitle}</div>
        </div>
        <div className="md:w-1/2 flex justify-start mt-5 md:justify-end w-full">
          <div className="shadow-md flex-auto max-w-sm p-10 pb-20">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
