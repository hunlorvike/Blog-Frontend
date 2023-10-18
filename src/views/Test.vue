<template>
  <div class="mt-84 text-center">
    <h1>Home</h1>
    <p>This is the Home page!</p>

    <!-- Hiển thị danh sách người dùng -->
    <ul>
      <li v-for="user in users" :key="user.user_id">
        <h3>{{ user.fullname }}</h3>
        <p>Email: {{ user.email }}</p>
        <p>Followers: {{ user.followers_count }}</p>
        <p>Posts: {{ user.post_count }}</p>
        <img :src="user.avatar_path ? 'src/assets/img/upload/' + user.avatar_path : 'src/assets/img/image/newlogo.png'"
             alt="Avatar">
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      users: [], // Danh sách người dùng sẽ được lưu ở đây
    };
  },
  created() {
    // Gọi hàm fetchData để lấy dữ liệu khi component được tạo
    this.fetchData();
  },
  methods: {
    fetchData() {
      // Sử dụng vue-axios để gửi yêu cầu API
      this.axios
          .get("/api/user/getAllUsers") // Sử dụng URL tương đối từ axios.defaults.baseURL
          .then((response) => {
            this.users = response.data.data;
            // Trong fetchData, sau khi gán dữ liệu cho mảng users:
            this.users.forEach(user => {
              if (user.avatar_path) {
                // Xử lý đường dẫn ảnh
                // user.avatar_path = 'src/assets/img/upload/' + user.avatar_path.split('\\').pop();
                user.avatar_path = user.avatar_path.split('\\').pop();

              }
            });
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
    },
  },
};
</script>
