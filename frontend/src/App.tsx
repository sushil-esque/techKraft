import "./App.css";
import { Toaster } from "./components/ui/sonner";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <Toaster position="top-center"  />
      <AppRoutes />
    </>
  );
}

export default App;
