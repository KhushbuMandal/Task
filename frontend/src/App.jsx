import { useState } from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from './pages/Sidebar';
import Home from './pages/Home';
import CreateNotes from './pages/CreateNotes'



function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  

  return (
    <>
      
      <BrowserRouter>
        <div className="app-container">
          <div className={`sidebar ${isSidebarOpen ? '' : 'hidden'}`}>
            <Sidebar toggleSidebar={toggleSidebar} />
          </div>
          <div className={`main-content ${isSidebarOpen ? '' : 'full-width'}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-notes" element={<CreateNotes />} /> {/* Add this route */}
            </Routes>
          </div>
        </div>
      </BrowserRouter>

      

    </>
  );
}

export default App

{/* <BrowserRouter>
      <div className="app-container">
        <Sidebar/>
          <Routes>
            <Route path="/" element={<Home/>}/> 
          </Routes>
      </div>
      </BrowserRouter>
      
</> */}

