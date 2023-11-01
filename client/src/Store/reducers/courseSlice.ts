import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { addContentParams, addStackParams, courseState } from '../../types/types';

const initialState: courseState = {
    course: null,
    isLoading: false,
    status: null,
    courses: [] || null,
    content: [] || null,
}

export const createCourse = createAsyncThunk('course/createCourse',
    async ({title, description, price}: any) => {
        try {
            const { data } = await axios.post(`/course/createcourse`,
            {title, description, price});
            return data;
        } catch (e) {
            console.log(e);
        }
});

export const getAllCourses = createAsyncThunk('course/getAllCourses', async () => {
    try {
        const { data } = await axios.get('/course/getcourses');
        return data;
    } catch (e) {
        console.log(e);
    }
});

export const getcourseById = createAsyncThunk('course/getcourseById', 
    async (courseId: any) => {
    try {
        const { data } = await axios.get(`/course/getcoursedata/${courseId}`);
        return data;
    } catch (e) {
        console.log(e);
    }
});

export const addContent = createAsyncThunk('course/addContent', 
    async ({ courseId, title}: addContentParams)=> {
    try {
        const { data } = await axios.post(`/course/addcontent/${courseId}`, {title})
        return data
    } catch (e) {
        console.log(e);
    }
});

export const addStack = createAsyncThunk('course/addStack', 
    async ({ courseId, namestack, nameSubstack}: addStackParams)=> {
    try {
        const { data } = await axios.post(`/course/addstack/${courseId}`, {namestack, nameSubstack})
        return data
    } catch (e) {
        console.log(e);
    }
});



export const courseSlice = createSlice({
    name: 'courseSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //Создание курса
        builder.addCase(createCourse.pending, (state) => {
            state.isLoading = true;
            state.status = null;
        });
        builder.addCase(createCourse.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = null;
            state.course = action.payload.course;
            state.courses?.push(action.payload.course)
        });
        builder.addCase(createCourse.rejected, (state, action: any) => {
            state.isLoading = false;
            state.status = action.payload.message || 'Произошла ошибка';
        });

        //Получение всех курсов
        builder.addCase(getAllCourses.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            state.isLoading = false;
            state.courses = action.payload.courses;
        });
        builder.addCase(getAllCourses.rejected, (state, action: any) => {
            state.isLoading = false;
            state.status = action.payload.message || 'Произошла ошибка';
        });

        // Получение курса по ID
        builder.addCase(getcourseById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getcourseById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.course = action.payload.course;
        });
        builder.addCase(getcourseById.rejected, (state, action: any) => {
            state.isLoading = false;
            state.status = action.payload.message || 'Произошла ошибка';
        });
        //addContent
        builder.addCase(addContent.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addContent.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(addContent.rejected, (state, action: any) => {
            state.isLoading = false;
            state.status = action.payload.message || 'Произошла ошибка';
        });

        //addStack
        builder.addCase(addStack.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addStack.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(addStack.rejected, (state, action: any) => {
            state.isLoading = false;
            state.status = action.payload.message || 'Произошла ошибка';
        });
    }
})

export default courseSlice.reducer