import { RefObject, useEffect } from "react"

/**
 * Hook that runCallback clicks outside of the passed ref
 */
export const useOutsideClick = (ref: RefObject<HTMLDivElement>, callback: () => void) => {
  useEffect(() => {
    /**
     * runCallback if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && callback) {
        callback()
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, callback])
}
