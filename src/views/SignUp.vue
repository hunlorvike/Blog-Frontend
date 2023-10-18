<template>
  <div class="border border-success p-5" style="margin-top: 100px">
    <h2 class="badge bg-success text-center">{{ title }}</h2>

    <!-- Form để đăng ký -->
    <div>
      <input type="text" class=" form-control mb-3" v-model="fullname" placeholder="Nhập họ và tên..."
             aria-label="Fullname"
             aria-describedby="basic-addon1">
      <input type="text" class=" form-control mb-3" v-model="username" placeholder="Username..." aria-label="Username"
             aria-describedby="basic-addon1">
      <input type="password" class="form-control mb-3" v-model="password" placeholder="Password..."
             aria-label="Password"
             aria-describedby="basic-addon1">
      <input type="password" class="form-control mb-3" v-model="rePassword" placeholder="Re-Password..."
             aria-label="Re-Password"
             aria-describedby="basic-addon1">
      <p>
        Have an account?
        <router-link class="text-decoration-none fw-bold" style="color: #008170" to="/login">Login
        </router-link>
      </p>

      <button class="button mb-3" @click="register">Đăng ký</button>
      <!-- Sử dụng component Alert để hiển thị thông báo -->
      <Alert :message="alertMessage" :status="alertStatus" @close="closeAlert" v-if="showAlert"/>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";

export default {
  components: {
    Alert,
  },
  data() {
    return {
      showAlert: false,
      alertMessage: '',
      alertStatus: '', // Khởi tạo status cho Alert là 'error'
      title: 'Đăng ký',
      fullname: '',
      username: '',
      password: '',
      rePassword: '',
    };
  },

  created() {
    this.fullname = 'Nguyễn Việt Hưng';

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
    register() {
      if (this.password !== this.rePassword) {
        this.alertMessage = "Mật khẩu không giống nhau";
        this.alertStatus = "error";
        this.showAlert = true;
      } else {
        // Kiểm tra mật khẩu có đủ 6 ký tự không
        if (this.password.length < 6) {
          this.alertMessage = "Mật khẩu phải có ít nhất 6 ký tự";
          this.alertStatus = "warning";
          this.showAlert = true;
          return;
        }
        // Lưu thông tin người dùng vào localStorage
        const userData = {
          fullname: this.fullname,
          username: this.username,
          password: this.password,
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        // Reset các trường thông tin đăng ký
        this.fullname = '';
        this.username = '';
        this.password = '';
        this.rePassword = '';

        // Hiển thị thông báo đăng ký thành công
        this.alertMessage = "Đăng ký thành công";
        this.alertStatus = "info";
        this.showAlert = true;
      }
    },
    closeAlert() {
      this.showAlert = false;
    }
  },
}
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