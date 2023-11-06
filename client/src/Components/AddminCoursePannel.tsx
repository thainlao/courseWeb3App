import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Store/hoocs';
import { addContent, addStack, getcourseById } from '../Store/reducers/courseSlice';
import { useEffect, useState } from 'react';
import '../Styles/courses.css';
import '../Styles/extra.css';

const AddminCoursePannel = () => {
    const dispatch = useAppDispatch();
    const { courseId } = useParams();

    const [title, setTitle] = useState<string>('');
    const [nameSubstack, setnameSubstack] = useState<string>('')
    const [namestack, setNamestack] = useState<string>('')

    const addContenttoPost = () => {
        try {
            dispatch(addContent({courseId, title}))
            setTitle('')
        } catch (e) {
            console.log(e)
        }
      }

      const addStackToPost = () => {
        try {
            dispatch(addStack({courseId, nameSubstack, namestack}))
            setNamestack('')
            setnameSubstack('')
        } catch (e) {
            console.log(e)
        }
      }

    return (
        <form className='adminpallen'>
            <div className='adminstackpannel'>
                <label>
                    <p>Stack:</p>
                    <textarea
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Название курса'
                    />
                </label>
                <button className='extadmin' onClick={addContenttoPost}>Добавить описание курса</button>
            </div>

            <div className='adminstackpannel'>
                <label>
                    <p>Имя курса:</p>
                    <textarea
                        value={namestack}
                        onChange={(e) => setNamestack(e.target.value)}
                        placeholder='Имя курса по типу JAVASCRIPT'
                    />
                </label>

            <label>
                <p>Описание курса:</p>
                <textarea
                    value={nameSubstack}
                    onChange={(e) => setnameSubstack(e.target.value)}
                    placeholder='Описание курса по типу Сделаем фреймворк с нуля'
                 
                />
            </label>
            <button className='extadmin' onClick={addStackToPost}>Добавить стек</button>
            </div>
    </form>
    )
}

export default AddminCoursePannel