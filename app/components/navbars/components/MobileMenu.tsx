type MobileMenuProps = {
  isOpen: boolean
  onClick: () => void
}
const MobileMenu = ({ onClick, isOpen }: MobileMenuProps) => (
  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
    <button
      className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
      aria-label="Main menu"
      aria-expanded="false"
      onClick={onClick}
    >
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {!isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        )}
      </svg>
    </button>
  </div>
)

export default MobileMenu
