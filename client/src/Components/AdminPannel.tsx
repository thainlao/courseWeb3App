import { useState } from 'react';
import { useAppDispatch } from '../Store/hoocs';
import '../Styles/courses.css';
import { createCourse } from '../Store/reducers/courseSlice';

const AdminPannel = () => {
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<string>('')

    const handleCreate = () => {
        try {
            dispatch(createCourse({title, description, price}))
            setTitle('')
            setDescription('')
            setPrice('')
        } catch (e) {
            console.log(e)
        }
    }

    return (
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    <p>Название курса:</p>
                    <input 
                        type='text'
                        className='admin'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title курса'
                    />
                </label>

                <label>
                    <p>Описание курса:</p>
                    <textarea
                        value={description}
                        className='admin'
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Описание курса'
                    />
                </label>

                <label>
                    <p>Цена курса:</p>
                    <input 
                        type='text'
                        value={price}
                        className='admin'
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='Цена курса'
                    />
                </label>
                <button onClick={handleCreate}>Создать курс</button>
            </form>
    )
}

export default AdminPannel;