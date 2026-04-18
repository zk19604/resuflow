import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { UploadForm } from "./components/UploadForm";
import { TemplateGallery } from "./components/TemplateGallery";
import { ExtractionScreen } from "./components/ExtractionScreen";
import { PreviewDashboard } from "./components/PreviewDashboard";
import { DeploymentScreen } from "./components/DeploymentScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/upload",
    Component: UploadForm,
  },
  {
    path: "/templates",
    Component: TemplateGallery,
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
