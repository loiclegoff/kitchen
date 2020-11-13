import React from "react"

type ShopFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const ShopForm = ({ initialValues, onSubmit }: ShopFormProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <div>Put your form fields here. But for now, just click submit</div>
      <div>{JSON.stringify(initialValues)}</div>
      <button>Submit</button>
    </form>
  )
}

export default ShopForm
