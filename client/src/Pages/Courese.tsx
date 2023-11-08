import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../Store/hoocs';
import { checkIsAuth } from '../Store/reducers/authSlice';
import '../Styles/courses.css';
import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '../Store/reducers/courseSlice';
import { ICourse } from '../types/types';
import AdminPannel from '../Components/AdminPannel';
import '../Styles/courses.css';
import PreCourse from '../Components/PreCourse';

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

    const handleScroll = () => {
        const elements = document.querySelectorAll('.single_course');
        elements.forEach((element: any, index) => {
            if (isElementInViewport(element)) {
                element.style.animation = `fadeIn 0.7s ease ${index * 0.2}s both`;
            }
        });
    };

    const isElementInViewport = (element: any) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <PreCourse />
            <div className='courses'>

            <div>
                {isAdmin ? <AdminPannel /> : ''}
            </div>

            <div className='courses_container'>
                <h3>Наши курсы непосредственно подходят как для начинающих, так уже и для опытных програмистов!</h3>

                <div className='courses_section'>
                    {courses?.map((course: ICourse) => (
                        <div className='single_course' id='course' key={course._id} onClick={() => handleCourseClick(course._id)}>
                            <h2>Профессия: {course.title}</h2>
                            <div className="widthline"></div>

                            <div className='single_course_info'>
                                {course?.stack.map((stackItem) => (
                                <div className='course_skill_a' key={stackItem._id}>
                                    <div className='course_skill_text'>{stackItem.namestack}</div>
                                </div>
                                ))}     
                            </div>

                            <div className="widthline"></div>

                            <div>
                                <p className='course_descr'>{course.description}</p>
                            </div>
                            <div className="widthline"></div>
                            <div className='course_but_section'>
                                <button>Узнать больше</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='course_text_section'>
                    <h3>Мы предоставляем новый подход в обучении</h3>
                    <h4>
                    Многие так и не могут адекватно научиться
                    разрабатывать полноценные веб-приложения,
                    так как информация по обучению тяжелая, 
                    неинтересная и нудная. Это я про видео уроки, 
                    статьи или уроки в Интернете.
                    Мы предлагаем альтернативную программу 
                    обучения веб-разработке. Как и писали Выше, 
                    минимум теории и только ПРАКТИКА. Так что не 
                    тормози, а начни уже разрабатывать 
                    полноценные проекты в сети Интернет!
                    </h4>
                </div>

                <div className='leftboll'></div>
                <div className="rightboll"></div>
                <div className='thirdboll'></div>

                <h6>Мы предлагаем альтернативную программу обучения созданию веб-приложений. Так что не тормози, а начни уже разрабатывать полноценные проекты в сети Интернет!</h6>
            </div>
        </div>
        {isLoading ? <div className='container'><div className="overlay"><div className="loader"></div></div></div> : ''}
        {message ? <h2>{message}</h2>:''}
        </div>

    )
}

export default Courses;