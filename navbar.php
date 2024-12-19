<!-- Header -->
 <?php
    // Get the current file name
    $currentFileName = basename($_SERVER['PHP_SELF']);
 ?>
<header id="wn__header" class="oth-page header__area sticky__header" style="background-color: white;">
    <div class="container-fluid" id="navbar-row" 
        style="background-color: white; <?php if($currentFileName != 'index.php'){ echo 'border-bottom: 1px solid gray'; } ?>">
        <div class="row" style="display: flex; justify-content: space-between;">
            <div class="col-md-2 col-sm-4 col-3 col-lg-2">
                <div class="logo">
                    <a href="index.php">
                        <img src="images/logo/logo.png" id="logo" alt="logo images" width="80px">
                    </a>
                </div>
            </div>
            <div class="col-lg-5 d-none d-lg-block" style="width: 500px;">
                <nav class="mainmenu__nav">
                    <ul class="meninmenu d-flex justify-content-start">
                        <li>
                            <a href="index.php" style="color: <?= $currentFileName === 'index.php' ? '#ef0029;': 'black;' ?>">Home</a>
                        </li>
                        <li>
                            <a href="category.php" style="color: <?= $currentFileName === 'category.php' ? '#ef0029;': 'black;' ?>">E-books</a>
                        </li>
                        <li>
                            <a href="podcast.php" style="color: <?= $currentFileName === 'podcast.php' ? '#ef0029;': 'black;' ?>">podcasts</a>
                        </li>
                        <li>
                            <a href="full-width-layout.php" style="color: <?= $currentFileName === 'full-width-layout.php' ? '#ef0029;': 'black;' ?>">My E-Books</a>
                        </li>
                        <!-- <li><a href="#">Add a Book</a></li> -->
                        <!-- <li><a href="#">Profile</a></li> -->
                    </ul>
                </nav>
            </div>
            <div class="col-md-3 col-sm-4 col-6 col-lg-2">
                <div class="logo" style="width: 100%;">
                    <ul style="display: flex; justify-content: space-evenly">
                        <li>
                            <a onclick="toggleLanguageDropDown()" href="#">        
                                <i style="font-size: 18px; color: #ef0029;" class="fa-solid fa-globe"></i>
                            </a>
                        </li>
                        <li>
                            <a href="search.php">
                                <i style="font-size: 18px; color: #ef0029;" class="fa-solid fa-magnifying-glass"></i>
                            </a>
                        </li>
                        <li>
                            <a onclick="toggleUserDropDown()" href="#">
                                <i style="font-size: 18px; color: #ef0029;" class="fa-solid fa-user"></i>
                            </a>
                        </li>
                        <li class="d-block d-sm-none">
                            <a onclick="toggleMobileMenu()" href="#">
                                <i style="font-size: 18px; color: #ef0029;" class="fa-solid fa-bars"></i>
                            </a>
                            <!-- <div class="mobile-menu d-block d-lg-none"></div> -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Start Mobile Menu -->
        <div class="row d-none">
            <div class="col-lg-12 d-none">
                <nav class="mobilemenu__nav">
                    <ul class="meninmenu">
                        <li><a href="index.php">Home</a></li>
                        <li><a href="category.php">E-books</a></li>
                        <li><a href="podcast.php">podcasts</a></li>
                        <li><a href="full-width-layout.php">My E-books</a></li>
                    </ul>
                </nav>
            </div>
        </div>
        <!-- End Mobile Menu -->
        <!-- Mobile Menu -->
    </div>
</header>
<div class="dropdown-menu show p-2 dropdown-menu-style" id="language-dropdown" data-popper-placement="bottom-start">
    <ul style="padding: 20px 10px;">
        <li class="single-list"><a href="index.php">English</a></li>
        <li class="single-list"><a href="#">Dari</a></li>
        <li class="single-list"><a href="#">Pashto</a></li>
    </ul>
</div>
<div class="dropdown-menu show p-2 dropdown-menu-style" id="user-dropdown" data-popper-placement="bottom-start">
    <ul style="padding: 20px 10px;">
        <li class="single-list"><a href="request-book.php">Request A Book</a></li>
        <li class="single-list"><a href="#">My Account</a></li>
        <li class="single-list"><a href="#">Logout</a></li>
    </ul>
</div>
<div class="dropdown-menu show p-2 dropdown-menu-style" id="menu-dropdown" data-popper-placement="bottom-start">
    <ul style="padding: 20px 10px;">
        <li><a href="index.php">Home</a></li>
        <li><a href="category.php">E-books</a></li>
        <li><a href="podcast.php">podcasts</a></li>
        <li><a href="full-width-layout.php">My E-books</a></li>
    </ul>
</div>
<!-- //Header -->
  <!-- Toast container -->
  <div class="toast" id="myToast" style="position: fixed; z-index: 999; right: 0; top: 20px; " data-bs-autohide="true" data-bs-delay="3000">
    <div class="toast-header">
        <div style="padding: 0px 5px; color: #ef0029;">
            <i class="fa-solid fa-check"></i>
        </div>
      <strong class="me-auto" id="toastText"></strong>
      <!-- <small>Just now</small> -->
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
