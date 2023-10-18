<template>
    <div>
        <Header @toggleSearch="toggleSearch" />
        <router-view></router-view>
        <Footer />

        <!-- Search component -->
        <Search :showSearch="showSearch" @closeSearch="closeSearch" />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Search from "@/components/Search.vue";

export default {
    name: "App",
    components: {
        Search,
        Footer,
        Header,
    },
    data() {
        return {
            showSearch: false,
        };
    },
    methods: {
        toggleSearch() {
            this.showSearch = !this.showSearch;
        },
        closeSearch() {
            this.showSearch = false; // Đóng component tìm kiếm
        },
    },
};
</script>
