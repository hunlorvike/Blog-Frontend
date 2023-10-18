<template>
    <main class="main">

        <!--grid-layout-->
        <section class="mt-90">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-4 col-lg-6 col-md-6" v-for="post in posts" :key="post.id">
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
                                            {{ post.author }}
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
<script>
export default {
    name: "Index",
    data() {
        return {
            posts: [],
        };
    },
    created() {
        this.fetchData();

    },
    methods: {
        fetchData() {
            this.axios
                .get("/api/post/getAllPosts")
                .then((response) => {
                    this.posts = response.data.data;

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
                return words.slice(0, 15).join(' ') + '...';
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
    }
}
</script>
