import React from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import LoginForm from "app/auth/components/LoginForm"
import { texts } from "app/i18n"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className="min-h-full flex items-center justify-center">
      <LoginForm onSuccess={() => router.push("/")} />
    </div>
  )
}

LoginPage.getLayout = (page) => <Layout title={texts.main.login}>{page}</Layout>

export default LoginPage
