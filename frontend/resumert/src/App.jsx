import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserProvider from './context/userContext';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/Signup';
import Dashboard from './pages/Home/Dashboard';
import LandingPage from './pages/LandingPage';
import EditResume from './pages/ResumeUpdate/EditResume';

const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/resume/:resumeId' element={<EditResume/>}/>
        </Routes>
      </Router>
    </div>

    <Toaster
      toastOptions={{
        className: '',
        style:{
          fontSize: '13px',
        }
      }}
      />
    </UserProvider>
  )
}

export default App