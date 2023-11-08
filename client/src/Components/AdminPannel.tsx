import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../Store/hoocs';
import '../Styles/courses.css';
import { createCourse } from '../Store/reducers/courseSlice';
import '../Styles/admin.css';

const AdminPannel = () => {
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<string>('')

    const [tasks, setTasks] = useState<string | number>(0)
    const [lessons, setLessons] = useState<string | number>(0)
    const [hours, setHours] = useState<string | number>(0)

    const handleCreate = () => {
        try {
            dispatch(createCourse({title, description, price, tasks, lessons, hours}))
            setTitle('')
            setDescription('')
            setPrice('')
            setHours('')
            setLessons('')
            setTasks('')
        } catch (e) {
            console.log(e)
        }
    }

    return (
            <form className='adminpallen' onSubmit={(e) => e.preventDefault()}>
                <label>
                    <p>Название курса:</p>
                    <input 
                        type='text' 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title курса'
                    />
                </label>

                <label>
                    <p>Описание курса:</p>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Описание курса'
                    />
                </label>

                <label>
                    <p>Цена курса:</p>
                    <input 
                        type='text'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='Цена курса'
                    />
                </label>

                <label>
                    <p>Количество заданий</p>
                    <input 
                        type='number'
                        value={tasks}
                        onChange={(e) => setTasks(e.target.value)}
                    />
                </label>

                <label>
                    <p>Количество уроков</p>
                    <input 
                        type='number'
                        value={lessons}
                        onChange={(e) => setLessons(e.target.value)}
                    />
                </label>

                <label>
                    <p>Колво часов:</p>
                    <input 
                        type='number'
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        placeholder='количество часов'
                    />
                </label>
                <button onClick={handleCreate}>Создать курс</button>
            </form>
    )
}

export default AdminPannel;