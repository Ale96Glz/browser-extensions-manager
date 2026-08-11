import { useState } from 'react'
import './App.css'
import Card from './componentes/card'
import data from './data/data.json' with { type: 'json' }
import icon_sun from './assets/images/icon-sun.svg'
import icon_moon from './assets/images/icon-moon.svg'
import Filtro from './componentes/filtro'
import Logo from './componentes/Logo'

type FilterOption = 'All' | 'Active' | 'Inactive'

function App() {
  const [extensions, setExtensions] = useState(data)
  const [filter, setFilter] = useState<FilterOption>('All')
  const [isDark, setIsDark] = useState(true)

  const filteredExtensions = extensions.filter((extension) => {
    if (filter === 'Active') return extension.isActive
    if (filter === 'Inactive') return !extension.isActive
    return true
  })

  function toggleExtension(name: string) {
    setExtensions((prev) =>
      prev.map((extension) =>
        extension.name === name
          ? { ...extension, isActive: !extension.isActive }
          : extension,
      ),
    )
  }

  function removeExtension(name: string) {
    setExtensions((prev) =>
      prev.filter((extension) => extension.name !== name),
    )
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen overflow-x-hidden bg-light-gradient dark:bg-dark-gradient px-4 py-6 md:px-6 md:py-8 font-sans text-base">
        <div className="w-full max-w-240 mx-auto min-w-0">
          <header className="flex justify-between items-center gap-3 min-w-0 px-3 py-2 md:px-4 bg-neutral-0 dark:bg-neutral-800/80 rounded-xl md:rounded-2xl">
            <Logo className="text-neutral-900 dark:text-neutral-0 md:h-10" />
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              aria-label={
                isDark ? 'Switch to light mode' : 'Switch to dark mode'
              }
              className="shrink-0 p-2 bg-neutral-100 dark:bg-neutral-600/80 rounded-lg border border-transparent hover:cursor-pointer hover:border-red-400"
            >
              <img
                src={isDark ? icon_sun : icon_moon}
                alt=""
                className="size-5"
              />
            </button>
          </header>

          <section className="flex flex-col items-center text-center gap-4 md:flex-row md:justify-between md:items-center md:text-left mt-6 md:mt-8">
            <h1 className="text-neutral-900 dark:text-white font-bold text-xl md:text-2xl">
              Extensions List
            </h1>
            <ul className="flex flex-wrap justify-center gap-2 md:gap-3">
              <Filtro
                text="All"
                isSelected={filter === 'All'}
                onSelect={setFilter}
              />
              <Filtro
                text="Active"
                isSelected={filter === 'Active'}
                onSelect={setFilter}
              />
              <Filtro
                text="Inactive"
                isSelected={filter === 'Inactive'}
                onSelect={setFilter}
              />
            </ul>
          </section>

          <section className="grid grid-cols-1 min-[376px]:grid-cols-2 min-[768px]:grid-cols-3 gap-3 md:gap-4 mt-6">
            {filteredExtensions.map((extension) => (
              <Card
                key={extension.name}
                logo={extension.logo}
                title={extension.name}
                description={extension.description}
                button="Remove"
                isActive={extension.isActive}
                onToggle={() => toggleExtension(extension.name)}
                onRemove={() => removeExtension(extension.name)}
              />
            ))}
          </section>
        </div>

        <footer className="text-center text-neutral-600 dark:text-neutral-300 text-sm mt-8 px-2">
          Challenge by{' '}
          <a href="https://www.frontendmentor.io?ref=challenge">
            Frontend Mentor
          </a>
          . Coded by <a href="#">Alejandro González Osorio</a>.
        </footer>
      </div>
    </div>
  )
}

export default App
