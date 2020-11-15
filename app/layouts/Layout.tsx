import { ReactNode } from "react"
import { Head } from "blitz"
import NavBar from "app/components/navbars/Navbar"
import { texts } from "app/i18n"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{title || "kitchen"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar title={title || texts.main.title} />
      {children}
    </div>
  )
}

export default Layout
