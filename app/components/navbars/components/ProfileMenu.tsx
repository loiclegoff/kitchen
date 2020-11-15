import logout from "app/auth/mutations/logout"
import { useOutsideClick } from "app/hooks/userOutsideClick"
import { texts } from "app/i18n"
import { Link, useMutation } from "blitz"
import { useRef } from "react"

type ProfileMenuItemProps = {
  label: string
  path: string
}

const ProfileMenuItem = ({ label, path }: ProfileMenuItemProps) => (
  <Link href={path}>
    <a className="menu-item" role="menuitem">
      {label}
    </a>
  </Link>
)

type ProfileMenuProps = {
  items: ProfileMenuItemProps[]
  isOpen: boolean
  close: () => void
}

const ProfileMenu = ({ isOpen, items, close }: ProfileMenuProps) => {
  const [logoutMutation] = useMutation(logout)
  const wrapperRef = useRef<HTMLDivElement>(null)
  useOutsideClick(wrapperRef, close)

  return (
    <div
      ref={wrapperRef}
      className={`${
        isOpen ? "" : "hidden "
      }origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg`}
    >
      <div className="menu" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
        {items.map((item) => (
          <ProfileMenuItem label={item.label} path={item.path} />
        ))}
        <button
          className="menu-item"
          onClick={async () => {
            await logoutMutation()
            close()
          }}
        >
          {texts.main.logout}
        </button>
      </div>
    </div>
  )
}

export default ProfileMenu
