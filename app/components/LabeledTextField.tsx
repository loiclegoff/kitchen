import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = React.forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name)

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    const showError = touched && normalizedError

    return (
      <div className="mb-4" {...outerProps}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
          <input
            className={`shadow appearance-none border${
              showError ? " border-red-500" : ""
            } rounded w-full py-2 px-3 text-gray-700`}
            {...input}
            disabled={submitting}
            {...props}
            ref={ref}
          />
        </label>

        {showError && (
          <div className="text-red-500 text-xs italic" role="alert">
            {normalizedError}
          </div>
        )}
      </div>
    )
  }
)

export default LabeledTextField
