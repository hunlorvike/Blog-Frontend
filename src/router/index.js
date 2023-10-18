import {createRouter, createWebHistory} from "vue-router";
import About from "@/views/About.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Contact from "@/views/Contact.vue";
import Index from "@/views/Index.vue";
import Author from "@/components/Author.vue";
import PostDetail from "@/components/PostDetail.vue";
import Test from "@/views/Test.vue";
import BlogGrid from "@/views/BlogGrid.vue";

const routes = [
    {
        path: "/",
        name: "Index",
        component: Index,
        meta: {
            title: 'Homepage - Thắng làm Vue thua làm React',
        },
    },
    {
        path: "/about",
        name: "About",
        component: About,
        meta: {
            title: 'Về chúng tôi - Thắng làm Vue thua làm React',
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            title: 'Đăng nhập - Thắng làm Vue thua làm React',
        },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            title: 'Đăng ký - Thắng làm Vue thua làm React',
        },
    },
    {
        path: "/contact",
        name: "Contact",
        component: Contact,
        meta: {
            title: 'Liên hệ - Thắng làm Vue thua làm React',
        },
    },
    {
        path: "/author",
        name: "Author",
        component: Author,
        meta: {
            title: 'Author - Thắng làm Vue thua làm React',
        },
    },
    {
        path: "/post",
        name: "Post Detail",
        component: PostDetail,
        meta: {
            title: 'Post Detail - Thắng làm Vue thua làm React',
        },
    },
    {
        path: "/test",
        name: "Test",
        component: Test,
        meta: {
            title: 'Post Detail - Thắng làm Vue thua làm React',
        },
    },
    {
        path: "/getBlogByCategory",
        name: "BlogGrid",
        component: BlogGrid,
        meta: {
            title: 'Post Grid - Thắng làm Vue thua làm React',
        },
        props: true,
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // Thiết lập tiêu đề dựa trên thuộc tính meta của route
    document.title = to.meta.title || 'Group 6 - Thắng làm Vue thua làm React'; // Sử dụng tiêu đề mặc định nếu không có tiêu đề trong route
    next();
});

export default router;
