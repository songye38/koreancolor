import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import JogakboGrid from "./components/JogakboGrid";
import ArchiveGrid from "./components/ArchiveGrid";
import Guide from "./components/Guide";
import { Toaster } from "react-hot-toast";
import Search from "./components/Search";

function App() {
  return (
    <div className="min-h-screen">
      <Header />

      <Routes>
        <Route path="/" element={<JogakboGrid />} />
        <Route path="/archive" element={<ArchiveGrid />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;