import { Link } from "blitz"

type NavItemProps = {
  name: string
  path: string
}

const NavItemDesktop = ({ name, path }: NavItemProps) => (
  <Link href={path}>
    <a className="nav-item nav-item-desktop">{name}</a>
  </Link>
)

const NavItemMobile = ({ name, path }: NavItemProps) => (
  <Link href={path}>
    <a className="nav-item nav-item-mobile">{name}</a>
  </Link>
)

const NavItem = {
  Desktop: NavItemDesktop,
  Mobile: NavItemMobile,
}

export default NavItem
