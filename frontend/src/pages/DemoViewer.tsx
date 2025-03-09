import { useState, useEffect } from 'react'  
import { useParams, useNavigate } from 'react-router-dom'
import { useGetDemosQuery, useGetFramesQuery, useUpdateFrameMutation } from '../services/apiSlice'
import Header from '../components/Header'
import FrameViewer from '../components/FrameViewer'
import FrameNavigation from '../components/FrameNavigation'
import { Demo, Frame } from '../types'
import Loading from '../components/Loading'

function DemoViewer() {
  const { demoId } = useParams<{ demoId: string }>()
  const navigate = useNavigate()
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null)
  const [editedHtml, setEditedHtml] = useState<string | null>(null)

  const { data: demos } = useGetDemosQuery()
  const { data: frames, isLoading } = useGetFramesQuery(demoId ?? '')
  const [updateFrame] = useUpdateFrameMutation()

  const demo = demos?.find((d: Demo) => d.id === demoId)

  useEffect(() => {
    const currentFrames = frames ?? []
    if (currentFrames.length > 0 && !selectedFrame) {
      setSelectedFrame(currentFrames[0])
      setEditedHtml(currentFrames[0].html)
    }
  }, [frames, selectedFrame])

  useEffect(() => {
    if (selectedFrame) {
      setEditedHtml(selectedFrame.html)
    }
  }, [selectedFrame])

  const handleHtmlChange = async (newHtml: string) => {
    if (!selectedFrame) return
    setEditedHtml(newHtml)
    try {
      await updateFrame({
        html: newHtml,
        order: selectedFrame.order,
        demoId: selectedFrame.demoId,
        id: selectedFrame.id,
      }).unwrap()
    } catch (err) {
      console.error('Falha ao atualizar o frame:', err)
    }
  }

  if (isLoading) return <Loading message="Carregando demo..." />
  if (!demo) return null

  return (
    <div className="flex flex-col h-screen fixed inset-0">
      <Header title={`Frames de ${demo.name}`} showBackButton={true} onBack={() => navigate('/')} />
      <FrameViewer
        selectedFrame={selectedFrame}
        editedHtml={editedHtml}
        onHtmlChange={handleHtmlChange}
      />
      <FrameNavigation
        frames={frames}
        selectedFrame={selectedFrame}
        onFrameSelect={setSelectedFrame}
      />
    </div>
  )
}

export default DemoViewer
