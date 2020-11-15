import { useCurrentUser } from "app/hooks/useCurrentUser"
import { texts } from "app/i18n"
import { Link, useRouter } from "blitz"
import { useEffect, useState } from "react"
import ProfileMenu from "./ProfileMenu"

const Profile = () => {
  const currentUser = useCurrentUser()
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  useEffect(() => {
    setIsOpen(false)
  }, [router.pathname])

  const menuItems = []

  return (
    <>
      <div>
        {currentUser?.email ? (
          <button
            className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
            id="user-menu"
            aria-label="User menu"
            aria-haspopup="true"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className="h-8 w-8 rounded-full bg-gray-700  text-white align-middle"
              style={{ paddingTop: 6 }}
            >
              {currentUser?.email.charAt(0).toUpperCase()}
            </span>
          </button>
        ) : (
          <>
            <Link href="/login">
              <a className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                <strong>{texts.main.login}</strong>
              </a>
            </Link>
          </>
        )}
      </div>
      <ProfileMenu isOpen={isOpen} close={() => setIsOpen(false)} items={menuItems} />
    </>
  )
}

export default Profile
