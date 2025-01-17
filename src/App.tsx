import { ThemeProvider } from "next-themes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeapflowLanding from "./pages/Index";

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <Router>
        <Routes>
          <Route path="/" element={<LeapflowLanding />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
