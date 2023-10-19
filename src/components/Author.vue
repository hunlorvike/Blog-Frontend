<script>
export default {
    name: "Author",
    data() {
        return {
            posts: [],
            user: null,
            userId: null,
        };
    },
    created() {
        this.userId = this.$route.query.author;
        console.log("user id: " + this.userId);
        // Lấy dữ liệu ban đầu khi trang tải lần đầu
        this.fetchDataFromAPI(this.userId);
        // Lấy thông tin người dùng
        this.fetchUserData(this.userId);
    },
    watch: {
        $route(to, from) {
            if (to.query.author !== from.query.author) {
                // Tham số "category" đã thay đổi, bạn có thể gọi API để lấy dữ liệu mới ở đây
                this.fetchDataFromAPI(to.query.author);
                // Lấy thông tin người dùng khi thay đổi tham số
                this.fetchUserData(to.query.author);
            }
        },
    },
    methods: {
        fetchDataFromAPI(author) {
            this.axios
                .get(`/api/post/getPostsByAuthor?author=${author}`)
                .then((response) => {
                    this.posts = response.data;
                    console.log(response.data);
                    this.posts.forEach(post => {
                        if (post.images) {
                            post.images.forEach(image => {
                                image.image_path = image.image_path.split('\\').pop();
                            });
                        }
                        if (post.author_avatar) {
                            post.author_avatar = post.author_avatar.split('\\').pop();
                        }
                    });
                })
                .catch((error) => {
                    console.error("Error fetching data from API:", error);
                });
        },
        fetchUserData(userId) {
            this.axios
                .get(`/api/user/getUsersById?id=${userId}`)
                .then((response) => {
                    this.user = response.data; // Lưu thông tin người dùng
                    console.log(this.user);
                })
                .catch((error) => {
                    console.error("Error fetching user data from API:", error);
                });
        },
        getTruncatedTitle(title) {
            if (title.length > 35) {
                title = title.substring(0, 35) + '...';
            }

            return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
        },
        getTruncatedContent(content) {
            const words = content.split(' ');
            if (words.length > 100) {
                return words.slice(0, 10).join(' ') + '...';
            } else {
                return content;
            }
        },
        formatDateTime(dateTimeString) {
            const options = {year: 'numeric', month: 'long', day: 'numeric'};
            const dateTime = new Date(dateTimeString);
            return dateTime.toLocaleDateString('en-US', options);
        },
        getSocialUrl(social, platform) {
            const socialInfo = social.find(s => s.platform === platform);
            return socialInfo ? socialInfo.profile_url : null;
        },
        getDefaultProfileUrl(platform) {
            const defaultUrls = {
                Facebook: 'https://www.facebook.com/ngviethungw0106',
                Instagram: 'https://www.instagram.com/hung_w03/',
                Twitter: 'https://twitter.com/hunlorvike',
                Github: 'https://github.com/hunlorvike',
                Gitlab: 'https://gitlab.com/hunlorvike',
                Pinterest: 'https://www.pinterest.com/zalatasama/',
            };
            return defaultUrls[platform] || '';
        },
        generateCategoryLink(category) {
            // Mã hóa category trước khi truyền nó trong URL
            const encodedCategory = encodeURIComponent(category);

            return {name: 'BlogGrid', query: {category: encodedCategory}};
        }
    },
}
</script>


