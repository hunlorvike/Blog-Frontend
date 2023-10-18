<template>
  <div class="border border-success p-5" style="margin-top: 100px">
    <h2 class="badge bg-success text-center">{{ title }}</h2>

    <!-- Form để đăng nhập -->
    <div>
      <input type="text" class=" form-control mb-3" v-model="username" placeholder="Username" aria-label="Username"
             aria-describedby="basic-addon1">
      <input type="password" class="form-control mb-3" v-model="password" placeholder="Password" aria-label="Password"
             aria-describedby="basic-addon1">

      <p>
        Don't have an account?
        <router-link class="text-decoration-none fw-bold" style="color: #008170" to="/signup">Sign Up</router-link>
      </p>

      <button class="button mb-3" @click="login">Đăng nhập</button>
      <!-- Sử dụng component Alert để hiển thị thông báo -->
      <Alert :message="alertMessage" :status="alertStatus" @close="closeAlert" v-if="showAlert"/>
    </div>
  </div>
</template>


<script>
import Alert from "@/components/Alert.vue";

export default {
  components: {Alert},
  data() {
    return {
      showAlert: false,
      alertMessage: '',
      alertStatus: '', // Khởi tạo status cho Alert là 'error'
      // Khai báo các biến dùng để lưu thông tin từ localStorage
      storedUsername: '',
      storedPassword: '',
    };
  },
  created() {
    // Truy xuất dữ liệu từ localStorage
    const userDataJSON = localStorage.getItem("userData");

    if (userDataJSON) {
      // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
      const userData = JSON.parse(userDataJSON);

      // Lấy thông tin cụ thể từ đối tượng userData
      this.storedUsername = userData.username;
      this.storedPassword = userData.password;

    }
  },
  watch: {
    showAlert(newValue) {
      if (newValue) {
        // Nếu showAlert là true (thông báo đang hiển thị), đặt hẹn giờ để tự động đóng thông báo sau 5 giây
        setTimeout(() => {
          this.closeAlert();
        }, 5000);
      }
    },
  },
  methods: {
    login() {
      // Kiểm tra thông tin đăng nhập với dữ liệu lưu trữ trong localStorage
      if (this.username === this.storedUsername && this.password === this.storedPassword) {
        // Chuyển trang sử dụng router
        this.$router.push('/');
      } else {
        // Hiển thị thông báo đăng ký thành công
        this.alertMessage = "Đăng nhập thất bại";
        this.alertStatus = "error";
        this.showAlert = true;
      }
    },
    closeAlert() {
      this.showAlert = false;
    }
  },
};
</script>


<style scoped>
.button {
  --color: #00A97F;
  padding: 5px 15px;
  background-color: transparent;
  border-radius: .3em;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: .5s;
  font-weight: 400;
  font-size: 17px;
  border: 1px solid;
  font-family: inherit;
  text-transform: uppercase;
  color: var(--color);
  z-index: 1;
}

.button::before, .button::after {
  content: '';
  display: block;
  width: 50px;
  height: 50px;
  transform: translate(-50%, -50%);
  position: absolute;
  border-radius: 50%;
  z-index: -1;
  background-color: var(--color);
  transition: 1s ease;
}

.button::before {
  top: -1em;
  left: -1em;
}

.button::after {
  left: calc(100% + 1em);
  top: calc(100% + 1em);
}

.button:hover::before, .button:hover::after {
  height: 410px;
  width: 410px;
}

.button:hover {
  color: rgb(10, 25, 30);
}

.button:active {
  filter: brightness(.8);
}

</style>