type LogoProps = {
  title: string
}

const Logo = ({ title }: LogoProps) => (
  <div className="flex-shrink-0">
    <img
      className="block lg:hidden h-8 w-auto"
      src="https://tailwindui.com/img/logos/v1/workflow-mark-on-dark.svg"
      alt="Workflow logo"
    />
    <img
      className="hidden lg:block h-8 w-auto"
      src="https://tailwindui.com/img/logos/v1/workflow-logo-on-dark.svg"
      alt="Workflow logo"
    />
  </div>
)

export default Logo
