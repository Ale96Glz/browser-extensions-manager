type FilterOption = 'All' | 'Active' | 'Inactive'

type FiltroProps = {
  text: FilterOption
  isSelected: boolean
  onSelect: (filter: FilterOption) => void
}

export default function Filtro({ text, isSelected, onSelect }: FiltroProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(text)}
        className={`cursor-pointer rounded-full px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-center border transition-colors ${
          isSelected
            ? 'bg-red-500 text-neutral-0 border-red-500'
            : 'bg-neutral-0 dark:bg-neutral-600 text-neutral-900 dark:text-white border-neutral-200 dark:border-neutral-600 hover:border-red-500'
        }`}
      >
        {text}
      </button>
    </li>
  )
}
