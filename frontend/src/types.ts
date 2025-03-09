export interface Demo {
  id: string
  name: string
}

export interface Frame {
  id: string
  html: string
  order: number
  demoId: string
}

export interface UpdateFrameRequest {
  id: string
  html: string
  order: number
  demoId: string
}
