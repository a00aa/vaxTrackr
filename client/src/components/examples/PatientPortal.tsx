import PatientPortal from "../../pages/PatientPortal";
import { ThemeProvider } from "../ThemeProvider";

export default function PatientPortalExample() {
  return (
    <ThemeProvider>
      <PatientPortal />
    </ThemeProvider>
  );
}
