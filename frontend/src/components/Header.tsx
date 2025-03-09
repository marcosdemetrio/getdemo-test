interface HeaderProps {
  title: string
  showBackButton?: boolean
  onBack?: () => void
}

function Header({ title, showBackButton = false, onBack }: HeaderProps) {
  return (
    <div className="flex items-center h-16 bg-white shadow-md px-8 z-10">
      {showBackButton && (
        <button className="bg-gray-400 p-2 rounded hover:bg-gray-300" onClick={onBack}>
          ←
        </button>
      )}
      <h3 className={`text-2xl font-bold ${showBackButton ? 'ml-4' : ''}`}>{title}</h3>
    </div>
  )
}

export default Header
