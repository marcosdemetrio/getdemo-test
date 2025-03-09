import { useNavigate } from 'react-router-dom'
import { useGetDemosQuery } from '../services/apiSlice'
import DemoListItem from '../components/DemoListItem'
import Header from '../components/Header'
import { Demo } from '../types'
import Loading from '../components/Loading'

function DemoList() {
  const navigate = useNavigate()
  const { data: demos, isLoading, error } = useGetDemosQuery()

  if (isLoading) return <Loading message="Carregando demos..." />
  if (error)
    return (
      <div className="text-red-500">
        Error: {'message' in error ? error.message : 'Erro desconhecido'}
      </div>
    )

  return (
    <>
      <Header title="Lista de Demos" />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-8">
        {demos?.map((demo: Demo) => (
          <DemoListItem key={demo.id} demo={demo} onSelect={demo => navigate(`/demo/${demo.id}`)} />
        ))}
      </div>
    </>
  )
}

export default DemoList