<template>
    <main class="main">


        <!--author-->
        <section class="section  ">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-6 col-md-8 col-sm-11 m-auto">
                        <!--widget-author-->

                        <div class="widget-author  ">
                            <div class="author-img">

                                <router-link class="image"
                                             :to="posts[0] && posts[0].author_avatar ? { name: 'Author', query: { author: posts[0].author_avatar } } : '#'"
                                >
                                    <img
                                        :src="posts[0] && posts[0].author_avatar ? 'src/assets/img/upload/' + posts[0].author_avatar : 'src/assets/img/image/newlogo.png'"
                                        alt=""
                                    >
                                </router-link>


                            </div>
                            <div class="author-content">
                                <h6 class="name">Hi I'm {{ user.fullname }}</h6>
                                <div class="btn-link" style="text-decoration: none"> {{ posts.length }}
                                    Bài viết
                                </div>
                                <p class="bio">
                                    Khi ai đó liên hệ bạn vì bạn có đủ kiến thức, kỹ năng để giải quyết 1 vấn đề/ giúp
                                    họ đạt được mục tiêu mong muốn.
                                    Bạn chợt nhận ra thời khắc làm thầy đã đến.
                                </p>
                                <div class="social-media">
                                    <ul class="list-inline m-0">
                                        <li class="me-1">
                                            <a :href="user.social && user.social[0] && user.social[0].platform === 'Facebook' ? user.social[0].profile_url : getDefaultProfileUrl('Facebook')"
                                               class="color-facebook">
                                                <i class="fab fa-facebook"></i>
                                            </a>

                                        </li>
                                        <li class="me-1">
                                            <a :href="user.social && user.social[0] && user.social[0].platform === 'Instagram' ? user.social[0].profile_url : getDefaultProfileUrl('Instagram')"
                                               class="color-instagram">
                                                <i class="fab fa-instagram"></i>
                                            </a>
                                        </li>
                                        <li class="me-1">
                                            <a :href="user.social && user.social[0] && user.social[0].platform === 'Twitter' ? user.social[0].profile_url : getDefaultProfileUrl('Twitter')"
                                               class="color-twitter"><i
                                                class="fab fa-twitter"></i></a>

                                        </li>
                                        <li class="me-1">
                                            <a :href="user.social && user.social[0] && user.social[0].platform === 'Github' ? user.social[0].profile_url : getDefaultProfileUrl('Github')"
                                               class="color-github"><i
                                                class="fa-brands fa-github"></i></a>
                                        </li>
                                        <li class="me-1">
                                            <a :href="user.social && user.social[0] && user.social[0].platform === 'Gitlab' ? user.social[0].profile_url : getDefaultProfileUrl('Gitlab')"
                                               class="color-gitlab"><i
                                                class="fa-brands fa-gitlab"></i></a>

                                        </li>
                                        <li class="me-1">
                                            <a :href="user.social && user.social[0] && user.social[0].platform === 'Pinterest' ? user.social[0].profile_url : getDefaultProfileUrl('Pinterest')"
                                               class="color-pinterest"><i
                                                class="fab fa-pinterest"></i></a>

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!--/-->

                    </div>
                </div>
            </div>
        </section>

        <!--grid-layout-->
        <section class="mt-90">
            <div class="container-fluid">
                <div class="row">
                    <div v-for="post in posts" :key="post.id" class="col-xl-4 col-lg-6 col-md-6">
                        <!--Post-1-->
                        <div class="post-card">
                            <div class="post-card-image">
                                <router-link
                                    :to="{ name: 'Post Detail', query: { post_id: post.post_id } }"
                                >
                                    <img src="../assets/img/image/javalogo.jpg" alt="">

                                </router-link>
                            </div>
                            <div class="post-card-content">
                                <div class="entry-cat">
                                    <router-link
                                        class="categorie"
                                        :to="generateCategoryLink(post.category)"
                                    >
                                        {{ post.category }}
                                    </router-link>
                                </div>

                                <h5 class="entry-title">
                                    <router-link
                                        :to="{ name: 'Post Detail', query: { post_id: post.post_id } }"
                                    >
                                        {{ getTruncatedTitle(post.title) }}
                                    </router-link>
                                </h5>

                                <div class="post-exerpt">
                                    <p>{{ getTruncatedContent(post.content) }}</p>
                                </div>

                                <ul class="entry-meta list-inline">
                                    <li class="post-author-img">
                                        <router-link
                                            :to="{ name: 'Author', query: { author: post.creator_id } }"
                                        >
                                            <img
                                                :src="post.author_avatar ? 'src/assets/img/upload/' + post.author_avatar : 'src/assets/img/image/newlogo.png'"
                                                alt="">
                                        </router-link>
                                    </li>
                                    <li class="post-author">
                                        <router-link style="color: inherit;"
                                                     :to="{ name: 'Author', query: { author: post.creator_id } }"
                                        >
                                            {{ post.creator_name }}
                                        </router-link>
                                    </li>
                                    <li class="post-date"><span class="dot"></span> {{
                                            formatDateTime(post.updated_at)
                                        }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!--/-->
                    </div>


                </div>
            </div>
        </section>
        <!--/-->

        <!--newslettre-->
        <section class="newslettre">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-6 col-md-10 col-sm-11 m-auto">
                        <div class="newslettre-width text-center">
                            <div class="newslettre-info">
                                <h3 class="title">
                                    Get The Best Blog Stories into Your inbox!</h3>
                                <p> Sign up for free and be the first to get notified about new posts. </p>
                            </div>
                            <form action="#" class="newslettre-form">
                                <div class="form-flex">
                                    <div class="form-group">
                                        <input type="email" class="form-control" placeholder="Your email adress"
                                               required="required">
                                    </div>
                                    <button class="submit-btn" type="submit">Subscribe</button>
                                </div>
                            </form>
                            <div class="social-icones">
                                <ul class="list-inline">
                                    <li>
                                        <a href="#">
                                            <i class="fab fa-facebook-f"></i>Facebook</a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fab fa-twitter"></i>Twitter </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fab fa-instagram"></i>Instagram </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fab fa-youtube"></i>Youtube</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </main>
</template>

<style scoped>

</style>