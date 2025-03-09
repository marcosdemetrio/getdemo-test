interface LoadingProps {
  message?: string
}

function Loading({ message = 'Carregando...' }: LoadingProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      <span className="ml-4 text-lg text-gray-600">{message}</span>
    </div>
  )
}

export default Loading 