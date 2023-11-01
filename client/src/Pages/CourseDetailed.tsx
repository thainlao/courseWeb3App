import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Store/hoocs';
import { addContent, addStack, getcourseById } from '../Store/reducers/courseSlice';
import { useEffect, useState } from 'react';
import '../Styles/courses.css';
import AddminCoursePannel from '../Components/AddminCoursePannel';

const CourseDetailed = () => {
    const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();
    const { courseId } = useParams();
    const { isLoading, course, status } = useAppSelector((state) => state.courseSlice)
    
    const user = useAppSelector((state) => state.authSlice.user);
    const isAdmin = user?.username === 'admin';


    useEffect(() => {
        if (courseId) {
            dispatch(getcourseById(courseId));
        } else {
            setMessage('Ошибка при получении IDшника')
        }
    }, [dispatch]);

    useEffect(() => {
        if (status) {
          setMessage(status)
    
          const clearMessage = setInterval(() => {setMessage('')}, 3000)
          return () => { clearInterval(clearMessage)}
        }
      },[status])

    return (
        <div>
            <div className="course_container">

                <div className='course_container_left'>
                    <h2>Какие знания вы получите</h2>
                    <ul>
                        {course?.content.map((contentItem) => (
                            <li key={contentItem._id}>{contentItem.title}</li>
                        ))}
                    </ul>
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

                    <div className='course_container_description'>
                        <p>{course?.description}</p>
                    </div>
                </div>
                <div>
                    {course?.stack.map((stackItem) => (
                        <div key={stackItem._id}>
                            <h2>{stackItem.namestack}</h2>
                            <h3>{stackItem.nameSubstack}</h3>
                        </div>
                    ))}      
                </div>

            </div>

            {isLoading ? <p>Loading</p>: ''}
            {message ? <h2>{message}</h2> : ''}
            {isAdmin ? <div><AddminCoursePannel /></div> : ''}
        </div>
    )
}

export default CourseDetailed;