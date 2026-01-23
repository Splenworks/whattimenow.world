import { PlusIcon } from "lucide-react"

type AddButtonProps = {
  widthPx: number
  onClick: () => void
}

export function AddButton({ onClick }: AddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none"
    >
      <PlusIcon size={16} />
    </button>
  )
}
