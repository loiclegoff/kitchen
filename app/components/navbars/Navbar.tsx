import { texts } from "app/i18n"
import { useRouter } from "blitz"
import React, { Suspense, useEffect, useState } from "react"
import Logo from "./components/Logo"
import MobileMenu from "./components/MobileMenu"
import NavItem from "./components/NavItem"
import Profile from "./components/Profile"

type NavBarProps = {
  title: string
}

const NavBar = ({ title }: NavBarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  useEffect(() => {
    setIsOpen(false)
  }, [router.pathname])

  const mainRoutes = [
    {
      name: texts.main.product,
      path: "/products",
    },
    {
      name: texts.main.shop,
      path: "/shops",
    },
  ]

  return (
    <nav className="bg-blue-900">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <MobileMenu onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Logo title={title} />
            <div className="hidden sm:block sm:ml-6">
              <div className="flex">
                {mainRoutes.map((route, i) => (
                  <NavItem.Desktop key={i} name={route.name} path={route.path} />
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <Suspense fallback="Loading...">
                <Profile />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? "" : "hidden "}sm:hidden`}>
        <div className="px-2 pt-2 pb-3">
          {mainRoutes.map((route, i) => (
            <NavItem.Mobile key={i} name={route.name} path={route.path} />
          ))}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
