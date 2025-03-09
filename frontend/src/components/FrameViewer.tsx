import { useEffect } from 'react'
import { Frame } from '../types'

interface FrameViewerProps {
  selectedFrame: Frame | null
  editedHtml: string | null
  onHtmlChange: (newHtml: string) => void
}

function FrameViewer({ selectedFrame, editedHtml, onHtmlChange }: FrameViewerProps) {
  useEffect(() => {
    const iframe = document.querySelector('iframe')
    if (iframe) {
      iframe.onload = () => {
        const iframeDoc = iframe.contentDocument
        if (!iframeDoc) return

        iframeDoc.addEventListener('dblclick', (e: MouseEvent) => {
          const target = e.target as HTMLElement
          if (target.nodeType === Node.TEXT_NODE) {
            const span = iframeDoc.createElement('span')
            span.contentEditable = 'true'
            span.textContent = target.textContent
            target.parentNode?.replaceChild(span, target)
            span.focus()
          } else {
            target.contentEditable = 'true'
            target.focus()
          }
        })

        iframeDoc.addEventListener(
          'blur',
          (e: FocusEvent) => {
            const target = e.target as HTMLElement
            if (target.contentEditable === 'true' && selectedFrame) {
              const newHtml = iframeDoc.documentElement.outerHTML
              onHtmlChange(newHtml)
            }
          },
          true
        )
      }
    }
  }, [selectedFrame, onHtmlChange])

  return (
    <div className="flex-1 relative">
      {selectedFrame && (
        <iframe
          srcDoc={editedHtml || selectedFrame.html}
          className="absolute inset-0 w-full h-full"
          title={`Frame ${selectedFrame.order}`}
        />
      )}
    </div>
  )
}

export default FrameViewer
