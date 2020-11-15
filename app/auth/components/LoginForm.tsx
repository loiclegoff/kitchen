import React from "react"
import { AuthenticationError, Link, useMutation } from "blitz"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import login from "app/auth/mutations/login"
import { LoginInput } from "app/auth/validations"
import Title from "app/components/Title"
import { texts } from "app/i18n"

type LoginFormProps = {
  onSuccess?: () => void
}

const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div className="max-w-md w-full py-12 px-6">
      <Title title={texts.main.login} />
      <Form
        submitText={texts.auth.connect}
        submitClassName="relative block w-full py-2 px-3 border border-transparent rounded-md text-white font-semibold bg-blue-900 hover:bg-blue-800 focus:bg-blue-800 focus:outline-none focus:shadow-outline sm:text-sm"
        schema={LoginInput}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: texts.auth.errors.notValidCredentials }
            } else {
              return {
                [FORM_ERROR]: texts.auth.errors.unexpectedError + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label={texts.auth.email} placeholder={texts.auth.email} />
        <LabeledTextField
          name="password"
          label={texts.auth.password}
          placeholder={texts.auth.password}
          type="password"
        />
      </Form>

      <div style={{ marginTop: "1rem" }}>
        {texts.main.or} <Link href="/signup">{texts.main.signUp}</Link>
      </div>
    </div>
  )
}

export default LoginForm
