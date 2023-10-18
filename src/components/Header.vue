<template>
    <header class="header fixed-top">
        <div class="header-main navbar-expand-xl">
            <div class="container-fluid">
                <div class="header-main">
                    <!-- logo -->
                    <div class="site-branding">
                        <router-link class="dark-logo" to="/">
                            <img src="src/assets/img/logo/logo-dark.png" alt="">
                        </router-link>

                        <router-link class="light-logo" to="/">
                            <img src="src/assets/img/logo/logo-white.png" alt="">
                        </router-link>
                    </div><!--/-->

                    <div class="main-menu header-navbar">
                        <nav class="navbar">
                            <!--navbar-collapse-->
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav ">
                                    <!--Homes -->
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle active" href="javascript:void(0)"
                                           id="navbarDropdown1"
                                           role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Learn
                                        </a>
                                        <ul class="dropdown-menu ">
                                            <li>
                                                <router-link class="dropdown-item" to="/">Home</router-link>
                                            </li>

                                        </ul>
                                    </li>

                                    <!--Posts features -->
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle " href="javascript:void(0)"
                                           id="navbarDropdown2" role="button"
                                           data-bs-toggle="dropdown" aria-expanded="false">Post features</a>
                                        <ul class="dropdown-menu ">
                                            <li>
                                                <router-link class="dropdown-item" to="/post">Post Detail Gallary
                                                </router-link>
                                            </li>
                                        </ul>
                                    </li>

                                    <!--Blogs-->
                                    <li class="nav-item dropdown">
                                        <a class="nav-link  dropdown-toggle" href="javascript:void(0)"
                                           id="navbarDropdown3" role="button"
                                           data-bs-toggle="dropdown" aria-expanded="false"> blogs </a>
                                        <ul class="dropdown-menu ">
                                            <li>
                                                <router-link class="dropdown-item" to="/getBlogByCategory">Post By
                                                    Category
                                                </router-link>
                                            </li>

                                        </ul>
                                    </li>

                                    <!--Pages-->
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="javascript:void(0)"
                                           id="navbarDropdown4" role="button"
                                           data-bs-toggle="dropdown" aria-expanded="false"> pages </a>
                                        <ul class="dropdown-menu ">
                                            <li>
                                                <router-link class="dropdown-item" to="/author">Author</router-link>
                                            </li>
                                            <li>
                                                <router-link class="dropdown-item" to="/about">About</router-link>
                                            </li>
                                            <li>
                                                <router-link class="dropdown-item" to="/login">Login</router-link>
                                            </li>
                                            <li>
                                                <router-link class="dropdown-item" to="/register">Register</router-link>
                                            </li>
                                            <li>
                                                <router-link class="dropdown-item" to="/test">Test API</router-link>
                                            </li>
                                        </ul>
                                    </li>

                                    <!--contact -->
                                    <li class="nav-item">
                                        <router-link class="nav-link" to="/contact">Contact</router-link>
                                    </li>
                                </ul>
                            </div>
                            <!--/-->
                        </nav>
                    </div>

                    <!-- header actions -->
                    <div class="header-action-items">
                        <!--header-social-->
                        <ul class="header-social list-inline m-0">
                            <li><a href="https://www.facebook.com/ngviethungw0106"><i class="fab fa-facebook"></i></a>
                            </li>
                            <li><a href="https://www.instagram.com/hun.lorvik/"><i class="fab fa-instagram"></i></a>
                            </li>
                            <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                        </ul>

                        <!--theme-switch-->
                        <div class="theme-switch-wrapper switch-icon">
                            <label class="theme-switch" for="checkbox">
                                <input type="checkbox" id="checkbox">
                                <span class="slider round ">
                                  <i class="fa-solid fa-sun icon-light"></i>
                                  <i class="fa-solid fa-moon  icon-dark"></i>
                                </span>
                            </label>
                        </div>

                        <!-- Search icon -->
                        <div class="search-icon">
                            <a href="#search" @click="toggleSearch"><i class="fas fa-search"></i></a>
                        </div>


                        <!--navbar-toggler-->
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script>

export default {
    name: "Header",
    methods: {
        toggleSearch() {
            this.$emit("toggleSearch"); // Khi người dùng click vào biểu tượng tìm kiếm, gửi sự kiện toggleSearch lên cha (App.vue)
        },
    },
};
</script>

<style>

</style>