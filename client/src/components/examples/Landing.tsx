import Landing from "../../pages/Landing";
import { ThemeProvider } from "../ThemeProvider";

export default function LandingExample() {
  return (
    <ThemeProvider>
      <Landing />
    </ThemeProvider>
  );
}
