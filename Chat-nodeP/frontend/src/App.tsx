import { Navigate, Route, Routes } from 'react-router';
import HomePage from "./pages/HomePage.tsx"
import LoginPage from './pages/LoginPage.tsx';
import ChatPage from './pages/ChatPage.tsx';
import CallPage from './pages/CallPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import LayoutPage from "./components/LayoutPage.tsx"
import useAuthUser from './hooks/useAuthUser.ts';
import { useThemeStore } from './hooks/useThemeStore.ts';
import PageLoader from './components/PageLoader.tsx';

const App = () => {
  const {isLoading, authUser} = useAuthUser();
  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  
  if(isLoading) return <PageLoader/>
  return (
    <div className="h-screen" data-theme={theme}>


      <Routes>
        <Route path="/" element={isAuthenticated ? <LayoutPage showSidebar={true} >
          <HomePage />
        </LayoutPage> : <Navigate to="/login" />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/chat/:id" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}
export default App;