<script>
import {Swiper, SwiperSlide} from 'swiper/vue';
import {A11y, Autoplay, Navigation, Pagination} from "swiper/modules";

export default {
    name: "PostDetail",
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Navigation, Pagination, Autoplay, A11y],
        };
    },
    data() {
        return {
            categories: [],
            post: [],
            author: null,

        };
    },

    created() {
        this.fetchData();
        this.fetchDataPostFromAPI(this.$route.query.post_id);
    },
    watch: {
        $route(to, from) {
            if (to.query.post_id !== from.query.post_id) {
                // Tham số "post_id" đã thay đổi, bạn có thể gọi API để lấy dữ liệu mới ở đây
                this.fetchDataFromAPI(to.query.post_id);
            }
        },
    },
    methods: {
        fetchData() {
            this.axios
                .get("/api/category/getAllCategorys")
                .then((response) => {
                    this.categories = response.data.map(item => item.category_name);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        },
        fetchDataAuthorById(creatorId) {
            this.axios
                .get(`/api/user/getUsersById?id=${creatorId}`)
                .then((response) => {
                    this.author = response.data;
                    // Kiểm tra xem có đường dẫn hình ảnh không
                    if (this.author.avatar_path) {
                        const segments = this.author.avatar_path.split('\\');
                        const fileName = segments.pop();
                        this.author.avatar_path = 'src/assets/img/upload/' + fileName;
                    }
                })
                .catch((error) => {
                    console.error("Error fetching author data:", error);
                });
        },
        fetchDataPostFromAPI(postId) {
            this.axios
                .get(`/api/post/getPostById?id=${postId}`)
                .then((response) => {
                    this.post = response.data;
                    console.log("post " + response.data);
                    // Truy cập mảng images trong mỗi bài viết và lặp qua từng hình ảnh
                    if (this.post.images) {
                        this.post.images.forEach(image => {
                            image.image_path = 'src/assets/img/upload/' + image.image_path.split('\\').pop();
                        });
                    }

                    console.log(this.post.images);

                    // Lấy thông tin tác giả dựa trên creator_id
                    this.fetchDataAuthorById(this.post.creator_id);
                })
                .catch((error) => {
                    console.error("Error fetching post data:", error);
                });
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
        },
        formatDateTime(dateTimeString) {
            const options = {year: 'numeric', month: 'long', day: 'numeric'};
            const dateTime = new Date(dateTimeString);
            return dateTime.toLocaleDateString('en-US', options);
        },
        convertNewlinesToBr(text) {
            return text.replace(/\n/g, '<br>');
        }
    }

}

</script>
<template>
    <main class="main">
        <!--post-default-->
        <section class="mt-60  mb-30">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-9 side-content">
                        <div class="theiaStickySidebar">
                            <!--Post-single-->
                            <div class="post-single">
                                <div class="post-single-gallery">
                                    <!--slider-gallery-->
                                    <div class="slider-style5 ">
                                        <!--TODO-->
                                        <swiper
                                            class="swiper-wrapper"
                                            :modules="modules"
                                            :space-between="0"
                                            :loop="true"
                                            :pagination="{clickable: true}"
                                            :autoplay="{
                                                    delay: 3000,
                                                    disableOnInteraction: false,
                                                    pauseOnMouseEnter: true,
                                                }">

                                            <swiper-slide v-for="image in post.images" :key="image.id">
                                                <div class="slider-item swiper-slide"
                                                     :style="'background-image: url(' + image.image_path + ');'"></div>

                                            </swiper-slide>
                                        </swiper>

                                    </div>

                                </div>
                                <div class="post-single-content">
                                    <router-link
                                        class="categorie"
                                        :to="{ name: 'BlogGrid', query: { category: post.category } }"
                                    >
                                        {{ post.category }}
                                    </router-link>
                                    <h3 class="title fw-bolder">
                                        <router-link style="color: inherit"
                                                     :to="{ name: 'Post Detail', query: { post_id: post.post_id } }"
                                        >
                                            {{ post.title }}
                                        </router-link>
                                    </h3>
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
                                        <li class="post-date"><span class="dot"></span>
                                            {{ formatDateTime(post.updated_at) }}
                                        </li>
                                    </ul>

                                </div>

                                <div class="post-single-body" v-html="convertNewlinesToBr(post.content)">

                                </div>

                                <div class="post-single-footer">
                                    <div class="tags">
                                        <ul class="list-inline m-0">
                                            <li v-for="category in categories" :key="category.id">
                                                <router-link style="color: inherit"
                                                             :to="{ name: 'BlogGrid', query: { category: category } }"
                                                >
                                                    {{ category }}
                                                </router-link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="social-media">
                                        <ul class="list-inline">
                                            <li class="me-1">
                                                <a :href="author.social && author.social[0] && user.social[0].platform === 'Facebook' ? author.social[0].profile_url : getDefaultProfileUrl('Facebook')"
                                                   class="color-facebook">
                                                    <i class="fab fa-facebook"></i>
                                                </a>

                                            </li>
                                            <li class="me-1">
                                                <a :href="author.social && author.social[0] && author.social[0].platform === 'Instagram' ? author.social[0].profile_url : getDefaultProfileUrl('Instagram')"
                                                   class="color-instagram">
                                                    <i class="fab fa-instagram"></i>
                                                </a>
                                            </li>
                                            <li class="me-1">
                                                <a :href="author.social && author.social[0] && author.social[0].platform === 'Twitter' ? author.social[0].profile_url : getDefaultProfileUrl('Twitter')"
                                                   class="color-twitter"><i
                                                    class="fab fa-twitter"></i></a>

                                            </li>
                                            <li class="me-1">
                                                <a :href="author.social && author.social[0] && author.social[0].platform === 'Github' ? author.social[0].profile_url : getDefaultProfileUrl('Github')"
                                                   class="color-github"><i
                                                    class="fa-brands fa-github"></i></a>
                                            </li>
                                            <li class="me-1">
                                                <a :href="author.social && author.social[0] && author.social[0].platform === 'Gitlab' ? author.social[0].profile_url : getDefaultProfileUrl('Gitlab')"
                                                   class="color-gitlab"><i
                                                    class="fa-brands fa-gitlab"></i></a>

                                            </li>
                                            <li class="me-1">
                                                <a :href="author.social && author.social[0] && author.social[0].platform === 'Pinterest' ? author.social[0].profile_url : getDefaultProfileUrl('Pinterest')"
                                                   class="color-pinterest"><i
                                                    class="fab fa-pinterest"></i></a>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div> <!--/-->

                            <!--next & previous-posts-->
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="widget">
                                        <div class="widget-next-post">
                                            <div class="post-item">
                                                <div class="image">
                                                    <a href="post-default.html"> <img src="../assets/img/latest/1.jpg"
                                                                                      alt="..."></a>
                                                </div>

                                                <div class="content">
                                                    <a class="btn-link" href="post-default.html"><i
                                                        class="fas fa-arrow-left"></i>Preview
                                                        post</a>
                                                    <p class="entry-title"><a href="post-default.html">5 Things I Wish I
                                                        Knew Before
                                                        Traveling to
                                                        Malaysia</a></p>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="widget">
                                        <div class="widget-previous-post">
                                            <div class="post-item">
                                                <div class="image">
                                                    <a href="#"> <img src="../assets/img/latest/2.jpg"
                                                                      alt="..."></a>
                                                </div>

                                                <div class="content">
                                                    <a class="btn-link" href="#"><i
                                                        class="fas fa-arrow-right"></i>next
                                                        post</a>
                                                    <p class="entry-title"><a href="#">5 Things I Wish I
                                                        Knew Before
                                                        Traveling to
                                                        Malaysia</a></p>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div><!--/-->

                            <!--widget-comments-->
                            <div class="widget mb-50">
                                <div class="widget-comments">
                                    <div class="title">
                                        <h5>3 Comments</h5>
                                    </div>
                                    <ul class="widget-comments-items">
                                        <li class="comment-item">
                                            <img src="../assets/img/image/newlogo.png" alt="">
                                            <div class="content">
                                                <ul class="info list-inline">
                                                    <li>Nguyễn Việt Hưng</li>
                                                    <li class="dot"></li>
                                                    <li> {{ formatDateTime(new Date()) }}</li>
                                                </ul>
                                                <p>
                                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                    Repellendus
                                                    at
                                                    doloremque adipisci
                                                    eum placeat
                                                    quod non fugiat aliquid sit similique!
                                                </p>
                                                <div><a href="#" class="btn-link"> <i class="arrow_back"></i> Reply</a>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="comment-item">
                                            <img src="../assets/img/image/newlogo.png" alt="">
                                            <div class="content">
                                                <ul class="info list-inline">
                                                    <li>Đỗ Văn Hảo</li>
                                                    <li class="dot"></li>
                                                    <li> {{ formatDateTime(new Date()) }}</li>
                                                </ul>

                                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
                                                    at
                                                    doloremque adipisci
                                                    eum placeat quod non
                                                    fugiat aliquid sit similique!
                                                </p>
                                                <div>
                                                    <a href="#" class="btn-link">
                                                        <i class="arrow_back"></i> Reply</a>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="comment-item">
                                            <img src="../assets/img/image/newlogo.png" alt="">
                                            <div class="content">

                                                <ul class="info list-inline">
                                                    <li>Đỗ Thu Hương</li>
                                                    <li class="dot"></li>
                                                    <li> {{ formatDateTime(new Date()) }}</li>
                                                </ul>

                                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
                                                    at
                                                    doloremque adipisci
                                                    eum placeat
                                                    quod non fugiat aliquid sit similique!
                                                </p>

                                                <div>
                                                    <a href="#" class="btn-link">
                                                        <i class="arrow_back"></i> Reply</a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <!--Leave-comments-->
                                <div class="widget-form">
                                    <div class="title">
                                        <h5>Leave a Reply</h5>
                                    </div>
                                    <form class="widget-contact-form" action="#" method="POST" id="main_contact_form">
                                        <p>Your email adress will not be published ,Requied fileds are marked*.</p>
                                        <div class="alert alert-success contact_msg" style="display: none" role="alert">
                                            Your message was sent successfully.
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                          <textarea name="message" id="message" cols="30" rows="5" class="form-control"
                                    placeholder="Message*" required="required"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <input type="text" name="name" id="name" class="form-control"
                                                           placeholder="Name*"
                                                           required="required">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <input type="email" name="email" id="email" class="form-control"
                                                           placeholder="Email*"
                                                           required="required">
                                                </div>
                                            </div>
                                            <div class="col-12 mb-20">
                                                <div class="form-group">
                                                    <input type="text" name="website" id="website" class="form-control"
                                                           placeholder="Website*">
                                                </div>
                                                <label class="d-flex align-items-center me-2">
                                                    <input name="name" class="me-2" type="checkbox" value="1"
                                                           required="required">
                                                    <span>Save my name , email and website in this browser for the next time I comment.</span>
                                                </label>
                                            </div>
                                            <div class="col-12">
                                                <button type="submit" name="submit" class="btn-custom">
                                                    Send Comment
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 max-width side-sidebar">
                        <div class="theiaStickySidebar">
                            <!--widget-latest-posts-->

                            <!--widget-author-->
                            <div class="widget">
                                <div class="widget-author">
                                    <div class="author-img">
                                        <router-link class="image"
                                                     :to="{ name: 'Author', query: { author: author.user_id } }"
                                        >
                                            <img
                                                :src="author.avatar_path ? author.avatar_path : 'src/assets/img/image/newlogo.png'"
                                                alt="Author Avatar">

                                        </router-link>

                                    </div>
                                    <div class="author-content">
                                        <h6 class="name"> Hi, I'm {{ author.fullname }}</h6>
                                        <p class="bio">
                                            Em xin chào mọi người và các anh chị HR! <br>

                                            {{ author.email }}
                                        </p>
                                        <div class="social-media">
                                            <ul class="list-inline">
                                                <li class="me-1">
                                                    <a :href="author.social && author.social[0] && user.social[0].platform === 'Facebook' ? author.social[0].profile_url : getDefaultProfileUrl('Facebook')"
                                                       class="color-facebook">
                                                        <i class="fab fa-facebook"></i>
                                                    </a>

                                                </li>
                                                <li class="me-1">
                                                    <a :href="author.social && author.social[0] && author.social[0].platform === 'Instagram' ? author.social[0].profile_url : getDefaultProfileUrl('Instagram')"
                                                       class="color-instagram">
                                                        <i class="fab fa-instagram"></i>
                                                    </a>
                                                </li>
                                                <li class="me-1">
                                                    <a :href="author.social && author.social[0] && author.social[0].platform === 'Twitter' ? author.social[0].profile_url : getDefaultProfileUrl('Twitter')"
                                                       class="color-twitter"><i
                                                        class="fab fa-twitter"></i></a>

                                                </li>
                                                <li class="me-1">
                                                    <a :href="author.social && author.social[0] && author.social[0].platform === 'Github' ? author.social[0].profile_url : getDefaultProfileUrl('Github')"
                                                       class="color-github"><i
                                                        class="fa-brands fa-github"></i></a>
                                                </li>
                                                <li class="me-1">
                                                    <a :href="author.social && author.social[0] && author.social[0].platform === 'Gitlab' ? author.social[0].profile_url : getDefaultProfileUrl('Gitlab')"
                                                       class="color-gitlab"><i
                                                        class="fa-brands fa-gitlab"></i></a>

                                                </li>
                                                <li class="me-1">
                                                    <a :href="author.social && author.social[0] && author.social[0].platform === 'Pinterest' ? author.social[0].profile_url : getDefaultProfileUrl('Pinterest')"
                                                       class="color-pinterest"><i
                                                        class="fab fa-pinterest"></i></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--/-->


                            <div class="widget ">
                                <div class="section-title">
                                    <h5 class="fw-bolder">Latest Posts</h5>
                                </div>
                                <ul class="widget-latest-posts p-0">

                                    <li class="post-item">
                                        <div class="image">
                                            <a href="post-default.html"> <img src="../assets/img/latest/1.jpg"
                                                                              alt="..."></a>
                                        </div>
                                        <div class="count">1</div>
                                        <div class="content">
                                            <p class="entry-title"><a href="post-default.html">5 Things I Wish I Knew
                                                Before
                                                Traveling to
                                                Malaysia</a></p>
                                            <small class="post-date"><i class="fas fa-clock"></i> January 15,
                                                2022</small>
                                        </div>
                                    </li>

                                    <li class="post-item">
                                        <div class="image">
                                            <a href="post-default.html">
                                                <img src="../assets/img/latest/2.jpg" alt="...">
                                            </a>
                                        </div>
                                        <div class="count">2</div>
                                        <div class="content">
                                            <p class="entry-title"><a href="post-default.html">Everything you need to
                                                know about
                                                visiting the
                                                Amazon.</a></p>
                                            <small class="post-date"><i class="fas fa-clock"></i> January 15,
                                                2022</small>
                                        </div>
                                    </li>

                                    <li class="post-item">
                                        <div class="image">
                                            <a href="post-default.html">
                                                <img src="../assets/img/latest/3.jpg" alt="...">
                                            </a>
                                        </div>
                                        <div class="count">3</div>
                                        <div class="content">
                                            <p class="entry-title">
                                                <a href="post-default.html">How to spend interesting vacation after hard
                                                    work?</a>
                                            </p>
                                            <small class="post-date"> <i class="fas fa-clock"></i> January 15,
                                                2022</small>
                                        </div>
                                    </li>

                                    <li class="post-item">
                                        <div class="image">
                                            <a href="post-default.html">
                                                <img src="../assets/img/latest/4.jpg" alt="...">
                                            </a>
                                        </div>
                                        <div class="count">4</div>
                                        <div class="content">
                                            <p class="entry-title">
                                                <a href="post-default.html">10 Best and Most Beautiful Places to Visit
                                                    in Italy</a>
                                            </p>
                                            <small class="post-date"> <i class="fas fa-clock"></i> January 15,
                                                2022</small>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                            <!--/-->

                            <!--widget-categories-->
                            <div class="widget">
                                <div class="section-title">
                                    <h5 class="fw-bolder">Categories</h5>
                                </div>
                                <ul class="widget-categories p-0 m-0">
                                    <li v-for="category in categories" :key="category.id">
                                        <a href="#" class="categorie">{{ category }}</a>
                                        <span class="ml-auto">22 Posts</span>
                                    </li>

                                </ul>
                            </div>

                            <!--widget-instagram-->
                            <div class="widget">
                                <div class="section-title ">
                                    <h5 class="fw-bolder">Instagram</h5>
                                </div>
                                <ul class="widget-instagram p-0">
                                    <li>
                                        <a class="image" href="#">
                                            <img src="../assets/img/instagram/1.jpg" alt="">
                                        </a>
                                    </li>
                                    <li>
                                        <a class="image" href="#">
                                            <img src="../assets/img/instagram/2.jpg" alt="">
                                        </a>
                                    </li>
                                    <li>
                                        <a class="image" href="#">
                                            <img src="../assets/img/instagram/3.jpg" alt="">
                                        </a>
                                    </li>
                                    <li>
                                        <a class="image" href="#">
                                            <img src="../assets/img/instagram/4.jpg" alt="">
                                        </a>
                                    </li>
                                    <li>
                                        <a class="image" href="#">
                                            <img src="../assets/img/instagram/5.jpg" alt="">
                                        </a>
                                    </li>
                                    <li>
                                        <a class="image" href="#">
                                            <img src="../assets/img/instagram/6.jpg" alt="">
                                        </a>
                                    </li>
                                </ul>

                            </div>

                            <!--widget-tags-->
                            <div class="widget">
                                <div class="section-title">
                                    <h5 class="fw-bolder">Tags</h5>
                                </div>
                                <div class="widget-tags">
                                    <ul class="list-inline m-0">
                                        <li v-for="category in categories" :key="category.id">
                                            <router-link style="color: inherit"
                                                         :to="generateCategoryLink(category)"
                                            >
                                                {{ category }}
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!--/-->

                            <!--widget-ads-->
                            <div class="widget">
                                <div class="section-title">
                                    <h5 class="fw-bolder">ads</h5>
                                </div>
                                <div class="widget-ads">
                                    <a href="#">
                                        <img src="../assets/img/ads/ads3.jpg" alt="">
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section><!--/-->

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
