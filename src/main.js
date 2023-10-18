import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import VueAxios from 'vue-axios';

const app = createApp(App);

// Sử dụng vue-axios và thiết lập axios base URL nếu cần
app.use(router);
app.use(VueAxios, axios);
axios.defaults.baseURL = 'http://localhost:8080'; // Điều này tuỳ thuộc vào URL của API của bạn

app.mount('#app');
