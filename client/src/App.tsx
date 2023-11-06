import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import MainPage from './Pages/MainPage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import Layout from "./Components/Layout";
import Dashboard from "./Pages/Dashboard";
import { useAppDispatch } from "./Store/hoocs";
import { useEffect } from "react";
import { getMe } from "./Store/reducers/authSlice";
import Courses from "./Pages/Courese";
import CourseDetailed from "./Pages/CourseDetailed";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe())
  }, [])

  return (
    <Layout>
      <Router>  
        <Routes>
          <Route path='/' element={<MainPage />}/>
          <Route path='/registration' element={<RegisterPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/courses' element={<Courses />}/>
          <Route path="/courses/:courseId" element={<CourseDetailed />} />
        </Routes>
      </Router>
      <div className="firstpage_boll1"></div>
      <div className="firstpage_boll2"></div>
      <div className="firstpage_boll3"></div>
    </Layout>
  );
}

export default App;
