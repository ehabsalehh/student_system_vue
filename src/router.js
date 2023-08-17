
import { createRouter, createWebHistory } from 'vue-router';
import CoursesManagement from './components/Course/CoursesManagement.vue';
import CourseDetails from './components/Course/CourseDetails.vue';
import StudentEnrollments from './components/Course/StudentEnrollments.vue';
const routes = [
    {
        path: '/',
        name: 'courses-management',
        component: CoursesManagement,
    },
    {
        path: '/course/:courseId',
        name: 'course-details',
        component: CourseDetails,
        props: true,
    },
    {
        path: '/courses/:courseId/student-enrollments',
        name: 'student-enrollments',
        component: StudentEnrollments,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;