import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Store/hoocs';
import { addContent, addStack, getcourseById } from '../Store/reducers/courseSlice';
import { useEffect, useState } from 'react';
import '../Styles/courses.css';

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
        <label className='admin'>
        <label>
            <p>Stack:</p>
            <textarea
                value={title}
                className='admin'
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Описание курса'
            />
        </label>
        <button onClick={addContenttoPost}>Добавить описание курса</button>

        <label>
            <p>Stack:</p>
            <textarea
                value={namestack}
                className='admin'
                onChange={(e) => setNamestack(e.target.value)}
                placeholder='Описание курса'
            />
        </label>

        <label>
            <p>Add subStackInfo:</p>
            <textarea
                value={nameSubstack}
                onChange={(e) => setnameSubstack(e.target.value)}
                placeholder='Описание курса'
                className='admin'
            />
        </label>
        <button onClick={addStackToPost}>Добавить стек</button>
    </label>
    )
}

export default AddminCoursePannel