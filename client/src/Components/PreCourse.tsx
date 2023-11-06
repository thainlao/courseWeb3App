import React from "react"
import '../Styles/precourse.css';

const PreCourse: React.FC = () => {
    const handleCourseClick = () => {
        const element = document.getElementById('course');
        if (element) {
            const offset = element.getBoundingClientRect().top;
            window.scrollTo({
                top: offset,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="precourse">
            <div className="precourse_container">
                <h2>ПРОГРАММА ОБУЧЕНИЯ DEVELOPMENT</h2>
                <h3>Новая и современная программа обучения доступно только у нас!</h3>

                <div className="imagees">
                    <div className="like"></div>
                    <div className="smile"></div>
                    <div className="file"></div>
                </div>

                <h4>
                    Перед тем, как я расскажу почему
                    мы лучшие в этой сфере, перейдем
                    к еще одному важному фактору. У
                    тебя должно быть желание развиваться
                    в том ремесле, которое тебе интересно.
                    С нашей стороны мы готовы предоставить
                    максимально крутой и качественный контент. 
                    Чуть ниже представлены интенсивы разной сложности. 
                    Выбери интенсив и начни проходить уроки, в процессе 
                    ты будешь получать достижения. После прохождения 
                    наших интенсивов, ты сможешь написать свои 
                    первые проекты или улучшить существующий. 
                    Минимум теории и только ПРАКТИКА!
                </h4>

                <button onClick={() => handleCourseClick()}>Выбрать курс</button>
            </div>
        </div>
    )
}

export default PreCourse