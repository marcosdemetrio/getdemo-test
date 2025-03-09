import { Frame } from '../types'

interface FrameNavigationProps {
  frames: Frame[] | undefined
  selectedFrame: Frame | null
  onFrameSelect: (frame: Frame) => void
}

function FrameNavigation({ frames, selectedFrame, onFrameSelect }: FrameNavigationProps) {
  return (
    <div className="p-4 bg-white flex justify-center border-t border-gray-300">
      {frames?.map(frame => (
        <button
          key={frame.id}
          onClick={() => onFrameSelect(frame)}
          className={`mx-2 px-4 py-2 rounded-full ${
            selectedFrame?.id === frame.id ? 'bg-blue-500 text-white' : 'bg-gray-400 text-gray-700'
          }`}
        >
          {frame.order + 1}
        </button>
      ))}
    </div>
  )
}

export default FrameNavigation
