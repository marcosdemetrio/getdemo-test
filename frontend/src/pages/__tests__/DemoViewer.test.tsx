import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import DemoViewer from '../DemoViewer'
import { useGetDemosQuery, useGetFramesQuery, useUpdateFrameMutation } from '../../services/apiSlice'
import userEvent from '@testing-library/user-event'

vi.mock('../../services/apiSlice', () => ({
  useGetDemosQuery: vi.fn(),
  useGetFramesQuery: vi.fn(),
  useUpdateFrameMutation: vi.fn()
}))

describe('DemoViewer', () => {
  const mockDemo = {
    id: '1',
    name: 'Test Demo'
  }

  const mockFrames = [
    { id: '1', html: '<h1>Frame 1</h1>', order: 0, demoId: '1' },
    { id: '2', html: '<h1>Frame 2</h1>', order: 1, demoId: '1' }
  ]

  const renderWithRouter = () => {
    return render(
      <MemoryRouter initialEntries={['/demo/1']}>
        <Routes>
          <Route path="/demo/:demoId" element={<DemoViewer />} />
        </Routes>
      </MemoryRouter>
    )
  }

  beforeEach(() => {
    vi.mocked(useGetDemosQuery).mockReturnValue({
      data: [mockDemo],
      isLoading: false,
      error: null
    } as any)

    vi.mocked(useGetFramesQuery).mockReturnValue({
      data: mockFrames,
      isLoading: false,
      error: null
    } as any)

    vi.mocked(useUpdateFrameMutation).mockReturnValue([
      vi.fn(),
      { isLoading: false }
    ] as any)
  })

  it('shows loading state', () => {
    vi.mocked(useGetFramesQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null
    } as any)

    renderWithRouter()
    expect(screen.getByText('Carregando demo...')).toBeInTheDocument()
  })

  it('renders demo title and frame buttons', () => {
    renderWithRouter()
    
    expect(screen.getByText(`Frames de ${mockDemo.name}`)).toBeInTheDocument()
    
    mockFrames.forEach((frame, index) => {
      const buttonText = String(index + 1);
      const button = screen.getByRole('button', { name: buttonText });
      
      expect(button).toBeInTheDocument();
    })
  })

  it('renders iframe with correct HTML content', () => {
    renderWithRouter()
    
    const iframe = screen.getByTitle('Frame 0')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('srcDoc', mockFrames[0].html)
  })

  it('changes frame when navigation button is clicked', async () => {
    renderWithRouter()
    const user = userEvent.setup()
    const secondFrameButton = screen.getByRole('button', { name: '2' })
    
    const initialIframe = screen.getByTitle('Frame 0')
    expect(initialIframe).toHaveAttribute('srcDoc', mockFrames[0].html)

    await user.click(secondFrameButton)

    await waitFor(() => {
      expect(screen.queryByTitle('Frame 0')).not.toBeInTheDocument()
      const updatedIframe = screen.getByTitle('Frame 1')
      expect(updatedIframe).toHaveAttribute('srcDoc', mockFrames[1].html)
    })
  })
}) 