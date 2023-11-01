import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../Store/hoocs';
import { checkIsAuth } from '../Store/reducers/authSlice';
import '../Styles/courses.css';
import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '../Store/reducers/courseSlice';
import { ICourse } from '../types/types';
import AdminPannel from '../Components/AdminPannel';
import '../Styles/courses.css';

const Courses = () => {
    const { status, isLoading, courses } = useAppSelector((state) => state.courseSlice);
    const isAuth = useAppSelector((state) => checkIsAuth(state.authSlice))
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector((state) => state.authSlice.user);
    const isAdmin = user?.username === 'admin';
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        if (status) {
          setMessage(status);
    
          const clearMessage = setInterval(() => {
            setMessage('');
          }, 3000);
          return () => {
            clearInterval(clearMessage);
          };
        }
        
        dispatch(getAllCourses())
      }, [status, isAuth, navigate, dispatch]);

    const handleCourseClick = (courseId: string) => {
        navigate(`/courses/${courseId}`);
    };

    return (
        <div>
            <div className='courses'>
                
            </div>
            {isLoading ? <p>loading</p> : ''}
            {message ? <h2>{message}</h2>:''}

            <div>
                {isAdmin ? <AdminPannel /> : ''}
            </div>

            <div className='courses_section'>
                {courses?.map((course: ICourse) => (
                    <div className='single_course' key={course._id} onClick={() => handleCourseClick(course._id)}>
                        <h2>{course.title}</h2>
                    </div>
                ))}
            </div>

            {isLoading ? <p>Loading</p> : ''}
        </div>
    )
}

export default Courses;