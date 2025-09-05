import type { ReactNode } from "react"
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean; // optional, default can be true
}

const LayoutPage = ({children, showSidebar = true}:LayoutProps) => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidebar && <Sidebar/>}

        <div className="flex-1 flex flex-col">
          <Navbar/>
          <main className="flex-1 overflow-y">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default LayoutPage;