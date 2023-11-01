import {Router} from 'express'
import { checkAuth } from '../utils/CheckAuth.js';
import { getAllCourses, createCourse, getCourseById, addContentToCourse, addStackToCourse } from '../controllers/course.js';

const router = new Router();

//getAllCourses
router.get('/getcourses', getAllCourses)

//createcourse
router.post('/createcourse', checkAuth, createCourse);

//getCourseById
router.get('/getcoursedata/:courseId', checkAuth, getCourseById)

//addContent
router.post('/addcontent/:courseId', checkAuth, addContentToCourse)

//addStack
router.post('/addstack/:courseId', checkAuth, addStackToCourse)


export default router;