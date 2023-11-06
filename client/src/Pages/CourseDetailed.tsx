import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Store/hoocs';
import { addContent, addStack, getcourseById } from '../Store/reducers/courseSlice';
import { useEffect, useState } from 'react';
import '../Styles/courses.css';
import AddminCoursePannel from '../Components/AddminCoursePannel';
import { checkIsAuth } from '../Store/reducers/authSlice';
import LastPage from '../Components/LastPage';

const CourseDetailed = () => {
    const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();
    const { courseId } = useParams();
    const { isLoading, course, status } = useAppSelector((state) => state.courseSlice)
    
    const user = useAppSelector((state) => state.authSlice.user);
    const isAdmin = user?.username === 'admin';

    const navigate = useNavigate();
    const isAuth = useAppSelector((state) => checkIsAuth(state.authSlice))

    useEffect(() => {
        if (courseId) {
            dispatch(getcourseById(courseId));
        } else {
            setMessage('Ошибка при получении IDшника')
        }
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (status) {
          setMessage(status)
    
          const clearMessage = setInterval(() => {setMessage('')}, 3000)
          return () => { clearInterval(clearMessage)}
        }
      },[status])

      useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [])

    return (
        <div>
            <div className="course_container">

                <div className='course_container_left'>
                    <h2>Какие знания вы получите</h2>
                    <ul className='skills_text'>
                        {course?.content.map((contentItem) => (
                            <div className='skill_section' key={contentItem._id}>
                                <div className='skill_line'></div>
                                <div className="skill_title">{contentItem.title}</div>
                            </div>
                        ))}
                    </ul>
                    <div className='skill_line'></div>
                </div>

                <div className='course_container_right'>
                    <h1>{course?.title}</h1>

                    <div className='course_hours'>
                        <div className='course_container_info'>
                            <h2>21</h2>
                            <h3>часов практики</h3>
                        </div>

                        <div className='course_container_info'>
                            <h2>43</h2>
                            <h3>уроков</h3>
                        </div>

                        <div className='course_container_info'>
                            <h2>56</h2>
                            <h3>заданий</h3>
                        </div>
                    </div>

                    <div className='skill_line_sub'></div>

                    <div className='course_container_description'>
                        <h4>Что в себя включает курс?</h4>
                        <p>{course?.description}</p>
                    </div>

                    

                    <div className='course_stack_container'>
                        {course?.stack.map((stackItem) => (
                            <div key={stackItem._id}>
                                <h2>{stackItem.namestack}</h2>
                                <h3>{stackItem.nameSubstack}</h3>
                            </div>
                        ))}    
                    </div>

                    <div className='skill_line_sub'></div>

                    <div className='buysection'>
                        <h2>Цена: {course?.price}</h2>
                        <button className=''>Купить курс</button>
                    </div>

                </div>
            </div>

            {isLoading ? <p>Loading</p>: ''}
            {message ? <h2>{message}</h2> : ''}
            {isAdmin ? <div><AddminCoursePannel /></div> : ''}
            <LastPage />
        </div>
    )
}

export default CourseDetailed;