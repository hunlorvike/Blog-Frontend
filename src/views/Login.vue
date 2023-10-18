<template>

  <main class="main">
    <!--Login-->
    <section class="mt-60 mb-60">
      <div class="container">
        <div class="sign widget ">
          <div class="section-title">
            <h5>Login</h5>
          </div>
          <form action="#" class="sign-form widget-form " method="post">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Username*" name="username" value="">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Password*" name="password" value="">
            </div>
            <div class="sign-controls form-group">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="rememberMe">
                <label class="custom-control-label" for="rememberMe">Remember Me</label>
              </div>
              <a href="#" class="btn-link  ml-auto">Forgot Password?</a>
            </div>
            <div class="form-group">
              <button type="submit" class="btn-custom">Login now</button>
            </div>
            <p class="form-group text-center">Don't have an account?
              <router-link class="btn-link" to="/register">Create
                One
              </router-link>
            </p>

          </form>
        </div>
      </div>
    </section>

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
                    <input type="email" class="form-control" placeholder="Your email adress" required="required">
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
  name: "Login",
};
</script>
<style scoped>

</style>