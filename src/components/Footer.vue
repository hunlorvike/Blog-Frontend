<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="copyright">
            <p>© Copyright 2023 <a href="#">Group SixOne</a>, All rights reserved.</p>
          </div>
          <div class="back">
            <a href="#" class="back-top">
              <i class="fas fa-arrow-up"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
    name: "Footer",
    mounted() {
        $(window).on("scroll", function () {
            if ($(window).scrollTop() > 250) {
                $('.back-top').fadeIn(300);
            } else {
                $('.back-top').fadeOut(300);
            }
        });

        $('.back-top').on('click', function (event) {
            event.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 300);
            return false;
        });
    }
};
</script>
