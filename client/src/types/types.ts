export interface registerParams {
    username: string,
    password: string,
    email: string, 
    name: string
}

export interface loginParams {
    password: string,
    email: string, 
}

export interface addContentParams {
    courseId: any;
    title: string; 
}

export interface addStackParams {
    courseId: any;
    namestack: string
    nameSubstack: string
}

export interface authState {
    user: Iuser | null;
    isLoading: boolean;
    token: string | null;
    status: string | null
}

export interface courseState {
    course: ICourse | null;
    isLoading: boolean;
    status: string | null
    courses: ICourse[]| null
    content: [] | null
}

export interface Iuser {
    _id: string,
    username: string;
    name: string;
    email: string;
    achievements: any[]
    purchasedCourses: any[];
    createdAt: string;
    isActivated: boolean;
}

export interface ICourse {
    _id: string;
    title: string;
    description: string;
    price: number;
    owners: string[];
    numberOfBuyers: number;
    createdAt: string;
    content: any[];
    stack: any[];
    hours: number | null;
    lessons: number | null;
    tasks: number | null;
    author: any;
}