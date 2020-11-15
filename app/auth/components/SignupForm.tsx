import React from "react"
import { useMutation } from "blitz"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import signup from "app/auth/mutations/signup"
import { SignupInput } from "app/auth/validations"
import { texts } from "app/i18n"
import Title from "app/components/Title"

type SignupFormProps = {
  onSuccess?: () => void
}

const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div className="max-w-md w-full py-12 px-6">
      <Title title={texts.main.signUp} />

      <Form
        submitText={texts.auth.createAccount}
        schema={SignupInput}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: texts.auth.errors.emailAlreadyExist }
            } else {
              return { [FORM_ERROR]: error.toString() }
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
    </div>
  )
}

export default SignupForm
