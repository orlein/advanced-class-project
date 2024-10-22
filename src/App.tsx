import { ThemeProvider } from "./components/theme-provider";
import { SidebarProvider } from "./components/ui/sidebar";
import HomePage from "./pages/home";
import LeftSideBar from "./components/LeftSideBar.tsx";

export default function App() {
    return (
        <ThemeProvider>
            <SidebarProvider>
                <div className="flex h-screen">
                    <LeftSideBar />

                    <div className="flex-1 p-4">
                        <HomePage />
                    </div>
                </div>
            </SidebarProvider>
        </ThemeProvider>
    );
}
