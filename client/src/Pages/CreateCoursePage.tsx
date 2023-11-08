import { useNavigate } from 'react-router-dom';
import AdminPannel from '../Components/AdminPannel';
import '../Styles/admin.css';
import { useAppSelector } from '../Store/hoocs';
import { useEffect, useState } from 'react';

const CreateCoursePage = () => {
    const { status, isLoading } = useAppSelector((state) => state.courseSlice);
    const navigate = useNavigate();
    const [message ,setMessage] = useState('')
    
    useEffect(() => {
        if (status) {
          setMessage(status)
    
          const clearMessage = setInterval(() => {setMessage('')}, 3000)
          return () => { clearInterval(clearMessage)}
        }
      },[status])

      useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
      },[])

    return (
        <div className='createcoursepallen'>
            <AdminPannel />
            {isLoading ? <div className='container'><div className="overlay"><div className="loader"></div></div></div> : ''}
            {message ? <h2>{message}</h2> : ''}
        </div>
    )
}

export default CreateCoursePage;