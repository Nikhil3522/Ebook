<!doctype html>
<html class="no-js" lang="zxx">


<!-- Mirrored from htmldemo.net/boighor/boighor/shop-grid.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 14 Nov 2024 12:45:31 GMT -->
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>EBook</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Favicons -->
    <link rel="shortcut icon" href="images/logo/logo.png">
    <link rel="apple-touch-icon" href="images/logo/logo.png">

    <!-- Google font (font-family: 'Roboto', sans-serif; Poppins ; Satisfy) -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,300i,400,400i,500,600,600i,700,700i,800"
          rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">

    <!-- Stylesheets -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/plugins.css">
    <link rel="stylesheet" href="css/style.css">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <!-- Cusom css -->
    <link rel="stylesheet" href="css/custom.css">

    <!-- Modernizer js -->
    <script src="js/vendor/modernizr-3.5.0.min.js"></script>
</head>
<style>
    #loader{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    #wrapper{
        display: none;
    }
    
    .mean-bar{
        background: white !important;
    }


#footer-music-player {
    font-family: "sofia-pro", sans-serif;
    color: #fff;
    width: 100%;
    padding: 0px;
    position: fixed;
    z-index: 10;
    bottom: 0;
    background: #363c43;
    padding: 10px 10px 0px 10px;
    display: none;
}
#footer-music-player .player-container {
    /* max-width: 800px; */
    margin: 0;
}
#footer-music-player .controls-and-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0px;
    flex-wrap: nowrap; /* Prevent wrapping */
}
#footer-music-player .control-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
}
#footer-music-player .control-button svg {
    width: 20px;
    height: 20px;
    fill: #6ec3e8;
}
#footer-music-player .play-pause-button {
    background-color: #6ec3e8;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
#footer-music-player .play-pause-button svg {
    width: 20px;
    height: 24px;
    fill: white;
}
#footer-music-player .song-info {
    /* flex-grow: 1; */
    /* margin-left: 15px; */
    margin-top:-5px;
}
#footer-music-player #footer-song-title {
    font-size: 1rem;
    font-weight: bold;
    line-height:1em;
    margin-left: 10px;
}
#footer-music-player #footer-artist-name {
    font-size: 10px;
    color: #aaa;
    margin-left: 10px;
    letter-spacing:0.3px;
    display: none;
    
}
#footer-music-player .lyrics-button,
#footer-music-player .download-button {
    background: none;
    border: 1px solid #6ec3e8;
    color: #6ec3e8;
    padding: 0.5em;
    margin: 0 5px;
    cursor: pointer;
    font-size: 0.9rem;
    border-radius: 3px;
    letter-spacing: 0.5px;
    font-weight: 600;
    flex-shrink: 0; /* Prevent buttons from shrinking */
}
#footer-music-player .download-button {
    display: flex;
    align-items: center;
}
#footer-music-player .download-button svg {
    width: 14px;
    height: 14px;
    margin-left: 5px;
    fill: currentColor;
}
#footer-music-player .time-display {
    font-size: 0.9rem;
    margin-left: 10px;
    min-width: 75px; /* Adjust this value as needed */
    text-align: right;
    opacity:0.8;
}


#footer-music-player .progress-bar {
    width: 100%;
    height: 4px;
    background-color: rgba(141,114,140,0.3);
    cursor: pointer;
    margin-top:8px;
}
#footer-music-player .progress {
    width: 0%;
    height: 100%;
    background-color: #6ec3e8;
}

@media only screen and (max-width: 767px) {
#footer-artist-name{
    display:none;
}

#footer-music-player .lyrics-button{
    display:none;
}

#footer-music-player .download-button{
    font-size:0.9rem;
    padding:0.4em;
}

#footer-music-player .time-display{
    display:none;
}

#footer-music-player .player-container{
    padding:5px;
}

#footer-music-player .play-pause-button{
    width:25px;
    height:25px;
}
#footer-music-player .play-pause-button svg{
    width:15px;
    height:15px;
}

#footer-music-player .progress-bar{
    margin-top:5px;
}

#footer-music-player .song-info{
    margin-left:10px;
}
  }
</style>

<body>
<!--[if lte IE 9]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade
    your browser</a> to improve your experience and security.</p>
<![endif]-->

<div id="loader">
    <img src="loader/loader.gif" />
