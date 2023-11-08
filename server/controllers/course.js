import User from "../models/User.js"
import Course from '../models/Courses.js';

export const purchaseCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.userId;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.json({ message: 'Курс не найден' });
        }

        course.owners.push(userId);
        course.numberOfBuyers += 1;
        await course.save();

        const user = await User.findById(userId);
        user.purchasedCourses.push(courseId);
        await user.save();

        res.json({ message: 'Курс успешно куплен' });
    } catch (error) {
        res.json({ message: 'Произошла ошибка при покупке курса' });
    }
};

export const createCourse = async (req, res) => {
    try {
        const { title, description, price, hours, lessons, tasks  } = req.body;
        const author = req.userId;

        const newCourse = new Course({
            title,
            description,
            price,
            hours,
            lessons,
            tasks,
            author
        });

        await newCourse.save();

        res.json({ message: 'Курс успешно создан', course: newCourse });
    } catch (error) {
        res.json({ message: 'Произошла ошибка при получении информации о курсе' });
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        if (!courses) {
            res.json({ message: 'Не найдены все курсы' });
        }
        res.json({ courses })
    } catch (error) {
        res.json({ message: 'Произошла ошибка при получении информации о курсе' });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.json({ message: 'Курс не найден' });
        }

        res.json({course})
    } catch (error) {
        res.json({ message: 'Произошла ошибка при получении информации о курсе' });
    }
};

export const addContentToCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.json({ message: 'Курс не найден' });
        }

        course.content.push({ title });
        await course.save();

        res.json({ message: 'Контент успешно добавлен курсу', course });
    } catch (error) {
        res.json({ message: 'Произошла ошибка при добавлении контента к курсу' });
    }
};

export const addStackToCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { namestack, nameSubstack } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.json({ message: 'Курс не найден' });
        }

        course.stack.push({ namestack, nameSubstack });
        await course.save();

        res.json({ message: 'Контент успешно добавлен курсу', namestack, nameSubstack });
    } catch (error) {
        res.json({ message: 'Произошла ошибка при добавлении контента к курсу' });
    }
};