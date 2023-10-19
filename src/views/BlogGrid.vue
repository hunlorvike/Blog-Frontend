<script>
export default {
    name: "BlogGrid",
    data() {
        return {
            posts: [],
            categories: [],
        };
    },
    created() {
        // Lấy dữ liệu ban đầu khi trang tải lần đầu
        this.fetchDataFromAPI(this.$route.query.category);
        this.fetchData();
    },
    watch: {
        $route(to, from) {
            if (to.query.category !== from.query.category) {
                // Tham số "category" đã thay đổi, bạn có thể gọi API để lấy dữ liệu mới ở đây
                this.fetchDataFromAPI(to.query.category);
            }
        },
    },
    methods: {
        fetchDataFromAPI(category) {
            this.axios
                .get(`/api/post/getPostsByCategory?category=${category}`)
                .then((response) => {
                    this.posts = response.data;
                    console.log(this.posts);
                    this.posts.forEach(post => {
                        // Truy cập mảng images trong mỗi bài viết và lặp qua từng hình ảnh
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
        getTruncatedTitle(title) {
            if (title.length > 35) {
                title = title.substring(0, 35) + '...';
            }

            return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
        },
        getTruncatedContent(content) {
            // Hàm này giới hạn nội dung chỉ hiển thị 100 từ đầu tiên
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
        generateCategoryLink(category) {
            // Mã hóa category trước khi truyền nó trong URL
            const encodedCategory = encodeURIComponent(category);

            return {name: 'BlogGrid', query: {category: encodedCategory}};
        }
    },
};
</script>


<template>
    <main class="main">
        <!--category-->
        <section class="categorie-section">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="categorie-title mb-20">
                            <small>
                                <router-link style="color: inherit" to="/">Home</router-link>
                                <i class="fas fa-angle-right"></i>
                                {{ decodeURIComponent($route.query.category) || 'Category' }}
                            </small>
                            <h3 class="fw-bolder">Category:
                                <span>{{ decodeURIComponent($route.query.category) || 'Category' }}</span></h3>
                            <p class="">Ai ở đâu thì ở yên ở đấy đừng nhảy sang mảng IT nữa. <span
                                style="color: #FF8080; font-weight: 600">Chật lắm rồi !</span>
                                Bám trụ thôi, đang
                                kì thanh
                                lọc
                                xem ai còn được ở lại hay theo làn sóng TikToker, KOL, KOC, Sales, Livestream làm những
                                trò giải trí mua
                                vui cho thiên hạ, tạo giá trị giải trí
                                hay là vùng vẫy cầu sinh ở chốn 1m vuông có 1 con chó vs 1 thằng dev react. <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span class="fst-italic" style="color: #FF8080; font-weight: 600">Muốn kiếm ăn thì đi 1 mình, muốn kiếm xương thì đi giành với chó</span>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!--blog-grid-->
        <section class="blog-grid">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-9 mt-30 side-content">
                        <div class="theiaStickySidebar">
                            <div class="row">
                                <div class=" col-lg-6 col-md-6" v-for="post in posts" :key="post.id">
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
                                                    :to="{ name: 'BlogGrid', query: { category: post.category } }"
                                                >
                                                    {{ post.category }}
                                                </router-link>
                                            </div>

                                            <h5 class="entry-title fw-bolder">
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
                                                <li class="post-date">
                                                    <span class="dot"></span>
                                                    {{ formatDateTime(post.updated_at) }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!--/-->
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
                                        <a href="author.html" class="image">
                                            <img src="../assets/img/image/newlogo.png" alt="">
                                        </a>
                                    </div>
                                    <div class="author-content">
                                        <h6 class="name"> Hi, I'm 61 Group</h6>
                                        <p class="bio">
                                            I'm David Smith, husband and father ,
                                            I love Photography,travel and nature. I'm working as a writer and blogger
                                            with experience
                                            of 5 years until now.
                                        </p>
                                        <div class="social-media">
                                            <ul class="list-inline">
                                                <li>
                                                    <a href="#" class="color-facebook">
                                                        <i class="fab fa-facebook"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="color-instagram">
                                                        <i class="fab fa-instagram"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="color-twitter">
                                                        <i class="fab fa-twitter"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="color-youtube">
                                                        <i class="fab fa-youtube"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="color-pinterest">
                                                        <i class="fab fa-pinterest"></i>
                                                    </a>
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
                                                Before Traveling to
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
                                                know about visiting the
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
                                        <router-link class="categorie"
                                                     :to="generateCategoryLink(category)"
                                        >
                                            {{ category }}
                                        </router-link>
                                        <span class="ml-auto">{{ posts.length }} Posts</span>
                                    </li>


                                </ul>
                            </div>

                            <!--widget-instagram-->
                            <div class="widget">
                                <div class="section-title">
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


