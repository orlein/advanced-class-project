import { ThemeProvider } from "./components/theme-provider";
import HomePage from "./pages/home";

export default function App() {
  return (
    <ThemeProvider>
      <HomePage />
        <div>test</div>
    </ThemeProvider>
  );
}