</div>
<!-- Main wrapper -->
<div class="wrapper" id="wrapper">

    <?php 
        include('navbar.php');
        include('cons.php');
    ?>
    <!-- Start Search Popup -->
    <div class="box-search-content search_active block-bg close__top">
        <form id="search_mini_form" class="minisearch" action="#">
            <div class="field__search">
                <input type="text" placeholder="Search entire store here...">
                <div class="action">
                    <a href="#"><i class="zmdi zmdi-search"></i></a>
                </div>
            </div>
        </form>
        <div class="close__wrap">
            <span>close</span>
        </div>
    </div>
    <!-- End Search Popup -->
    <div id="footer-music-player">
        <div class="player-container">
            <div class="controls-and-info">
                <div class="song-info" style="min-width: 250px; max-width: 250px; height: 39px; overflow: hidden;">
                    <img id="footer-song-thumbanil" src="https://roshan1.b-cdn.net/ebook/OliverTwist_02.png" style="margin: -3px; height: 45px;"/>
                    <span id="footer-song-title">Song Title</span>
                    <span id="footer-artist-name">JENNIFER GIVENS</span>
                </div>
                <div class="d-flex">
                    <button class="control-button" id="footer-prev-button">
                        <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                    </button>
                    <button class="control-button play-pause-button" id="footer-play-pause-button">
                        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                    <button class="control-button" id="footer-next-button">
                        <svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                    </button>
                </div>
                <!-- <button class="mute-btn" onclick="muterAudio()">🔇</button> -->
                <!-- <button class="lyrics-button">LYRICS</button> -->
                <!-- <button class="download-button">$0.99 <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg></button> -->
                <div class="time-display">
        <span id="footer-current-time">0:00</span> / <span id="footer-total-time">0:00</span>
    </div>
            </div>
            <div class="progress-bar" id="footer-progress-bar">
                <div class="progress" id="footer-progress"></div>
            </div>
        </div>
        <audio id="footer-audio-player">
            <source src="" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    </div>
    <!-- Start Shop Page -->
    <div class="page-shop-sidebar left--sidebar bg--white pb-4" style="border-bottom: 1px solid gray; display: flex; justify-content: center;">
        <div class="container" style="margin-top: 60px;">
            <div class="row">
                <?php include('side_podcast_category.php') ?>
                <div class="col-lg-9 col-12 order-1 order-lg-2">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="shop__list__wrapper d-flex flex-wrap flex-md-nowrap justify-content-between">
                                <div class="shop__list nav justify-content-center" role="tablist">
                                    <!-- <a class="nav-item nav-link active" onclick="changeLayout()" data-bs-toggle="tab" href="#nav-grid" role="tab"><i class="fa fa-th"></i></a> -->
                                    <!-- <a class="nav-item nav-link" onclick="changeLayout()" data-bs-toggle="tab" href="#nav-list" role="tab"><i class="fa fa-list"></i></a> -->
                                </div>
                                <!-- <p>Showing 1–12 of 40 results</p> -->
                                <div class="orderby__wrapper">
                                    <span>Sort By</span>
                                    <select class="shot__byselect" disabled>
                                        <option>Default sorting</option>
                                        <option>HeadPhone</option>
                                        <option>Furniture</option>
                                        <option>Jewellery</option>
                                        <option>Handmade</option>
                                        <option>Kids</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab__container tab-content">
                        <div class="shop-grid tab-pane fade show active" id="nav-grid" role="tabpanel">
                            <div class="row" id="ebook_row_container"></div>
                        </div>
                        <div class="shop-grid tab-pane fade" id="nav-list" role="tabpanel">
                            <div class="list__view__wrapper" id="ebook_row_container_list"></div>
                        </div>

                        <!-- Load more button -->
                        <div class="d-flex">
                            <button class="m-auto" id="load_more_button">
                                <span id="load_more_text">Load More</span>
                                <span  id="load_more_loading" ><img src="./images/loader5.gif" alt="loader" width="100%"/></span> 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Shop Page -->
    <?php include('footer.php'); ?>
    <!-- QUICKVIEW PRODUCT -->
    <div id="quickview-wrapper">
        <!-- Modal -->
        <div class="modal fade" id="productmodal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal__container" role="document">
                <div class="modal-content">
                    <div class="modal-header modal__header">
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-product">
                            <!-- Start product images -->
                            <div class="product-images">
                                <div class="main-image images">
                                    <img alt="big images" src="images/product/big-img/1.jpg">
                                </div>
                            </div>
                            <!-- end product images -->
                            <div class="product-info">
                                <h1>Simple Fabric Bags</h1>
                                <div class="rating__and__review">
                                    <ul class="rating">
                                        <li><span class="ti-star"></span></li>
                                        <li><span class="ti-star"></span></li>
                                        <li><span class="ti-star"></span></li>
                                        <li><span class="ti-star"></span></li>
                                        <li><span class="ti-star"></span></li>
                                    </ul>
                                    <div class="review">
                                        <a href="#">4 customer reviews</a>
                                    </div>
                                </div>
                                <div class="price-box-3">
                                    <div class="s-price-box">
                                        <span class="new-price">$17.20</span>
                                        <span class="old-price">$45.00</span>
                                    </div>
                                </div>
                                <div class="quick-desc">
                                    Designed for simplicity and made from high quality materials. Its sleek geometry
                                    and material combinations creates a modern look.
                                </div>
                                <div class="select__color">
                                    <h2>Select color</h2>
                                    <ul class="color__list">
                                        <li class="red"><a title="Red" href="#">Red</a></li>
                                        <li class="gold"><a title="Gold" href="#">Gold</a></li>
                                        <li class="orange"><a title="Orange" href="#">Orange</a></li>
                                        <li class="orange"><a title="Orange" href="#">Orange</a></li>
                                    </ul>
                                </div>
                                <div class="select__size">
                                    <h2>Select size</h2>
                                    <ul class="color__list">
                                        <li class="l__size"><a title="L" href="#">L</a></li>
                                        <li class="m__size"><a title="M" href="#">M</a></li>
                                        <li class="s__size"><a title="S" href="#">S</a></li>
                                        <li class="xl__size"><a title="XL" href="#">XL</a></li>
                                        <li class="xxl__size"><a title="XXL" href="#">XXL</a></li>
                                    </ul>
                                </div>
                                <div class="social-sharing">
                                    <div class="widget widget_socialsharing_widget">
                                        <h3 class="widget-title-modal">Share this product</h3>
                                        <ul class="social__net social__net--2 d-flex justify-content-start">
                                            <li class="facebook"><a href="#" class="rss social-icon"><i
                                                    class="zmdi zmdi-rss"></i></a></li>
                                            <li class="linkedin"><a href="#" class="linkedin social-icon"><i
                                                    class="zmdi zmdi-linkedin"></i></a></li>
                                            <li class="pinterest"><a href="#" class="pinterest social-icon"><i
                                                    class="zmdi zmdi-pinterest"></i></a></li>
                                            <li class="tumblr"><a href="#" class="tumblr social-icon"><i
                                                    class="zmdi zmdi-tumblr"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="addtocart-btn">
                                    <a href="#">Add to cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END QUICKVIEW PRODUCT -->
