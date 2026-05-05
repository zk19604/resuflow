import { createBrowserRouter } from 'react-router';
import { LandingPage }      from './components/LandingPage';
import { UploadForm }       from './components/UploadForm';
import { ExtractionScreen } from './components/ExtractionScreen';
import { PreviewDashboard } from './components/PreviewDashboard';
import { DeploymentScreen } from './components/DeploymentScreen';
import { TemplateGallery }  from './components/TemplateGallery';
import { AuthPage }         from './components/AuthPage';
import { ProtectedRoute }   from './components/ProtectedRoute';  // ← ADD THIS

export const router = createBrowserRouter([
  // Public routes — no login needed
  { path: '/',       Component: LandingPage },
  { path: '/login',  element: <AuthPage mode="login"  /> },
  { path: '/signup', element: <AuthPage mode="signup" /> },

  // Protected routes — must be logged in
  {
    path: '/templates',
    element: <ProtectedRoute><TemplateGallery /></ProtectedRoute>,
  },
  {
    path: '/upload',
    element: <ProtectedRoute><UploadForm /></ProtectedRoute>,
  },
  {
    path: '/extraction',
    element: <ProtectedRoute><ExtractionScreen /></ProtectedRoute>,
  },
  {
    path: '/preview',
    element: <ProtectedRoute><PreviewDashboard /></ProtectedRoute>,
  },
  {
    path: '/deploy',
    element: <ProtectedRoute><DeploymentScreen /></ProtectedRoute>,
  },
]);