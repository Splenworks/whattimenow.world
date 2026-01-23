type AddButtonProps = {
  widthPx: number
  onClick: () => void
}

export function AddButton({ onClick }: AddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none"
      aria-label="Add a city"
      title="Add city"
    >
      <span aria-hidden className="text-lg leading-none">
        +
      </span>
    </button>
  )
}
