import { Demo } from '../types'

interface DemoListItemProps {
  demo: Demo
  onSelect: (demo: Demo) => void
}

const DemoListItem = ({ demo, onSelect }: DemoListItemProps) => {
  return (
    <div className="px-10 py-10 rounded-lg border bg-white border-gray-300 flex justify-between items-center shadow-md">
      <h2 className="text-xl font-bold">{demo.name}</h2>
      <button className="bg-gray-400" onClick={() => onSelect(demo)}>
        Abrir Demo
      </button>
    </div>
  )
}

export default DemoListItem
