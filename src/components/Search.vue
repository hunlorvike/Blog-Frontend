<template>
    <div class="search" :class="{ 'search-open': showSearch }">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6 m-auto col-md-8 col-sm-11">
                    <div class="search-width text-center">
                        <button type="button" class="close" @click="closeSearch">
                            <i class="fas fa-times"></i>
                        </button>
                        <form class="search-form" action="#">
                            <input type="search" value="" placeholder="What are you looking for?">
                            <button type="submit" class="search-btn">search</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showSearch: Boolean, // Nhận prop showSearch từ App.vue
    },
    methods: {
        closeSearch() {
            this.$emit("closeSearch"); // Gửi sự kiện closeSearch lên cha (App.vue) khi người dùng click vào nút đóng
        },
    },
};
</script>
