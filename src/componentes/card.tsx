type CardProps = {
  logo: string
  title: string
  description: string
  button: string
  isActive: boolean
  onToggle: () => void
  onRemove: () => void
}

const logos = import.meta.glob('../assets/images/logo-*.svg', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function resolveLogo(logoPath: string) {
  const fileName = logoPath.split('/').pop()
  if (!fileName) return logoPath

  const match = Object.entries(logos).find(([path]) => path.endsWith(fileName))
  return match?.[1] ?? logoPath
}

export default function Card({
  logo,
  title,
  description,
  button,
  isActive,
  onToggle,
  onRemove,
}: CardProps) {
  const logoSrc = resolveLogo(logo)

  return (
    <article className="min-w-0 bg-neutral-0 dark:bg-neutral-800/80 rounded-2xl p-4 md:p-6 flex flex-col gap-4 shadow-sm shadow-neutral-200 dark:shadow-neutral-700 h-full">
      <div className="flex items-start gap-3 md:gap-4 min-w-0">
        <img src={logoSrc} alt={title} className="w-10 h-10 shrink-0" />
        <div className="min-w-0">
          <h2 className="text-neutral-900 dark:text-neutral-0 text-sm md:text-base font-bold break-words">
            {title}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm mt-1 md:mt-2 break-words">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 text-xs mt-4">
        <button
          type="button"
          onClick={onRemove}
          className="bg-transparent text-neutral-900 dark:text-neutral-0 border border-neutral-300 px-2 py-1 rounded-full cursor-pointer hover:border-red-500 hover:bg-red-500 hover:text-neutral-0"
        >
          {button}
        </button>

        <button
          type="button"
          role="switch"
          aria-checked={isActive}
          aria-label={isActive ? 'Active' : 'Inactive'}
          onClick={onToggle}
          className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors cursor-pointer ${
            isActive ? 'bg-red-500 justify-end' : 'bg-neutral-300 dark:bg-neutral-600 justify-start'
          }`}
        >
          <span className="size-4 rounded-full bg-neutral-0" />
        </button>
      </div>
    </article>
  )
}
