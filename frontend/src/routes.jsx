import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { UploadForm } from "./components/UploadForm";
import { ExtractionScreen } from "./components/ExtractionScreen";
import { PreviewDashboard } from "./components/PreviewDashboard";
import { DeploymentScreen } from "./components/DeploymentScreen";
// Add these exact lines
import { TemplateGallery } from "./components/TemplateGallery";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/templates",
    Component: TemplateGallery,
  },
  {
    path: "/upload",
    Component: UploadForm,
  },
  {
    path: "/extraction",
    Component: ExtractionScreen,
  },
  {
    path: "/preview",
    Component: PreviewDashboard,
  },
  {
    path: "/deploy",
    Component: DeploymentScreen,
  },

]);
