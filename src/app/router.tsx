import { createBrowserRouter, Navigate } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/galeri" replace />,
  },
  {
    path: '/galeri',
    lazy: async () => {
      const { GalleryPage } = await import('@/features/gallery')
      return { Component: GalleryPage }
    },
  },
  {
    path: '/studio',
    lazy: async () => {
      const { StudioPage } = await import('@/features/studio')
      return { Component: StudioPage }
    },
  },
])
