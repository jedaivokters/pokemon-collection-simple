<template>
  <div id="test_home">
    <div class="page-wrapper">
      <!-- HEADER MOBILE-->
      <header class="header-mobile d-block d-lg-none">
        <div class="header-mobile__bar">
          <div class="container-fluid">
            <div class="header-mobile-inner">
              <a class="logo" href=""> Pokemon </a>
              <button class="hamburger hamburger--slider" type="button">
                <span class="hamburger-box">
                  <span class="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <nav class="navbar-mobile">
          <div class="container-fluid">
            <ul class="navbar-mobile__list list-unstyled">
              <li :class="[{ active: $route.name == 'index' }]">
                <router-link class="js-arrow" :to="{ name: 'dashboard' }">
                  <i class="fas fa-tachometer-alt"></i>Dashboard
                </router-link>
              </li>
              <li :class="[{ active: $route.name == 'collections' }]">
                <router-link class="js-arrow" :to="{ name: 'collections' }">
                  <i class="fas fa-wrench"></i>Manage Collection
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <!-- END HEADER MOBILE-->

      <!-- MENU SIDEBAR-->
      <aside class="menu-sidebar d-none d-lg-block">
        <div class="logo">
          <a href="">
            <img src="images/icon/logo.gif" alt="Pokemon Collection" />
          </a>
        </div>
        <div class="menu-sidebar__content js-scrollbar1">
          <nav class="navbar-sidebar">
            <ul class="list-unstyled navbar__list">
              <li :class="[{ active: $route.name == 'index' }]">
                <router-link class="js-arrow" :to="{ name: 'dashboard' }">
                  <i class="fas fa-tachometer-alt"></i>Dashboard
                </router-link>
              </li>
              <li :class="[{ active: $route.name == 'collections' }]">
                <router-link class="js-arrow" :to="{ name: 'collections' }">
                  <i class="fas fa-wrench"></i>Manage Collection
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <!-- END MENU SIDEBAR-->

      <!-- PAGE CONTAINER-->
      <div class="page-container">
        <!-- HEADER DESKTOP-->
        <header class="header-desktop">
          <div class="section__content section__content--p30">
            <div class="container-fluid">
              <div class="header-wrap">
                <div class="form-header"></div>
                <div class="header-button">
                  <div class="account-wrap">
                    <div class="account-item clearfix js-item-menu">
                      <div class="image">
                        <img
                          src="images/icon/avatar-01.jpg"
                          alt="Pokemon Master"
                        />
                      </div>
                      <div class="content">
                        <a class="js-acc-btn" href="#">Pokemon Master</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <!-- HEADER DESKTOP-->

        <!-- MAIN CONTENT-->
        <div class="main-content">
          <div class="section__content">
            <div class="container-fluid">
              <router-view />
            </div>
          </div>
        </div>
        <!-- END MAIN CONTENT-->
        <!-- END PAGE CONTAINER-->
      </div>
    </div>
  </div>
</template>

<!-- Main JS-->

<script>
export default {
  components: {},
  data() {
    return {
      todos: [],
    };
  },
  async mounted() {
    this.addToHeader();
  },

  methods: {
    addToHeader() {
      let main = document.createElement("script");
      main.setAttribute("src", "/js/main.js");
      document.head.appendChild(main);
    },
  },
};
</script>
