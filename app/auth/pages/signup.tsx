import React from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import SignupForm from "app/auth/components/SignupForm"
import { texts } from "app/i18n"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-100">
      <SignupForm onSuccess={() => router.push("/")} />
    </div>
  )
}

SignupPage.getLayout = (page) => <Layout title={texts.main.signUp}>{page}</Layout>

export default SignupPage