</div>
<!-- //Main wrapper -->
 <!-- Audio File -->
 <audio id="audioPlayer" src="./sample.mp3"></audio>
<!-- JS Files -->
<script>
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('wrapper').style.display = 'block';
    })
</script>
<script src="js/vendor/jquery.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/vendor/bootstrap.min.js"></script>
<script src="js/plugins.js"></script>
<script src="js/active.js"></script>
<script src="js/podcast.js"></script>
<script>
        // Select the button and audio elements
        // const playPauseButton = document.getElementById('footer-play-pause-button');
        // const audioPlayer = document.getElementById('audioPlayer');

        // // Wait until metadata is loaded to ensure duration is available
        // audioPlayer.addEventListener('loadedmetadata', () => {
        //     console.log('Audio duration:', audioPlayer.duration);
        //     if (!isNaN(audioPlayer.duration)) {
        //         const duration = Math.floor(audioPlayer.duration);
        //         console.log(duration);
                
        //         document.getElementById('footer-total-time').innerText = duration;
                
        //     } else {
        //         durationDisplay.textContent = 'Duration not available.';
        //     }
        // });


        // Add click event to the button
        // playPauseButton.addEventListener('click', () => {
        //     if (audioPlayer.paused) {
        //         audioPlayer.play(); // Play the audio
        //         playPauseButton.textContent = 'Pause'; // Update button text
        //     } else {
        //         audioPlayer.pause(); // Pause the audio
        //         playPauseButton.textContent = 'Play'; // Update button text
        //     }
        // });

        // function changeAudio(audioUrl){
        //     audioPlayer.src = audioUrl;
        //     audioPlayer.load();
        //     audioPlayer.play();
        //     playPauseButton.textContent = 'Pause';
        // }

        // function muterAudio() {
        //     audioPlayer.muted = !audioPlayer.muted;
        // }

    </script>
</body>


<!-- Mirrored from htmldemo.net/boighor/boighor/shop-grid.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 14 Nov 2024 12:45:56 GMT -->
</html>