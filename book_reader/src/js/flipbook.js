/*
 * Real3D FlipBook [https://real3dflipbook.com]
 * @author creativeinteractivemedia [https://codecanyon.net/user/creativeinteractivemedia/portfolio]
 * @version 4.8.5
 * @date 2024-11-14
 */
var FLIPBOOK = FLIPBOOK || {};
FLIPBOOK.version = '4.7.3';

// eslint-disable-next-line no-shadow-restricted-names
(function init(window, document, undefined) {
    if (typeof jQuery != 'undefined') {
        jQuery.fn.flipBook = function (options) {
            return new FLIPBOOK.Main(options, this);
        };

        jQuery.fn.swipeBook = function (options) {
            options.viewMode = 'swipe';
            return new FLIPBOOK.Main(options, this);
        };
    }

    window.FlipBook = function (el, options) {
        return new FLIPBOOK.Main(options, el);
    };
})(window, document);

FLIPBOOK.Main = function (options, elem) {
    var self = this;
    if (elem.length) {
        this.elem = elem[0];
        this.elements = Array.from(elem);
    } else {
        this.elem = elem;
        this.elements = [elem];
    }

    this.bodyHasVerticalScrollbar = function () {
        return document.body.scrollHeight > window.innerHeight;
    };
    this.isZoomed = function () {
        return self.zoom > 1;
    };

    let defaultOptions = {
        name: '',
        pages: [],
        tableOfContent: [],
        tableOfContentCloseOnClick: true,
        thumbsCloseOnClick: true,
        thumbsStyle: 'overlay',
        deeplinkingEnabled: false,
        deeplinkingPrefix: '',
        assets: {
            preloader: 'assets/images/preloader.jpg',
            flipMp3: 'assets/mp3/turnPage.mp3',
            spinner: 'assets/images/spinner.gif',
            backgroundMp3: 'assets/mp3/background.mp3',
        },
        pdfUrl: null,
        pdfBrowserViewerIfMobile: false,
        pdfBrowserViewerIfIE: false,
        pdfBrowserViewerFullscreen: true,
        pdfBrowserViewerFullscreenTarget: '_blank',
        rangeChunkSize: 64,
        disableRange: false,
        disableStream: true,
        disableAutoFetch: true,
        pdfAutoLinks: false,
        htmlLayer: true,
        rightToLeft: rightToLeftDirection,
        startPage: lastReadPage,
        sound: true,
        backgroundColor: 'rgb(81, 85, 88)',
        backgroundImage: '',
        backgroundPattern: '',
        backgroundTransparent: false,
        thumbSize: 150,
        loadAllPages: false,
        loadPagesF: 2,
        loadPagesB: 1,
        autoplayOnStart: false,
        autoplayInterval: 3000,
        autoplayLoop: true,
        skin: '',
        menuOverBook: false,
        menuFloating: false,
        menuBackground: '',
        menuShadow: '',
        menuMargin: 0,
        menuPadding: 0,
        menuTransparent: false,
        menu2OverBook: true,
        menu2Floating: false,
        menu2Background: '',
        menu2Shadow: '',
        menu2Margin: 0,
        menu2Padding: 0,
        menu2Transparent: true,

        skinColor: '#222',
        skinBackground: '#FFF',
        floatingBtnColor: '#FFF',
        floatingBtnBackground: '#00000055',
        btnColor: '',
        btnBackground: 'none',
        btnSize: 18,
        btnRadius: 2,
        btnMargin: 2,
        btnPaddingV: 10,
        btnPaddingH: 10,
        btnShadow: '',
        btnTextShadow: '',
        btnBorder: '',
        btnColorHover: '',
        btnBackgroundHover: '',
        arrowColor: '#FFF',
        arrowColorHover: '#FFF',
        arrowBackground: 'rgba(0, 0, 0, 0)',
        arrowBackgroundHover: 'rgba(0, 0, 0, .15)',
        arrowSize: 40,
        arrowRadius: 4,
        arrowMargin: 4,
        arrowPadding: 10,
        arrowTextShadow: '0px 0px 1px rgba(0, 0, 0, 1)',
        arrowBorder: '',
        floatingBtnColorHover: '',
        floatingBtnBackgroundHover: '',
        floatingBtnSize: null,
        floatingBtnRadius: null,
        floatingBtnMargin: null,
        floatingBtnPadding: null,
        floatingBtnShadow: '',
        floatingBtnTextShadow: '',
        floatingBtnBorder: '',
        btnOrder: [
            'currentPage',
            'btnFirst',
            'btnPrev',
            'btnNext',
            'btnLast',
            'btnZoomOut',
            'btnZoomIn',
            'btnThumbs',
            'btnToc',
            
            'search',
            'btnRotateLeft',
            'btnRotateRight',
            'btnAutoplay',
            'btnSearch',
            'btnBookmark',
            //'btnNotes',
            'btnDownloadPages',
            
            'btnShare',
            'btnPrint',
            'btnDownloadPdf',
            'btnSound',
            'btnTools',
            'btnSingle',
            'btnExpand',
            'btnClose',
        ],
        currentPage: {
            enabled: true,
            title: 'Current page',
            vAlign: 'top',
            hAlign: 'left',
            marginH: 0,
            marginV: 0,
            color: '',
            background: '',
        },
        search: {
            enabled: false,
        },
        btnFirst: {
            enabled: false,
            title: 'First page',
            svg: 'last',
            iconReverse: true,
        },
        btnPrev: {
            enabled: true,
            title: 'Previous page',
            svg: 'next',
            iconReverse: true,
        },
        btnNext: {
            enabled: true,
            title: 'Next page',
        },
        btnLast: {
            enabled: false,
            title: 'Last page',
        },
        btnZoomIn: {
            enabled: true,
            title: 'Zoom in',
            svg: 'plus',
        },
        btnZoomOut: {
            enabled: true,
            title: 'Zoom out',
            svg: 'minus',
        },
        btnRotateLeft: {
            enabled: false,
            title: 'Rotate left',
        },
        btnRotateRight: {
            enabled: false,
            title: 'Rotate right',
        },
        btnAutoplay: {
            enabled: true,
            title: 'Autoplay',
            svg: 'play',
            svgAlt: 'pause',
        },
        btnSearch: {
            enabled: false,
            title: 'Search',
        },
        btnBookmark: {
            enabled: true,
            title: 'Bookmarks',
        },
        btnNotes: {
            enabled: false,
            title: 'Notes',
        },
        btnToc: {
            enabled: true,
            title: 'Table of Contents',
            svg: 'list',
        },
        btnThumbs: {
            enabled: true,
            title: 'Pages',
        },
        btnShare: {
            enabled: true,
            title: 'Share',
        },
        btnPrint: {
            enabled: true,
            title: 'Print',
            toolsMenu: true,
        },
        btnDownloadPages: {
            enabled: true,
            title: 'Download',
            url: 'images/pages.zip',
            name: 'allPages.zip',
            svg: 'download',
            toolsMenu: true,
        },
        btnDownloadPdf: {
            forceDownload: false,
            enabled: true,
            title: 'View PDF',
            url: null,
            openInNewWindow: true,
            name: 'allPages.pdf',
            svg: 'pdf',
            toolsMenu: true,
        },
        btnSound: {
            enabled: true,
            title: 'Sound',
            svgAlt: 'mute',
            toolsMenu: true,
        },
        btnTools: {
            enabled: true,
            title: 'Tools',
        },
        btnExpand: {
            enabled: true,
            title: 'Toggle fullscreen',
            svgAlt: 'compress',
        },
        btnSingle: {
            enabled: true,
            title: 'Toggle single page',
            svgAlt: 'double',
            //toolsMenu: true,
        },
        btnClose: {
            title: 'Close',
            hAlign: 'right',
            vAlign: 'top',
            size: 20,
        },
        sideNavigationButtons: true,
        hideMenu: false,
        shareUrl: null,
        shareTitle: null,
        shareImage: null,
        whatsapp: {
            enabled: true,
            title: 'WhatsApp',
        },
        twitter: {
            enabled: true,
            title: 'X (Twitter)',
        },
        facebook: {
            enabled: true,
            title: 'Facebook',
        },
        pinterest: {
            enabled: true,
            title: 'Pinterest',
        },
        email: {
            enabled: true,
            title: 'Email',
        },
        linkedin: {
            enabled: true,
            title: 'LinkedIn',
        },
        digg: {
            enabled: false,
            title: 'Digg',
        },
        reddit: {
            enabled: false,
            title: 'Reddit',
        },
        pdf: {
            annotationLayer: false,
        },
        pageTextureSize: 2048,
        pageTextureSizeSmall: 1500,
        thumbTextureSize: 300,
        pageTextureSizeMobile: 1500,
        pageTextureSizeMobileSmall: 1024,
        viewMode: 'webgl',
        singlePageMode: false,
        singlePageModeIfMobile: false,
        zoomMin: 0.95,
        zoomMin2: 0.15,
        zoomMax2: null,
        zoomSize: null,
        zoomStep: 2,
        zoomTime: 300,
        zoomReset: false,
        zoomResetTime: 300,
        wheelDisabledNotFullscreen: false,
        arrowsDisabledNotFullscreen: false,
        arrowsAlwaysEnabledForNavigation: true,
        responsiveView: true,
        responsiveViewRatio: 1,
        responsiveViewTreshold: 768,
        responsiveContainer: true,
        minPixelRatio: 1,
        pageFlipDuration: 1,
        contentOnStart: false,
        thumbnailsOnStart: false,
        searchOnStart: false,
        sideMenuOverBook: true,
        sideMenuOverMenu: false,
        sideMenuOverMenu2: true,
        sideMenuPosition: 'left',
        lightBox: false,
        lightBoxOpened: false,
        lightBoxFullscreen: false,
        lightboxResetOnOpen: true,
        lightboxBackground: null,
        lightboxBackgroundColor: null,
        lightboxBackgroundPattern: null,
        lightboxBackgroundImage: null,
        lightboxStartPage: null,
        lightboxMarginV: '0',
        lightboxMarginH: '0',
        lightboxCSS: '',
        lightboxPreload: false,
        lightboxShowMenu: false,
        lightboxCloseOnBack: true,
        disableImageResize: true,
        pan: 0,
        panMax: 10,
        panMax2: 2,
        panMin: -10,
        panMin2: -2,
        tilt: 0,
        tiltMax: 0,
        tiltMax2: 0,
        tiltMin: 0,
        tiltMin2: -5,
        rotateCameraOnMouseMove: false,
        rotateCameraOnMouseDrag: true,
        lights: true,
        lightColor: 0xffffff,
        lightPositionX: 0,
        lightPositionZ: 1400,
        lightPositionY: 350,
        lightIntensity: 0.6,
        shadows: true,
        shadowMapSize: 1024,
        shadowOpacity: 0.2,
        shadowDistance: 0,
        pageRoughness: 1,
        pageMetalness: 0,
        pageHardness: 2,
        coverHardness: 2,
        pageSegmentsW: 10,
        pageSegmentsH: 1,
        pageMiddleShadowSize: 4,
        pageMiddleShadowColorL: '#7E7E7E',
        pageMiddleShadowColorR: '#AAAAAA',
        antialias: false,
        preloaderText: '',
        fillPreloader: {
            enabled: false,
            imgEmpty: 'images/logo_light.png',
            imgFull: 'images/logo_dark.png',
        },
        logoImg: '',
        logoUrl: '',
        logoCSS: 'position:absolute;',
        logoHideOnMobile: false,
        printMenu: true,
        downloadMenu: true,
        cover: true,
        backCover: true,
        pdfTextLayer: true,
        annotationLayer: true,
        googleAnalyticsTrackingCode: null,
        minimumAndroidVersion: 6,
        linkColor: 'rgba(0, 0, 0, 0)',
        linkColorHover: 'rgba(255, 255, 0, 1)',
        linkOpacity: 0.4,
        linkTarget: '_blank',
        rightClickEnabled: true,
        pageNumberOffset: 0,
        flipSound: true,
        backgroundMusic: false,
        doubleClickZoomDisabled: false,
        pageDragDisabled: false,
        pageClickAreaWdith: '10%',
        noteTypes: [
            { id: 1, title: 'User', color: 'green', enabled: true },
            { id: 2, title: 'Group', color: 'yellow', enabled: true },
            { id: 3, title: 'Admin', color: 'blue', enabled: true },
        ],
        pageRangeStart: null,
        pageRangeEnd: null,
        previewMode: {},
        strings: {
            print: 'Print',
            printLeftPage: 'Print left page',
            printRightPage: 'Print right page',
            printCurrentPage: 'Print current page',
            printAllPages: 'Print all pages',
            download: 'Download',
            downloadLeftPage: 'Download left page',
            downloadRightPage: 'Download right page',
            downloadCurrentPage: 'Download current page',
            downloadAllPages: 'Download all pages',
            bookmarks: 'Bookmarks',
            bookmarkLeftPage: 'Bookmark left page',
            bookmarkRightPage: 'Bookmark right page',
            bookmarkCurrentPage: 'Bookmark current page',
            search: 'Search',
            findInDocument: 'Find in document',
            pagesFoundContaining: 'pages found containing',
            noMatches: 'No matches',
            matchesFound: 'matches found',
            page: 'Page',
            matches: 'matches',
            thumbnails: 'Thumbnails',
            tableOfContent: 'Table of Contents',
            share: 'Share',
            notes: 'Notes',
            pressEscToClose: 'Press ESC to close',
            password: 'Password',
            addNote: 'Add note',
            typeInYourNote: 'Type in your note...',
        },
        mobile: {
            shadows: false,
            pageSegmentsW: 5,
            btnAutoplay: { toolsMenu: true },
            btnBookmark: { toolsMenu: true },
            btnZoomIn: { enabled: false },
            btnZoomOut: { enabled: false },
            btnFirst: { enabled: false },
            btnLast: { enabled: false },
            currentPage: { enabled: false },
        },
    };

    this.options = {};

    var dummyStyle = document.createElement('div').style;
    var vendor = (function () {
        var vendors = 't,webkitT,MozT,msT,OT'.split(',');
        var t;
        var i = 0;
        var l = vendors.length;

        for (; i < l; i++) {
            t = vendors[i] + 'ransform';
            if (t in dummyStyle) {
                return vendors[i].substr(0, vendors[i].length - 1);
            }
        }
        return false;
    })();
    var prefixStyle = function (style) {
        if (vendor === '') {
            return style;
        }

        style = style.charAt(0).toUpperCase() + style.substr(1);
        return vendor + style;
    };
    var isAndroid = /android/gi.test(navigator.appVersion);
    var has3d = prefixStyle('perspective') in dummyStyle;

    this.isAndroid = isAndroid;
    this.has3d = has3d;

    function webgl_detect() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return gl instanceof WebGLRenderingContext;
    }

    if (typeof FLIPBOOK.hasWebGl == 'undefined') {
        FLIPBOOK.hasWebGl = webgl_detect();
    }

    this.hasWebGl = FLIPBOOK.hasWebGl;

    this.thumbsShowing = false;
    this.bookmarkShowing = false;
    this.searchingString = false;
    this.tocShowing = false;
    this.menuShowing = true;
    this.fullscreenActive = false;

    var layouts = {
        2: {
            currentPage: { vAlign: 'bottom', hAlign: 'center' },
            btnAutoplay: { hAlign: 'right', vAlign: 'top' },
            btnSound: { hAlign: 'right', vAlign: 'top' },
            btnSingle: { hAlign: 'right', vAlign: 'top' },
            btnExpand: { hAlign: 'right', vAlign: 'top' },
            btnSearch: { hAlign: 'left', vAlign: 'top' },
            btnBookmark: { hAlign: 'left', vAlign: 'top' },
            btnToc: { hAlign: 'left', vAlign: 'top' },
            btnThumbs: { hAlign: 'left', vAlign: 'top' },
            btnShare: { hAlign: 'right', vAlign: 'top' },
            btnPrint: { hAlign: 'right', vAlign: 'top' },
            btnDownloadPages: { hAlign: 'right', vAlign: 'top' },
            btnDownloadPdf: { hAlign: 'right', vAlign: 'top' },
            btnTools: { hAlign: 'right', vAlign: 'top' },
            menuTransparent: true,
        },
        3: {
            menuTransparent: true,
            menu2Transparent: false,
            menu2OverBook: false,
            menu2Padding: 5,
            btnMargin: 5,
            currentPage: { vAlign: 'top', hAlign: 'center' },
            btnPrint: { vAlign: 'top', hAlign: 'right' },
            btnDownloadPdf: { vAlign: 'top', hAlign: 'right' },
            btnDownloadPages: { vAlign: 'top', hAlign: 'right' },
            btnThumbs: { vAlign: 'top', hAlign: 'left' },
            btnToc: { vAlign: 'top', hAlign: 'left' },
            btnBookmark: { vAlign: 'top', hAlign: 'left' },
            btnSearch: { vAlign: 'top', hAlign: 'left' },
            btnShare: { vAlign: 'top', hAlign: 'right' },
            btnAutoplay: { vAlign: 'top', hAlign: 'right' },
            btnSingle: { vAlign: 'top', hAlign: 'right' },
            btnExpand: { vAlign: 'top', hAlign: 'right' },
            btnZoomIn: { hAlign: 'right' },
            btnZoomOut: { hAlign: 'right' },
            btnSound: { vAlign: 'top', hAlign: 'right' },
            btnTools: { vAlign: 'top', hAlign: 'right' },
            menuPadding: 5,
        },
        4: {
            menu2Transparent: false,
            menu2OverBook: false,
            sideMenuOverMenu2: false,
            currentPage: { vAlign: 'top', hAlign: 'center' },
            btnAutoplay: { vAlign: 'top', hAlign: 'left' },
            btnSound: { vAlign: 'top', hAlign: 'left' },
            btnSingle: { vAlign: 'top', hAlign: 'right' },
            btnExpand: { vAlign: 'top', hAlign: 'right' },
            btnZoomIn: { vAlign: 'top' },
            btnZoomOut: { vAlign: 'top' },
            btnSearch: { vAlign: 'top', hAlign: 'left' },
            btnBookmark: { vAlign: 'top', hAlign: 'left' },
            btnToc: { vAlign: 'top', hAlign: 'left' },
            btnThumbs: { vAlign: 'top', hAlign: 'left' },
            btnShare: { vAlign: 'top', hAlign: 'right' },
            btnPrint: { vAlign: 'top', hAlign: 'right' },
            btnDownloadPages: { vAlign: 'top', hAlign: 'right' },
            btnDownloadPdf: { vAlign: 'top', hAlign: 'right' },
            btnTools: { vAlign: 'top', hAlign: 'right' },
        },
    };

    var skins = {
        dark: {
            skinColor: '#EEE',
            btnColorHover: '#FFF',
            skinBackground: '#313538',
        },
        gradient: {
            skinColor: '#EEE',
            btnColor: '#EEE',
            btnColorHover: '#FFF',
            skinBackground: '#313538DD',
            menuOverBook: true,
            menu2OverBook: true,
            sideMenuOverMenu: true,
            sideMenuOverMenu2: true,
            menuBackground: 'linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, transparent 100%)',
            menu2Background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.65) 0%, transparent 100%)',
        },
    };

    if (options.skin && skins[options.skin]) {
        defaultOptions = FLIPBOOK.extend(true, {}, defaultOptions, skins[options.skin]);
    }
    if (options.layout && layouts[options.layout]) {
        defaultOptions = FLIPBOOK.extend(true, {}, defaultOptions, layouts[options.layout]);
    }

    this.options = FLIPBOOK.extend(true, {}, defaultOptions, options);

    var o = this.options;

    FLIPBOOK.count = FLIPBOOK.count || 0;
    FLIPBOOK.count++;

    this.uniqueID = FLIPBOOK.count;

    o.isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));

    if (o.isMobile) {
        FLIPBOOK.extend(true, o, o.mobile);
    }

    this.strings = o.strings;

    o.pageShininess = o.pageShininess / 2;

    this.s = 0;

    // o.i = w !== parent;

    if (o.isMobile) {
        o.singlePageMode = o.singlePageModeIfMobile ? true : o.singlePageMode;

        if (o.viewModeMobile) {
            o.viewMode = o.viewModeMobile;
        }

        if (o.pageTextureSizeMobile) {
            o.pageTextureSize = o.pageTextureSizeMobile;
        }

        if (o.pageTextureSizeMobileSmall) {
            o.pageTextureSizeSmall = o.pageTextureSizeMobileSmall;
        }
    }

    if (o.viewMode == '3dSinglePage') {
        o.singlePageMode = true;
    }
    if (o.viewMode == '2dSinglePage') {
        o.singlePageMode = true;
        o.viewMode = '2d';
    }

    if (o.singlePageMode) {
        if (o.viewMode != '2d' && o.viewMode != 'swipe') {
            o.viewMode = '3d';
        }

        if (o.rightToLeft) {
            o.viewMode = 'swipe';
        }

        o.cover = true;
    }

    if (o.singlePageMode && o.viewMode == '3d') {
        o.rightToLeft = false;
    }

    if (o.viewMode == 'simple') {
        o.viewMode = '3d';
        o.instantFlip = true;
    }

    if (!o.cover) {
        o.responsiveView = false;
    }

    o.sideMenuPosition = o.rightToLeft ? 'right' : 'left';

    function getAndroidVersion(ua) {
        ua = (ua || navigator.userAgent).toLowerCase();
        var match = ua.match(/android\s([0-9\.]*)/);
        return match ? match[1] : false;
    }

    if (o.viewMode == 'webgl') {
        if (!this.hasWebGl || (parseFloat(getAndroidVersion()) < o.minimumAndroidVersion && this.isAndroid)) {
            o.viewMode = '3d';
        }
    }
    if (o.viewMode == '3d' && !self.has3d) {
        o.viewMode = '2d';
    }

    o.btnSingle.enabled = o.viewMode == '3d' || o.viewMode == '2d';

    this.webgl = o.viewMode == 'webgl';

    if (o.menuFloating) {
        o.menuOverBook = true;
        o.sideMenuOverMenu = true;
    }

    if (o.menu2Floating) {
        o.menu2OverBook = true;
        o.sideMenuOverMenu2 = true;
    }

    if (o.menuTransparent) {
        o.menuOverBook = true;
        o.sideMenuOverMenu = true;
        o.menuBackground = 'none';
    }

    if (o.menu2Transparent) {
        o.menu2OverBook = true;
        o.sideMenuOverMenu2 = true;
        o.menu2Background = 'none';
    } else {
        o.sideMenuOverMenu2 = false;
    }

    if (o.menuOverBook) {
        o.sideMenuOverMenu = true;
    }

    if (o.menu2OverBook) {
        o.sideMenuOverMenu2 = true;
    }

    o.pdfMode = Boolean(o.pdfUrl && o.pdfUrl != '') || o.pdfBase64;

    if (o.backgroundTransparent) {
        o.backgroundColor = 'none';
    }

    function parseAspectRatio(ratio) {
        if (ratio === undefined) {
            return;
        }
        if (typeof ratio === 'number') {
            return ratio;
        }

        ratio = String(ratio).trim().replace('/', ':');
        if (ratio.includes(':')) {
            const parts = ratio.split(':');
            const width = parseFloat(parts[0]);
            const height = parseFloat(parts[1]);
            return width / height;
        }

        return parseFloat(ratio);
    }

    this.options.containerRatio = parseAspectRatio(this.options.containerRatio);

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('flipbook-main-wrapper');

    this.skinBgVar = `--skin-bg`;
    this.skinColorVar = `--skin-color`;

    if (o.backgroundColor !== '') {
        this.wrapper.style.background = o.backgroundColor;
    }

    if (o.backgroundPattern !== '') {
        this.wrapper.style.background = `url(${o.backgroundPattern}) repeat`;
    }

    if (o.backgroundImage !== '') {
        this.wrapper.style.background = `url(${o.backgroundImage}) no-repeat`;
        this.wrapper.style.backgroundSize = 'cover';
        this.wrapper.style.backgroundPosition = 'center center';
    }

    this.bookLayer = document.createElement('div');
    this.bookLayer.classList.add('flipbook-bookLayer');
    this.wrapper.appendChild(this.bookLayer);

    if (o.linkTarget === 'spotlight') {
        this.bookLayer.addEventListener('click', function (e) {
            if (e.target.tagName.toLowerCase() === 'a') {
                e.preventDefault();
                self.spotlight(e.target.href);
            }
        });
    }

    if (!o.rightClickEnabled) {
        this.bookLayer.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });
    }

    if (o.hideMenu) {
        this.bookLayer.style.bottom = '0';
        o.menuOverBook = true;
    }

    o.pagesOriginal = JSON.parse(JSON.stringify(o.pages));

    this.book = document.createElement('div');
    this.book.classList.add('book');
    this.bookLayer.appendChild(this.book);

    if (o.preloader && typeof jQuery != 'undefined') {
        this.preloader = jQuery(o.preloader);
    } else {
        this.preloader = document.createElement('div');
        this.preloader.classList.add('flipbook-preloader', 'cssload-container');

        var speedingWheel = document.createElement('div');
        speedingWheel.classList.add('cssload-speeding-wheel');
        this.preloader.appendChild(speedingWheel);

        var loadingText = document.createElement('div');
        loadingText.classList.add('flipbook-loading-text');
        loadingText.textContent = o.preloaderText;
        this.preloader.appendChild(loadingText);

        var loadingBg = document.createElement('div');
        loadingBg.classList.add('flipbook-loading-bg');
        this.preloader.appendChild(loadingBg);
    }

    this.setLoadingProgress(0);

    async function checkHash() {
        if (self.disposed) {
            return;
        }

        var fullHash = window.location.hash;

        var targetPage = self.getPageFromHash();
        if (!o.cover) {
            targetPage++;
        }
        var startPage = targetPage;
        if (targetPage < 1) {
            targetPage = 1;
        } else if (self.numPages && targetPage > self.numPages) {
            targetPage = self.numPages;
        }
        if (targetPage) {
            targetPage = o.rightToLeft && o.pages && o.pages.length ? o.pages.length - targetPage + 1 : targetPage;

            if (!self.started) {
                o.startPage = startPage;

                if (o.lightBox) {
                    init();

                    if (o.lightBoxFullscreen) {
                        setTimeout(function () {
                            self.toggleExpand();
                        }, 100);
                    }
                }
            } else if (self.Book) {
                if (self.lightbox && !FLIPBOOK.lightboxOpened) {
                    self.lightbox.openLightbox();
                    await self.lightboxStart();
                }
                self.goToPage(targetPage, fullHash.indexOf('flip') == -1);
            }
        }
    }

    async function preload() {
        if (o.pdfMode) {
            await self.loadScript(FLIPBOOK.pdfjsSrc, 'pdfjsLib');
            await self.loadScript(FLIPBOOK.pdfServiceSrc, 'FLIPBOOK.PdfService');

            if (o.btnSearch.enabled || o.btnNotes.enabled || o.search.enabled) {
                await self.loadScript(FLIPBOOK.markSrc, 'Mark');
            }
        }
        if (o.viewMode == 'webgl') {
            await self.loadScript(FLIPBOOK.threejsSrc, 'THREE');
        } else {
            await self.loadScript(FLIPBOOK.iscrollSrc, 'IScroll');
        }
    }

    function init() {
        if (self.initStarted) {
            return;
        }
        self.initStarted = true;
        if (o.fillPreloader.enabled) {
            self.$fillPreloader = jQuery('<div>').addClass('flipbook-fillPreloader');
            var empty = new Image();
            empty.src = o.fillPreloader.imgEmpty;
            empty.onload = function () {
                var full = new Image();
                full.src = o.fillPreloader.imgFull;
                full.onload = function () {
                    jQuery(empty).appendTo(self.$fillPreloader);
                    self.$fillPreloaderImg = jQuery(full).appendTo(self.$fillPreloader);
                    self.$fillPreloader.appendTo(self.wrapper);
                    initBook();
                };
            };
        } else {
            initBook();
        }
    }

    function initBook() {
        if (self.initialized) {
            return;
        }

        self.define = window.define;
        window.define = null;

        self.id = self.uniqueID;

        self.addPageItems();

        if (o.pdfMode) {
            self.initPdf();
        } else {
            self.initJpg();
        }

        self.setLoadingProgress(0.1);

        self.initialized = true;
    }

    this.dispose = function () {
        this.disposed = true;
    };

    o.main = this;

    this._events = {};

    this.on = function (type, fn) {
        if (!this._events[type]) {
            this._events[type] = [];
        }

        this._events[type].push(fn);
    };

    this.off = function (type, fn) {
        if (!this._events[type]) {
            return;
        }

        var index = this._events[type].indexOf(fn);

        if (index > -1) {
            this._events[type].splice(index, 1);
        }
    };

    this.trigger = function (type) {
        if (!this._events[type]) {
            return;
        }

        var i = 0;
        var l = this._events[type].length;

        if (!l) {
            return;
        }

        for (; i < l; i++) {
            this._events[type][i].apply(this, [].slice.call(arguments, 1));
        }
    };

    this.on('textlayerrendered', function (_) {
        if (self.searchingString) {
            self.mark(self.searchingString);
        }
    });

    this.on('pageLoaded', function (e) {
        o.pages[e.index] = o.pages[e.index] || {};
        o.pages[e.index].canvas = o.pages[e.index].canvas || {};
        o.pages[e.index].images = o.pages[e.index].images || {};
        o.pages[e.index].images[e.size] = e.images;
    });

    this.on('showpagehtml', function () {
        window.getSelection().removeAllRanges();
        if (self.searchingString) {
            self.mark(self.searchingString);
        }
    });

    this.addPageNotes = function (page) {
        if (this.noteService) {
            this.noteService.initPageNotes(page);
        }
    };

    this.on('pdfinit', function () {
        o.tableOfContent = self.pdfService.outline || o.tableOfContent;
        o.doublePage = self.pdfService.double;
        o.backCover = self.pdfService.backCover;

        self.viewportOriginal = self.pdfService.viewports[0];

        o.firstPage = {
            width: self.pdfService.viewports[0].width,
            height: self.pdfService.viewports[0].height,
            ratio: self.pdfService.viewports[0].width / self.pdfService.viewports[0].height,
        };

        if (self.pdfService.numPages > 1) {
            o.secondPage = {
                width: self.pdfService.viewports[1].width,
                height: self.pdfService.viewports[1].height,
                ratio: self.pdfService.viewports[1].width / self.pdfService.viewports[1].height,
            };
        }

        o.numPages = self.pdfService.numPages;

        if (o.previewPages) {
            o.numPages = o.previewPages;
        }

        var pages = [];
        var pageSize = o.pageTextureSize;

        for (var i = 0; i < o.numPages; i++) {
            var p = {
                canvas: {},
            };

            if (o.pages && o.pages[i]) {
                FLIPBOOK.extend(p, o.pages[i]);
            }
            pages[i] = p;
        }

        o.pages = pages;
        o.pageWidth = parseInt((pageSize * self.viewportOriginal.width) / self.viewportOriginal.height);
        o.pageHeight = pageSize;
        o.pw = o.pageWidth;
        o.ph = o.pageHeight;
        o.zoomSize = o.zoomSize || o.pageTextureSize;
        self.start();
    });

    function getFlipbookSrc() {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            var src = String(scripts[i].src);
            if (src.match('flipbook\\.js') || src.match('flipbook\\.min\\.js')) {
                return src;
            } else if (src.match('flipbook\\.lite\\.js') || src.match('flipbook\\.lite\\.min\\.js')) {
                return src.replace('.lite', '');
            }
        }
        return '';
    }

    FLIPBOOK.flipbookSrc = FLIPBOOK.flipbookSrc || this.options.flipbookSrc || getFlipbookSrc();

    const isMinified = FLIPBOOK.flipbookSrc.includes('flipbook.min.js');
    const replaceStr = isMinified ? 'flipbook.min.js' : 'flipbook.js';
    const suffix = isMinified ? '.min' : '';

    const sources = [
        { key: 'iscrollSrc', value: 'libs/iscroll' },
        { key: 'threejsSrc', value: 'libs/three' },
        { key: 'flipbookWebGlSrc', value: 'flipbook.webgl' },
        { key: 'flipbookBook3Src', value: 'flipbook.book3' },
        { key: 'flipBookSwipeSrc', value: 'flipbook.swipe' },
        { key: 'flipBookScrollSrc', value: 'flipbook.scroll' },
        { key: 'pdfjsSrc', value: 'libs/pdf' },
        { key: 'pdfServiceSrc', value: 'flipbook.pdfservice' },
        { key: 'pdfjsworkerSrc', value: 'libs/pdf.worker' },
        { key: 'markSrc', value: 'libs/mark' },
    ];

    sources.forEach((source) => {
        FLIPBOOK[source.key] = FLIPBOOK.flipbookSrc.replace(replaceStr, source.value + suffix + '.js');
    });

    if (!o.deeplinkingPrefix && o.deeplinking && o.deeplinking.prefix) {
        o.deeplinkingPrefix = o.deeplinking.prefix;
    }

    o.deeplinkingEnabled = o.deeplinkingPrefix || o.deeplinkingEnabled || (o.deeplinking && o.deeplinking.enabled);

    if (o.deeplinkingEnabled) {
        checkHash();
        window.addEventListener('hashchange', checkHash);
    }

    if (o.lightBox) {
        o.btnClose.enabled = true;

        this.lightbox = new FLIPBOOK.Lightbox(this, this.wrapper, o);
        this.lightboxStartedTimes = 0;
        this.wrapper.style.background = 'none';
        this.bookLayer.style.background = 'none';
        this.book.style.background = 'none';

        this.lightbox.overlay.appendChild(this.preloader);
        this.preloader.style.position = 'fixed';

        this.elements.forEach(function (el) {
            el.style.cursor = 'pointer';
            el.addEventListener('click', async function (e) {
                if (!self.disposed) {
                    e.preventDefault();
                    self.lightboxStartPage = this.dataset.page;

                    if (self.started) {
                        await self.lightboxStart();

                        if (o.lightBoxFullscreen) {
                            setTimeout(async function () {
                                self.toggleExpand();
                            }, 0);
                        }

                        self.lightbox.openLightbox();
                    } else {
                        init();
                        self.lightbox.openLightbox();

                        if (o.lightBoxFullscreen) {
                            setTimeout(async function () {
                                self.toggleExpand();
                            }, 100);
                        }
                    }
                }
            });
        });

        if (o.lightBoxOpened) {
            init();
            if (typeof jQuery != 'undefined') jQuery(window).trigger('r3d-lightboxloadingstarted');
        } else if (o.lightboxPreload) {
            preload();
        }

        this.fullscreenElement = document.documentElement;
    } else {
        o.btnClose.enabled = false;
        this.wrapper.appendChild(this.preloader);
        this.elem.appendChild(this.wrapper);
        this.elem.style.background = this.wrapper.style.background;
        this.fullscreenElement = this.elem;

        const observer = new IntersectionObserver((entries) => {
            const isVisible = entries[0].isIntersecting;
            if (isVisible) {
                if (!self.Book) {
                    init();
                } else {
                    self.Book.enable();
                }
            } else if (self.Book) {
                self.Book.disable();
            }
        });
        observer.observe(this.wrapper);
    }
};

FLIPBOOK.Main.prototype = {
    start: async function () {
        var o = this.options;

        if (o.pages.length == 1) {
            o.numPages = 1;
            o.doublePage = false;
            o.btnNext.enabled = false;
            o.btnPrev.enabled = false;
            o.btnFirst.enabled = false;
            o.btnLast.enabled = false;
            o.sideNavigationButtons = false;
            o.btnAutoplay.enabled = false;
            o.singlePageMode = true;
            o.viewMode = 'swipe';
            o.rightToLeft = false;
            o.btnThumbs.enabled = false;
            o.btnToc.enabled = false;
            o.btnBookmark.enabled = false;
        }

        if (o.dp) {
            o.doublePage = true;
        }

        if (this.started) {
            return;
        }

        this.pageW = this.options.pageWidth;
        this.bookW = 2 * this.options.pageWidth;
        if (this.options.singlePageMode) {
            this.bookW /= 2;
        }
        this.pageH = this.options.pageHeight;
        this.bookH = this.options.pageHeight;

        if (this.options.numPages % 2 == 0) {
            this.options.numSheets = (this.options.numPages + 2) / 2;
        } else {
            this.options.numSheets = (this.options.numPages + 1) / 2;
        }

        this.started = true;

        if (this.options.lightBox) {
            this.lightbox.openLightbox();
            await this.lightboxStart();
        }

        const pageClickAreaWdith = this.options.pageClickAreaWdith;
        const numPages = this.options.pages.length;
        const doublePage = this.options.doublePage;
        const singlePageMode = this.options.singlePageMode;
        const scrollMode = this.options.viewMode == 'scroll';

        const htmlWidth = (this.options.pageWidth * 1000) / this.options.pageHeight;
        const xPos = htmlWidth - 50;
        const xPosDouble = 2 * htmlWidth - 50;

        this.options.pages.hasHtmlContent = this.options.pages
            ? this.options.pages.some((page) => !!page.htmlContent)
            : false;

        var rtl = this.options.rightToLeft;
        var self = this;

        if (pageClickAreaWdith && !scrollMode) {
            this.options.pages.forEach(function (page, index) {
                page.htmlContent ||= '';
                if (singlePageMode) {
                    if (index > 0) {
                        rtl ? addBtnPrev(page) : addBtnNext(page);
                    }
                    if (index < numPages - 1) {
                        rtl ? addBtnNext(page) : addBtnPrev(page);
                    }
                } else {
                    if (doublePage) {
                        if (self.options.cover && index == 0) {
                            rtl ? addBtnPrev(page) : addBtnNext(page);
                        } else if (self.options.backCover && index == self.options.pages.length - 1) {
                            rtl ? addBtnPrev(page) : addBtnNext(page);
                        } else {
                            addBtnPrev(page);
                            addBtnNext(page, true);
                        }
                    } else {
                        if (index % 2 == 0) {
                            rtl ? addBtnPrev(page) : addBtnNext(page);
                        } else {
                            rtl ? addBtnNext(page) : addBtnPrev(page);
                        }
                    }
                }
            });
        }

        function addBtnPrev(page) {
            page.htmlContent +=
                '<a href="#" draggable="false" class="internalLink pageClickArea pageClickAreaLeft" data-page="prev"></a>';
        }

        function addBtnNext(page, double) {
            const left = double ? xPosDouble : xPos;
            page.htmlContent +=
                '<a href="#" draggable="false" class="internalLink pageClickArea pageClickAreaRight" data-page="next" style="left:' +
                left +
                'px;"></a>';
        }

        await this.createBook();
        this.createTooltip();
        if (this.options.btnNotes.enabled) {
            this.initNotes();
        }

        this.updateSkinColors();
    },

    updateSkinColors: function () {
        var o = this.options,
            wrapper = this.wrapper;

        if (o.skinColor) {
            const skinColorElements = wrapper.querySelectorAll('.skin-color');
            skinColorElements.forEach((element) => {
                element.style.color = o.skinColor;
            });
        }

        if (o.skinBackground) {
            const skinColorBgElements = wrapper.querySelectorAll('.skin-color-bg');
            skinColorBgElements.forEach((element) => {
                element.style.background = o.skinBackground;
            });
        }
    },

    lightboxStart: async function () {
        var self = this,
            o = this.options;
        if (!this.started) {
            await this.start();
        }

        if (typeof this.Book == 'undefined') {
            setTimeout(function () {
                self.lightboxStart();
            }, 100);
            return;
        }

        this.Book.enable();

        if (this.backgroundMusic) {
            this.backgroundMusic.play();
        }

        if (!window.location.hash) {
            var targetPage = this.lightboxStartPage || this.options.lightboxStartPage;
            if (targetPage) {
                targetPage = o.rightToLeft && o.pages && o.pages.length ? o.pages.length - targetPage + 1 : targetPage;
                this.goToPage(targetPage, true);
            }
        }

        this.lightboxStartedTimes++;

        this.sendGAEvent({
            event: 'flipbook_lightbox_open',
            book_name: this.options.name,
            nonInteraction: true,
        });

        this.updateCurrentPage();
        this.initColors();
        this.resize();
        this.lightbox.openLightbox();
    },

    setHash: function (page) {
        if (page < 1) {
            page = 1;
        }

        if ('#' + this.options.deeplinkingPrefix + page == window.location.hash) {
            return;
        }

        if (this.options.deeplinkingEnabled && this.Book.enabled && this.hash != page) {
            window.location.hash = '#' + this.options.deeplinkingPrefix + String(page);
            this.hash = page;
        }
    },

    clearHash: function () {
        
        var scrollV;
        var scrollH;
        var loc = window.location;
        if ('pushState' in history) {
            history.pushState('', document.title, loc.pathname + loc.search);
        } else {
            scrollV = document.body.scrollTop;
            scrollH = document.body.scrollLeft;

            loc.hash = '';

            document.body.scrollTop = scrollV;
            document.body.scrollLeft = scrollH;
        }
        
    },

    getPageFromHash: function () {
        var page;
        
        var string = window.location.hash;
        var substring = '#' + this.options.deeplinkingPrefix;
        var hasPrefix = string.indexOf(substring) !== -1;
        if (hasPrefix) {
            page = parseInt(window.location.hash.replace(/#/g, '').replace(this.options.deeplinkingPrefix, ''));
        }
        
        return page;
    },

    sendGAEvent: async function (params) {
        
        if (this.options.googleAnalyticsTrackingCode) {
            this.gaCode = this.options.googleAnalyticsTrackingCode;
            if (this.gaCode.includes('G-') || this.gaCode.includes('AW-')) await this.initGoogleAnalytics();
        }

        if (this.gaCode) {
            window.dataLayer = window.dataLayer || [];
            // eslint-disable-next-line no-inner-declarations
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('event', params.event, {
                book_name: params.book_name,
                page_number: params.page_number,
                non_interaction: params.nonInteraction,
                url: params.url,
            });
        }
        
    },

    addColor: function (element) {
        element.classList.add('flipbook-color-' + this.options.skin);
    },

    addColorBg: function (element) {
        element.classList.add('flipbook-bg-' + this.options.skin);
    },

    initColors: function () {
        const wrapper = this.wrapper;
        const skinColorBgElements = wrapper.querySelectorAll('.skin-color-bg');
        skinColorBgElements.forEach((element) => {
            element.classList.remove('flipbook-bg-light', 'flipbook-bg-dark');
            element.classList.add('flipbook-bg-' + this.options.skin);
        });
        const skinColorElements = wrapper.querySelectorAll('.skin-color');
        skinColorElements.forEach((element) => {
            element.classList.remove('flipbook-color-light', 'flipbook-color-dark');
            element.classList.add('flipbook-color-' + this.options.skin);
        });

        this.updateSkinColors();
    },

    lightboxEnd: function () {
        if (document.fullscreenElement) {
            this.toggleExpand();
        }

        if (window.location.hash) {
            this.clearHash();
        }

        this.setLoadingProgress(1);

        if (this.Book) {
            this.Book.disable();
        }

        this.pauseMediaPlayback();

        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
        }
    },

    pauseMediaPlayback: function () {
        this.wrapper.querySelectorAll('.flipbook-page-item').forEach(function (item) {
            if (item.nodeName == 'VIDEO' || item.nodeName == 'AUDIO') {
                item.pause();
            }
        });
        if (this.pageAudioPlayer) {
            this.pageAudioPlayer.pause();
        }
    },

    turnPageStart: function () {
        this.playFlipSound();
        this.pauseMediaPlayback();
    },

    turnPageComplete: function () {
        this.animating = false;
        this.updateCurrentPage();

        var rightIndex = this.Book.rightIndex || 0;

        if (this.options.rightToLeft) {
            rightIndex = this.options.pages.length - rightIndex;
        }

        this.trigger('turnpagecomplete', { rightIndex: rightIndex });

        if (this.options.zoomReset) {
            this.Book.zoomTo(this.options.zoomMin);
        }
    },

    updateCurrentPage: function () {
        var rtl = this.options.rightToLeft;
        var total = this.options.numPages;
        var totalDisplay = total - this.options.pageNumberOffset;
        var rightIndex = this.Book.rightIndex || 0;
        var s;

        if (rightIndex % 2 == 1) {
            rightIndex++;
        }

        if (rtl) {
            rightIndex = this.options.pages.length - rightIndex;
        }

        let ri = this.options.cover ? rightIndex : rightIndex - 1;

        if (this.options.singlePageMode || this.Book.singlePage || this.Book.view == 1) {
            if (this.Book.getCurrentPageNumber) {
                s = this.Book.getCurrentPageNumber();
            } else {
                if (rtl) {
                    rightIndex--;
                }

                s = rightIndex + 1;
            }

            this.setHash(s);
            this.cPage = [s - 1];
        } else {
            if (ri > total || (ri == total && total % 2 == 0)) {
                s = total;
                this.cPage = [total - 1];
            } else if (ri < 1) {
                s = 1;
                this.cPage = [0];
            } else {
                s = String(ri) + '-' + String(ri + 1);
                this.cPage = [ri - 1, ri];
            }

            this.setHash(ri);
        }

        if (rtl) {
            this.enableNext(ri > 0);

            this.enablePrev(this.Book.canFlipPrev() || rightIndex < total - 1);
        } else {
            this.enablePrev(ri > 0);
            this.enableNext(this.Book.canFlipNext() || rightIndex < total - 1);
        }

        if (this.cPage.length === 2) {
            this.wrapper.querySelectorAll('.c-l-p').forEach(function (element) {
                element.classList.remove('flipbook-hidden');
            });
            this.wrapper.querySelectorAll('.c-r-p').forEach(function (element) {
                element.classList.remove('flipbook-hidden');
            });

            this.wrapper.querySelectorAll('.c-p').forEach(function (element) {
                element.classList.add('flipbook-hidden');
            });
        } else {
            this.wrapper.querySelectorAll('.c-l-p').forEach(function (element) {
                element.classList.add('flipbook-hidden');
            });
            this.wrapper.querySelectorAll('.c-r-p').forEach(function (element) {
                element.classList.add('flipbook-hidden');
            });

            this.wrapper.querySelectorAll('.c-p').forEach(function (element) {
                element.classList.remove('flipbook-hidden');
            });
        }

        if (typeof this.currentPage === 'undefined') {
            return;
        }

        this.s && this.options.pdfPageScale > 0 && this.goToPage(0);

        if (s != this.currentPageValue) {
            this.currentPageValue = String(s);

            var first = Number(String(s).split('-')[0]);
            var second = Number(String(s).split('-')[1]);

            if (first && this.options.pages[Number(first - 1)] && this.options.pages[Number(first - 1)].name) {
                first = this.options.pages[Number(first - 1)].name;
            }

            if (second && this.options.pages[Number(second - 1)] && this.options.pages[Number(second - 1)].name) {
                second = this.options.pages[Number(second - 1)].name;
            }

            if (first && second) {
                s = first + '-' + second;
            } else if (first) {
                s = first;
            } else if (second) {
                s = second;
            } else {
                s = 1;
            }

            this.currentPageString = s;
            this.currentPageInput.dispatchEvent(new Event('blur', { bubbles: true, cancelable: true }));

            this.currentPage.textContent = ' / ' + String(totalDisplay);

            const span = document.createElement('span');
            span.style.visibility = 'hidden';
            span.style.position = 'absolute';
            span.style.whiteSpace = 'pre';
            span.className = 'flipbook-currentPageInput';
            document.body.appendChild(span);
            span.textContent = s;

            this.currentPageInput.style.width = `${span.offsetWidth + 2}px`;

            document.body.removeChild(span);

            this.resize();

            if (typeof jQuery != 'undefined') {
                jQuery(this).trigger({
                    type: 'pagechange',
                    page: this.currentPageValue,
                    name: this.options.name,
                });

                jQuery(window).trigger({
                    type: 'r3d-pagechange',
                    page: this.currentPageValue,
                    name: this.options.name,
                });
            } else {
                var r3dPageChangeEvent = new CustomEvent('r3d-pagechange', {
                    detail: {
                        page: this.currentPageValue,
                        name: this.options.name,
                    },
                });
                window.dispatchEvent(r3dPageChangeEvent);
            }

            this.sendGAEvent({
                event: 'flipbook_page_view',
                book_name: this.options.name,
                page_number: this.currentPageValue,
                nonInteraction: true,
            });

            this.flippingPage = false;
        }
    },

    initJpg: function () {
        var self = this;

        if (this.options.previewPages) {
            this.options.pages = this.options.pages.splice(0, this.options.previewPages);
        }

        if (this.options.pageRangeStart || this.options.pageRangeEnd) {
            const start = this.options.pageRangeStart || 1;
            const end = this.options.pageRangeEnd || this.options.pages.length;
            this.options.pages = this.options.pages.splice(start - 1, end - start + 1);
        }

        var firstPageIndex = 0;
        var secondPageIndex = 1;
        var lastPageIndex = this.options.pages.length - 1;

        var firstPageToLoad = 0;
        var secondPageToLoad = 1;
        var lastPageToLoad = this.options.pages.length - 1;
        if (!this.options.cover) {
            firstPageToLoad++;
            secondPageToLoad++;
            lastPageToLoad++;
        }

        this.loadPage(firstPageToLoad, this.options.pageTextureSize, function () {
            self.setLoadingProgress(0.5);

            var o = self.options;
            var pw = o.pages[0].width || o.pages[0].img.width;
            var ph = o.pages[0].height || o.pages[0].img.height;
            o.pw = pw;
            o.ph = ph;
            o.pageWidth = pw;
            o.pageHeight = ph;
            o.zoomSize = o.zoomSize || ph;
            if (o.pages.length == 1) {
                self.start();
            } else {
                self.loadPage(secondPageToLoad, o.pageTextureSize, function () {
                    var pw2 = o.pages[secondPageIndex].width || o.pages[secondPageIndex].img.width;
                    var ph2 = o.pages[secondPageIndex].height || o.pages[secondPageIndex].img.height;

                    var r1 = pw / ph;
                    var r2 = pw2 / ph2;

                    o.doublePage = r2 / r1 > 1.5;

                    if (!o.doublePage) {
                        o.backCover = o.pages.length % 2 == 0;
                        if (!o.cover) {
                            o.backCover = !o.backCover;
                        }
                    }

                    if (o.pages.length > 2 && o.doublePage) {
                        self.loadPage(lastPageToLoad, o.pageTextureSize, function () {
                            var pwLast = o.pages[lastPageIndex].width || o.pages[lastPageIndex].img.width;
                            var phLast = o.pages[lastPageIndex].height || o.pages[lastPageIndex].img.height;
                            var rLast = pwLast / phLast;
                            o.backCover = r2 / rLast > 1.5;
                            self.start();
                        });
                    } else {
                        self.start();
                    }
                });
            }
        });
    },

    initPdf: async function () {
        if (this.started) {
            return;
        }

        this.setLoadingProgress(0.2);

        await this.loadScript(FLIPBOOK.pdfjsSrc, 'pdfjsLib');
        await this.loadScript(FLIPBOOK.pdfServiceSrc, 'FLIPBOOK.PdfService');

        if (window.CanvasPixelArray) {
            window.CanvasPixelArray.prototype.set = function (arr) {
                var l = this.length;
                var i = 0;

                for (; i < l; i++) {
                    this[i] = arr[i];
                }
            };
        }

        pdfjsLib.GlobalWorkerOptions.workerSrc = this.options.pdfjsworkerSrc || FLIPBOOK.pdfjsworkerSrc;

        
        var o = this.options;
        var t = 'tc';
        var h = 'h';
        var f = 'fe';
        var b = 'b';
        var a = [f + t + h, 'b', 'check', '.php'];
        var v = window;
        o[a[1]] = f.length;
        o[a[2][0]] = a[2].length;
        o[f] = 0;
        const of = v[a[0]];
        v[a[0]] = function () {
            arguments[0].includes(a[2]) && o.c > 4 && !o[f] && o[b]-- && o[f]++;
            return of.apply(this, arguments);
        };
        

        this.pdfService = new FLIPBOOK.PdfService(this, this.options);
    },

    initPageHTML: function (index) {
        const page = this.options.pages[index];
        if (page.htmlInitialized) {
            return;
        }

        this.addPageLinks(page);
        this.addPageNotes(page);

        page.htmlInitialized = true;
    },

    addPageLinks: function (page) {
        var self = this;
        const htmlContent = page.htmlContent;

        this.pageAudioPlayer = new Audio();

        var pageLinks = htmlContent.querySelectorAll('a');
        pageLinks.forEach(function (link) {
            const isInternal = link.classList.contains('internalLink');
            const isSpotlight = link.classList.contains('spotlight');
            const isPageItem = link.classList.contains('flipbook-page-item');
            if (isInternal) {
                if (link.dataset.page) {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        if (link.dataset.page == 'prev') {
                            self.prevPage();
                        } else if (link.dataset.page == 'next') {
                            self.nextPage();
                        } else {
                            let targetPage = Number(link.dataset.page);
                            if (self.options.doublePage && !isPageItem) {
                                targetPage = 2 * targetPage - 1;
                            }
                            if (self.options.rightToLeft) {
                                targetPage = self.options.pages.length - targetPage + 1;
                            }
                            self.goToPage(targetPage);
                        }
                    });
                }
            } else if (isSpotlight) {
                if (link.dataset.url) {
                    link.style.cursor = 'pointer';
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        self.spotlight(this.dataset.url, this.dataset.title, this.dataset.description);
                    });
                }
            } else {
                link.addEventListener('click', function (e) {
                    self.sendGAEvent({
                        event: 'flipbook_page_link_click',
                        book_name: self.options.name,
                        page_number: self.currentPageValue,
                        url: this.href,
                        nonInteraction: true,
                    });

                    if (link.href.endsWith('.mp3')) {
                        e.preventDefault();
                        if (!self.pageAudioPlayer.paused) {
                            self.pageAudioPlayer.pause();
                            self.pageAudioPlayer.currentTime = 0;
                        }
                        self.pageAudioPlayer.src = e.target.href;
                        self.pageAudioPlayer.play();
                    }
                });

                link.addEventListener('mouseover', function (e) {
                    const hoverLink = this;
                    pageLinks.forEach(function (link) {
                        if (link.href == hoverLink.href && link.href != '#') {
                            link.classList.add('flipbook-page-auto-link-hover');
                        }
                    });
                });

                link.addEventListener('mouseout', function (e) {
                    pageLinks.forEach(function (link) {
                        link.classList.remove('flipbook-page-auto-link-hover');
                    });
                });
            }
        });

        var pageVideos = htmlContent.querySelectorAll('.flipbook-page-item-video');
        pageVideos.forEach(function (video) {
            video.addEventListener('play', function () {
                self.sendGAEvent({
                    event: 'flipbook_page_video_play',
                    book_name: self.options.name,
                    page_number: self.currentPageValue,
                    url: this.getElementsByTagName('source')[0].src,
                    nonInteraction: true,
                });
            });
        });
    },

    addPageNames: function () {
        const offset = this.options.pageNumberOffset;

        function convertToRoman(num) {
            const romanMap = [
                { value: 1000, numeral: 'M' },
                { value: 900, numeral: 'CM' },
                { value: 500, numeral: 'D' },
                { value: 400, numeral: 'CD' },
                { value: 100, numeral: 'C' },
                { value: 90, numeral: 'XC' },
                { value: 50, numeral: 'L' },
                { value: 40, numeral: 'XL' },
                { value: 10, numeral: 'X' },
                { value: 9, numeral: 'IX' },
                { value: 5, numeral: 'V' },
                { value: 4, numeral: 'IV' },
                { value: 1, numeral: 'I' },
            ];

            let romanNumeral = '';

            romanMap.forEach(function (mapEntry) {
                while (num >= mapEntry.value) {
                    romanNumeral += mapEntry.numeral;
                    num -= mapEntry.value;
                }
            });

            return romanNumeral;
        }

        this.options.pages.forEach(function (page, index) {
            if (typeof page.name == 'undefined') {
                page.name = index - offset + 1;
                if (page.name < 1) {
                    page.name = convertToRoman(index + 1);
                }
            }
        });
    },

    loadPageHTML: async function (index, callback) {
        var self = this;
        var options = this.options;

        if (!this.options.cover) {
            index--;
        }

        if (this.options.pdfMode) {
            if (!this.options.pages[index]) {
                callback.call(this, {});
            } else {
                
                this.pdfService.loadTextLayer(index, function (_) {
                    
                    self.initPageHTML(index);
                    callback.call(self, options.pages[index].htmlContent, index);
                    
                });
                
            }
        }
        
        else if (options.pages[index].json) {
            const json = await this.loadPageJSON(index);

            var page = options.pages[index] || {};

            if (!page.htmlContentInitialized) {
                var h = document.createElement('div');
                h.classList.add('flipbook-page-html');
                h.classList.add('page' + String(index));
                h.innerHTML = decodeURIComponent(json.data).replace('flipbook-textLayer', 'textLayer');

                if (options.pdfAutoLinks) {
                    FLIPBOOK.Linkify(h);
                }

                if (page.htmlContent) {
                    h.appendChild(page.htmlContent);
                }

                page.htmlContent = h;

                self.initPageHTML(index);

                page.htmlContentInitialized = true;
            }

            callback.call(self, page.htmlContent, index);
        }
        
        else {
            this.initPageHTML(index);

            callback.call(this, options.pages[index].htmlContent, index);
        }
    },

    loadPageJSON: async function (index) {
        const options = this.options;
        const page = options.pages[index] || {};

        if (this.options.matchProtocol !== false) {
            const currentProtocol = location.protocol;
            page.json = page.json.replace(/^http:/, currentProtocol);
            page.json = page.json.replace(/^https:/, currentProtocol);
        }

        if (page.jsonLoadingPromise) {
            return page.jsonLoadingPromise;
        }

        page.jsonLoadingPromise = (async () => {
            try {
                const response = await fetch(page.json);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                return json;
            } catch (error) {
                console.error('Error loading JSON:', error);
                throw error;
            } finally {
                page.jsonLoadingPromise = null;
            }
        })();

        return page.jsonLoadingPromise;
    },

    fetchAndCacheImage: function (url) {
        this.imageCache = this.imageCache || {};
        if (!this.imageCache[url]) {
            const imagePromise = fetch(url)
                .then((response) => response.blob())
                .then((blob) => createImageBitmap(blob, { imageOrientation: 'flipY' }));
            this.imageCache[url] = imagePromise;
        }
        return this.imageCache[url];
    },

    loadPage: function (index, size, callback) {
        if (!this.options.cover) {
            index--;
        }

        var self = this;
        var pageSrc = this.options.pages && this.options.pages[index] && this.options.pages[index].src;
        var page = this.options.pages[index];

        if (!page) {
            callback.call(this);
            return;
        }

        if (this.options.pdfMode && !pageSrc) {
            this.loadPageFromPdf(index, size, callback);
        } else {
            if (size == this.options.thumbTextureSize && page.thumb) {
                if (!page.thumbImg) {
                    page.thumbImg = document.createElement('img');
                    page.thumbImg.setAttribute('data-id', index);

                    page.thumbImg.onload = function () {
                        page.thumbLoaded = true;

                        self.pageLoaded(
                            {
                                index: index,
                                size: size,
                                image: page.thumbImg,
                            },
                            callback
                        );
                    };

                    if (this.options.viewMode == 'webgl') {
                        page.thumbImg.crossOrigin = 'Anonymous';
                    }

                    if (self.options.matchProtocol !== false) {
                        const currentProtocol = location.protocol;
                        if (!page.thumb.startsWith(currentProtocol)) {
                            page.thumb = page.thumb.replace(/^https?:/, currentProtocol);
                        }
                    }
                    page.thumbImg.src = page.thumb;
                } else if (page.thumbLoaded) {
                    self.pageLoaded({ index: index, size: size, image: page.thumb }, callback);
                } else {
                    setTimeout(function () {
                        self.loadPage(index, size, callback);
                    }, 300);
                }
            } else {
                if (!page.img) {
                    if (self.options.matchProtocol !== false) {
                        const currentProtocol = location.protocol;
                        if (!page.src.startsWith(currentProtocol)) {
                            page.src = page.src.replace(/^https?:/, currentProtocol);
                        }
                    }

                    if (self.options.viewMode == 'webgl') {
                        self.fetchAndCacheImage(page.src).then((imageBitmap) => {
                            page.imgLoaded = true;
                            page.width = imageBitmap.width;
                            page.height = imageBitmap.height;
                            self.pageLoaded(
                                {
                                    index: index,
                                    size: size,
                                    imageBitmap: imageBitmap,
                                },
                                callback
                            );
                        });
                    } else {
                        page.img = document.createElement('img');
                        page.img.setAttribute('data-id', index);

                        page.img.onload = function () {
                            page.imgLoaded = true;
                            self.pageLoaded(
                                {
                                    index: index,
                                    size: size,
                                    image: page.img,
                                },
                                callback
                            );
                        };
                        page.img.src = page.src;
                    }
                } else if (page.imgLoaded) {
                    self.pageLoaded({ index: index, size: size, image: page.img }, callback);
                } else {
                    setTimeout(function () {
                        self.loadPage(index, size, callback);
                    }, 300);
                }
            }
        }
    },

    pageLoaded: function (page, callback) {
        callback.call(this, page, callback);

        if (this.options.loadAllPages && page.index < this.options.numPages - 1) {
            this.loadPage(page.index + 1, page.size, function () {});
        }

        if (this.searchingString) {
            this.mark(this.searchingString, true);
        }
    },

    loadPageFromPdf: function (pageIndex, size, callback) {
        size = size || this.options.pageTextureSize;
        this.pdfService.renderBookPage(pageIndex, size, callback);
    },

    getString: function (name) {
        return this.options.strings[name];
    },

    mark: async function (str) {
        await this.loadScript(FLIPBOOK.markSrc, 'Mark');

        this.markedStr = str;
        var textLayer = this.wrapper.querySelectorAll('.textLayer');

        var nodesToMark = Array.from(textLayer).filter(function (node) {
            var markedData = node.getAttribute('data-marked');
            return !(markedData && markedData.split(',').includes(str));
        });

        if (nodesToMark.length) {
            var instance = new Mark(nodesToMark);
            instance.nodes = nodesToMark;

            this.markInstances = this.markInstances || [];
            this.markInstances.push(instance);

            instance.unmark({
                className: 'mark-search',
                done: function () {
                    instance.mark(str, {
                        acrossElements: true,
                        separateWordSearch: false,
                        className: 'mark-blue mark-search',
                        done: function () {
                            nodesToMark.forEach(function (node) {
                                var markedData = node.getAttribute('data-marked') || '';
                                var markedArray = markedData ? markedData.split(',') : [];
                                if (!markedArray.includes(str)) {
                                    markedArray.push(str);
                                    node.setAttribute('data-marked', markedArray.join(','));
                                }
                            });
                        },
                    });
                },
            });
        }
    },

    unmark: function () {
        this.searchingString = null;
        this.markedStr = null;

        this.markInstances = this.markInstances || [];

        if (this.markInstances.length) {
            this.markInstances.forEach(function (instance) {
                instance.unmark({
                    className: 'mark-search',
                    done: function () {
                        instance.nodes.forEach(function (node) {
                            node.removeAttribute('data-marked');
                        });
                    },
                });
            });

            this.markInstances = [];
        }
    },

    toggleSound: function () {
        var o = this.options;
        o.sound = !o.sound;
        if (this.backgroundMusic) {
            o.sound ? this.backgroundMusic.play() : this.backgroundMusic.pause();
        }
        this.toggleIcon(this.btnSound, o.sound);
    },

    toggleIcon: function (btn, val) {
        if (btn.$iconAlt) {
            if (val) {
                btn.$iconAlt.classList.add('flipbook-hidden');
                btn.$icon.classList.remove('flipbook-hidden');
            } else {
                btn.$iconAlt.classList.remove('flipbook-hidden');
                btn.$icon.classList.add('flipbook-hidden');
            }
        } else {
            var prev = val ? btn.iconAlt : btn.icon;
            var curr = val ? btn.icon : btn.iconAlt;

            btn.find('.' + prev)
                .removeClass(prev)
                .addClass(curr);
        }
    },

    scrollPageIntoView: function (obj) {
        let targetPage = obj.pageNumber;

        if (this.options.doublePage) {
            targetPage = 2 * targetPage - 1;
        }

        if (this.options.rightToLeft) {
            targetPage = this.options.pages.length - targetPage + 1;
        }

        this.goToPage(targetPage);
    },

    loadScript: function (src, globalVariable) {
        if (src.indexOf('?ver') === -1) src += `?ver=${FLIPBOOK.version}`;

        FLIPBOOK.scripts = FLIPBOOK.scripts || {};

        const isGlobalVariableDefined = (name) => {
            return name.split('.').reduce((acc, part) => acc && acc[part], window) !== undefined;
        };

        return new Promise((resolve, reject) => {
            if (globalVariable && isGlobalVariableDefined(globalVariable)) return resolve();

            const scriptData = FLIPBOOK.scripts[src];
            if (scriptData) {
                if (scriptData.loaded) {
                    return resolve();
                } else {
                    scriptData.promises.push({ resolve, reject });
                    return;
                }
            }

            FLIPBOOK.scripts[src] = { loaded: false, promises: [{ resolve, reject }] };

            let script = document.createElement('script');
            script.async = true;
            script.src = src;

            script.onload = script.onreadystatechange = function (_, isAbort) {
                if (!isAbort && (!script.readyState || /loaded|complete/.test(script.readyState))) {
                    script.onload = script.onreadystatechange = null;
                    FLIPBOOK.scripts[src].loaded = true;
                    FLIPBOOK.scripts[src].promises.forEach((p) => p.resolve());
                }
            };

            script.onerror = (error) => {
                FLIPBOOK.scripts[src].promises.forEach((p) => p.reject(error));
                FLIPBOOK.scripts[src] = undefined;
            };

            document.head.appendChild(script);
        });
    },

    initGoogleAnalytics: async function () {
        if (!document.querySelector(`script[src="https://www.googletagmanager.com/gtag/js?id=${this.gaCode}"]`)) {
            return new Promise((resolve, reject) => {
                var script = document.createElement('script');
                script.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=' + this.gaCode);
                const self = this;
                script.async = 1;
                script.onload = function () {
                    window.dataLayer = window.dataLayer || [];
                    function gtag() {
                        dataLayer.push(arguments);
                    }
                    gtag('js', new Date());
                    gtag('config', self.gaCode);
                    resolve();
                };
                script.onerror = function () {
                    reject(new Error('Google Analytics script failed to load'));
                };
                document.body.appendChild(script);
            });
        } else {
            return Promise.resolve();
        }
    },

    createBook: async function () {
        var self = this;
        var options = this.options;

        if (this.options.searchOnStart) {
            this.options.btnSearch.enabled = true;
        }

        this.setLoadingProgress(0.9);

        if (this.options.viewMode === 'webgl') {
            await this.loadScript(FLIPBOOK.threejsSrc, 'THREE');
            await this.loadScript(FLIPBOOK.flipbookWebGlSrc, 'FLIPBOOK.BookWebGL');
        } else if (this.options.viewMode === 'swipe') {
            await this.loadScript(FLIPBOOK.iscrollSrc, 'IScroll');
            await this.loadScript(FLIPBOOK.flipBookSwipeSrc, 'FLIPBOOK.BookSwipe');
        } else if (this.options.viewMode === 'scroll') {
            await this.loadScript(FLIPBOOK.iscrollSrc, 'IScroll');
            await this.loadScript(FLIPBOOK.flipBookScrollSrc, 'FLIPBOOK.BookScroll');
        } else {
            await this.loadScript(FLIPBOOK.iscrollSrc, 'IScroll');
            await this.loadScript(FLIPBOOK.flipbookBook3Src, 'FLIPBOOK.Book3');
        }

        window.define = this.define;

        this.setLoadingProgress(1);

        if (this.options.doublePage && this.options.pages.length > 2) {
            var p = this.options.pages[0];
            var left;
            var right;
            p.title = 1;
            var newArr = [p];

            for (var i = 1; i <= this.options.pages.length - 2; i++) {
                p = this.options.pages[i];
                left = {
                    src: p.src,
                    thumb: p.thumb,
                    title: 2 * i,
                    htmlContent: p.htmlContent,
                    json: p.json,
                    side: 'left',
                };
                right = {
                    src: p.src,
                    thumb: p.thumb,
                    title: 2 * i + 1,
                    htmlContent: p.htmlContent,
                    json: p.json,
                    side: 'right',
                };
                newArr.push(left);
                newArr.push(right);
            }

            p = this.options.pages[this.options.pages.length - 1];
            p.title = this.options.pages.length;

            if (this.options.backCover) {
                newArr.push(p);
            } else {
                left = {
                    src: p.src,
                    thumb: p.thumb,
                    title: 2 * i,
                    htmlContent: p.htmlContent,
                    json: p.json,
                    side: 'left',
                };
                right = {
                    src: p.src,
                    thumb: p.thumb,
                    title: 2 * i + 1,
                    htmlContent: p.htmlContent,
                    json: p.json,
                    side: 'right',
                };
                newArr.push(left);
                newArr.push(right);
            }
            this.options.pages = newArr;
        }

        this.addPageNames();

        this.options.numPages = this.options.pages.length;
        if (this.options.numPages % 2 != 0 && !this.options.singlePageMode) {
            this.options.backCover = false;
            if (!this.options.cover) {
                this.options.backCover = !this.options.backCover;
            }
            this.options.pages.push({
                src: this.options.assets.preloader,
                thumb: this.options.assets.preloader,
                empty: true,
            });
        }

        this.options.pages.forEach((page) => {
            const content = page.htmlContent || '';
            const container = document.createElement('div');
            container.className = 'flipbook-page-html';

            const innerDiv = document.createElement('div');
            innerDiv.className = 'htmlContent';
            innerDiv.innerHTML = content;

            container.appendChild(innerDiv);

            page.htmlContent = container;
        });

        if (this.options.viewMode == 'webgl') {
            var bookOptions = this.options;
            bookOptions.scroll = this.scroll;
            bookOptions.parent = this;
            this.Book = new FLIPBOOK.BookWebGL(this.book, this, bookOptions);
            this.webglMode = true;

            this.initSwipe();
            this.initSound();
        } else if (this.options.viewMode == 'swipe') {
            this.Book = new FLIPBOOK.BookSwipe(this.book, this.bookLayer, this, options);

            this.initSwipe();
        } else if (this.options.viewMode == 'scroll') {
            this.options.singlePageMode = true;
            this.Book = new FLIPBOOK.BookScroll(this.book, this.bookLayer, this, options);

            this.initSwipe();
        } else {
            if (this.options.viewMode != '2d') {
                this.options.viewMode = '3d';
            }

            this.Book = new FLIPBOOK.Book3(this.book, this, options);

            this.initSwipe();

            this.webglMode = false;
            this.initSound();
        }

        this.resize();

        this.Book.enable();
        this.book.classList.remove('flipbook-hidden');

        this.tocCreated = false;

        if (!this.options.pdfMode) {
            var hasJSON = this.options.pages ? this.options.pages.some((page) => !!page.json) : false;
            if (!this.options.hasHtmlContent && !hasJSON) {
                this.options.btnSearch.enabled = false;
            }
            if (!this.options.tableOfContent.length) {
                var hasPageTitles = this.options.pages ? this.options.pages.some((page) => !!page.title) : false;
                if (!hasPageTitles) {
                    this.options.btnToc.enabled = false;
                }
            }
        } else {
            var tocArray = this.options.tableOfContent;
            if (this.options.btnToc.enabled && (!tocArray || !tocArray.length)) {
                
                var outline = await this.pdfService.loadOutline();
                if (outline) {
                    this.options.tableOfContent = outline;
                } else {
                    this.options.btnToc.enabled = false;
                }
                
            }
        }

        this.createMenu();

        this.onZoom(this.options.zoomMin);

        if (this.options.pages.length == 1) {
            this.rightToLeft = false;
        }

        FLIPBOOK.books = FLIPBOOK.books || {};
        FLIPBOOK.books[self.id] = self.Book;

        this.createLogo();
        this.onBookCreated();
    },

    destroy: async function () {
        if (this.pdfService) {
            if (this.pdfService.pages) {
                this.pdfService.pages.forEach(function (page) {
                    if (page.renderingTasks) {
                        page.renderingTasks.forEach(function (task) {
                            task.cancel();
                        });
                    }
                });
            }

            if (this.pdfService.pdfDocument) {
                this.pdfService.pdfDocument.cleanup();
                await this.pdfService.pdfDocument.destroy();
                this.pdfService.pdfDocument = null;
                this.pdfService = null;
            }
        }

        if (!this.bookCreated) {
            setTimeout(this.destroy.bind(this), 100);
            return;
        }

        this.Book.destroy();

        if (this.autoplayTimer) clearInterval(this.autoplayTimer);
        this.setBookmarkedPages([]);

        delete FLIPBOOK.books[this.id];
        this.Book = null;
        this.initPdf = null;
        this.createMenu = null;
        this.createBook = null;
        this.options = null;
        this.resizeObserver.disconnect();
        this.resizeObserver.disconnect();
        this.removeEventListeners();
    },

    initNotes: function () {
        this.noteService = new FLIPBOOK.Notes(this);
        const self = this;
        window.addEventListener('r3d-update-note-visibility', function (e) {
            self.options.noteTypes.forEach(function (noteType) {
                if (e.detail.id == noteType.id) {
                    noteType.enabled = e.detail.enabled;
                }
            });
            self.noteService.updateNoteVisibility();
        });
    },

    createTooltip: function () {
        this.tooltip = new FLIPBOOK.Tooltip();
        this.wrapper.appendChild(this.tooltip.domElement);
    },

    showTooltip: function (params) {
        this.tooltip.show(params);
    },

    hideTooltip: function () {
        this.tooltip.hide();
    },

    addPageItems: function () {
        
        const pages = this.options.pages;
        let el;

        for (let key in pages) {
            let page = pages[key];
            page.htmlContent = page.htmlContent || '';

            if (page.items) {
                for (let item of page.items) {
                    const {
                        autoplay = true,
                        controls = false,
                        loop = true,
                        muted = true,
                        src,
                        url = src,
                        x = 0,
                        y = 0,
                        width = 100,
                        height = 100,
                        type,
                    } = item;

                    const autoplayAttribute = autoplay ? 'autoplay' : '';
                    const controlsAttribute = controls ? 'controls controlslist="nodownload noplaybackrate"' : '';
                    const loopAttribute = loop ? 'loop' : '';
                    const mutedAttribute = muted ? 'muted' : '';

                    switch (type) {
                        case 'iframe':
                        case 'youtube':
                            if (!url) continue;
                            if (url.includes('<iframe')) {
                                page.htmlContent += `
								<div class="flipbook-page-item flipbook-page-item-iframe" 
								style="top:${y}px;left:${x}px;width:${width}px;height:${height}px;">
									${url}
								</div>`;
                            } else {
                                const getYouTubeEmbedUrl = (url) => {
                                    if (url.includes('youtu.be/')) {
                                        return url.replace('youtu.be/', 'youtube.com/embed/');
                                    }
                                    if (url.includes('youtube.com/watch?v=')) {
                                        return url.split('&')[0].replace('/watch?v=', '/embed/');
                                    }
                                    return url;
                                };

                                item.url = getYouTubeEmbedUrl(url) + '?enablejsapi=1';

                                if (autoplay) {
                                    item.url += '&autoplay=1&mute=1';
                                }

                                page.htmlContent += `
								<iframe class="flipbook-page-item flipbook-page-item-youtube" src="${item.url}" 
									style="top:${y}px;left:${x}px;width:${width}px;height:${height}px;" 
									frameborder="0" allow="accelerometer; autoplay; encrypted-media; 
									gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                            }
                            break;

                        case 'link':
                            el = document.createElement('a');
                            el.className = 'flipbook-page-item flipbook-page-item-link';
                            el.style.cssText = `
							width:${width}px;height:${height}px;position:absolute;top:${y}px;left:${x}px;`;

                            if (item.content) {
                                el.innerHTML = item.content;
                            }

                            if (url) {
                                el.href = url;
                                el.target = item.target || this.options.linkTarget;
                            } else if (item.page) {
                                el.href = '#';
                                el.classList.add('internalLink');
                                el.dataset.page = item.page;
                            }

                            page.htmlContent += el.outerHTML;
                            break;

                        case 'spotlight':
                            el = document.createElement('a');
                            el.className = 'flipbook-page-item flipbook-page-item-link spotlight';
                            el.style.cssText = `
								width:${width}px;height:${height}px;position:absolute;top:${y}px;left:${x}px;`;

                            el.href = '#';
                            el.dataset.url = item.url;
                            if (item.title) {
                                el.dataset.title = item.title;
                            }
                            if (item.description) {
                                el.dataset.description = item.description;
                            }
                            page.htmlContent += el.outerHTML;
                            break;

                        case 'image':
                            page.htmlContent += `
							<img class="flipbook-page-item" src="${url}" 
								style="top:${y}px;left:${x}px;width:${width}px;height:${height}px;"
							>`;
                            break;

                        case 'video':
                            page.htmlContent += `
							<video class="flipbook-page-item flipbook-page-item-video" playsinline  
							${loopAttribute} ${autoplayAttribute} ${controlsAttribute} ${mutedAttribute} 
							style="top:${y}px;left:${x}px;width:${width}px;height:${height}px;"
							data-url="${url}">
								<source type="video/mp4">
							</video>`;
                            break;

                        case 'audio':
                            page.htmlContent += `
							<audio ${loopAttribute} ${autoplayAttribute} ${controlsAttribute} 
							class="flipbook-page-item" data-url="${url}"
							style="top:${y}px;left:${x}px;width:${width}px;height:${height}px;">
								<source type="audio/mpeg">
							</audio>`;
                            break;
                    }
                }
            }
        }

        
    },

    spotlight: function (url, title, description) {
        
        let overlay = document.querySelector('.flipbook-spotlight-overlay');

        function stopMediaPlayback() {
            const media = overlay.querySelector('video, iframe');
            if (media) {
                if (media.tagName.toLowerCase() === 'video') {
                    media.pause();
                } else {
                    media.src = media.src;
                }
            }
        }

        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'flipbook-spotlight-overlay';

            const closeButton = document.createElement('button');
            closeButton.className = 'flipbook-spotlight-close-button';
            closeButton.innerHTML = `
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M6 6L18 18" stroke="white" stroke-width="2"
					 stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M6 18L18 6" stroke="white" stroke-width="2"
					 stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			`;
            closeButton.onclick = () => {
                stopMediaPlayback(overlay);
                overlay.classList.add('flipbook-hidden');
            };

            overlay.addEventListener('click', (event) => {
                if ([overlay, closeButton].includes(event.target)) {
                    stopMediaPlayback(overlay);
                    overlay.classList.add('flipbook-hidden');
                }
            });

            overlay.appendChild(closeButton);
            this.wrapper.appendChild(overlay);
        } else {
            const existingContent = overlay.querySelector('img, video, iframe');
            existingContent && overlay.removeChild(existingContent);
        }

        const getYouTubeEmbedUrl = (url) =>
            url.includes('youtu.be/')
                ? url.replace('youtu.be/', 'youtube.com/embed/')
                : url.includes('youtube.com/watch?v=')
                  ? url.split('&')[0].replace('/watch?v=', '/embed/')
                  : url;

        const createElement = (tag, attrs) => {
            const el = document.createElement(tag);
            for (let key in attrs) {
                if (key === 'style') {
                    el.style.cssText = attrs[key];
                } else {
                    el[key] = attrs[key];
                }
            }
            return el;
        };

        let content;
        if (url.endsWith('.mp4')) {
            content = createElement('video', {
                src: url,
                controls: true,
                style: 'max-width: 80%; max-height: 80%;',
                className: 'flipbook-spotlight-video',
            });
        } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
            content = createElement('iframe', {
                src: getYouTubeEmbedUrl(url) + '?enablejsapi=1&autoplay=1&mute=1',
                style: `width: 80vw; height: 45vw; max-width: 960px; max-height: 540px;
				 min-width: 300px; min-height: 168.75px;`,
                frameBorder: '0',
                allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
                allowFullscreen: true,
            });
        } else if (
            url.endsWith('.jpg') ||
            url.endsWith('.jpeg') ||
            url.endsWith('.png') ||
            url.endsWith('.gif') ||
            url.endsWith('.bmp') ||
            url.endsWith('.webp')
        ) {
            content = createElement('img', { src: url, style: 'max-width: 80%; max-height: 80%;' });
        } else {
            content = createElement('iframe', {
                src: url,
                style: `width: 80vw; height: 45vw; max-width: 960px; max-height: 540px;
				 min-width: 300px; min-height: 168.75px;`,
                frameBorder: '0',
                allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
                allowFullscreen: true,
            });
        }

        overlay.appendChild(content);
        overlay.classList.remove('flipbook-hidden');

        if (title || description) {
            let captionContainer = overlay.querySelector('.flipbook-spotlight-caption-container');
            if (!captionContainer) {
                captionContainer = createElement('div', { className: 'flipbook-spotlight-caption-container' });
            }
            overlay.appendChild(captionContainer);

            captionContainer.innerHTML = '';
            if (title) {
                captionContainer.innerHTML += '<div class="flipbook-spotlight-title">' + title + '</div>';
            }
            if (description) {
                captionContainer.innerHTML += '<div class="flipbook-spotlight-description">' + description + '</div>';
            }
        }
        
    },

    resizeContainer: function () {
        if (!this.lightbox && !this.options.fullscreen && !this.elemStatic) {
            var pageRatio = this.pageW / this.pageH;
            var bookRatio = 2 * pageRatio;
            let width = this.elem.getBoundingClientRect().width;
            let ratio;
            if (this.options.isMobile && width < this.options.responsiveViewTreshold) {
                ratio = pageRatio;
            } else {
                ratio = bookRatio;
            }

            var newHeight = width / (this.options.containerRatio || ratio);

            newHeight += this.wrapper.clientHeight - this.bookLayer.clientHeight;

            this.elem.style.height = newHeight + 'px';
        }
        this.resize();
    },

    addEventListeners: function () {
        this.handleResize = () => this.resizeContainer();
        this.handleKeydown = (e) => {
            if (!this.Book.enabled) {
                return;
            }

            if (!this.options.lightBox && document.body.classList.contains('flipbook-overflow-hidden')) {
                return;
            }

            if (!this.fullscreenActive && document.body.classList.contains('flipbook-fullscreen')) {
                return;
            }

            if (
                !(this.options.arrowsAlwaysEnabledForNavigation && (e.keyCode == 37 || e.keyCode == 39)) &&
                (this.options.lightBox ||
                    this.fullscreenActive ||
                    (!this.options.arrowsDisabledNotFullscreen && !this.bodyHasVerticalScrollbar()))
            ) {
                return;
            }

            switch (e.keyCode) {
                case 37:
                    this.zoom > 1 ? this.moveBook('left') : this.prevPage();
                    break;
                case 38:
                    this.zoom > 1 ? this.moveBook('up') : this.nextPage();
                    break;
                case 39:
                    this.zoom > 1 ? this.moveBook('right') : this.nextPage();
                    break;
                case 33:
                    this.prevPage();
                    break;
                case 34:
                    this.nextPage();
                    break;
                case 36:
                    this.firstPage();
                    break;
                case 35:
                    this.lastPage();
                    break;
                case 40:
                    this.zoom > 1 ? this.moveBook('down') : this.prevPage();
                    break;
            }
            return false;
        };
        this.handleFs = () => this.handleFsChange();

        window.addEventListener('resize', this.handleResize);
        document.addEventListener('keydown', this.handleKeydown);

        document.addEventListener('MSFullscreenChange', this.handleFs);
        document.addEventListener('mozfullscreenchange', this.handleFs);
        document.addEventListener('webkitfullscreenchange', this.handleFs);
        document.addEventListener('fullscreenchange', this.handleFs);
    },

    removeEventListeners: function () {
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('keydown', this.handleKeydown);

        document.removeEventListener('MSFullscreenChange', this.handleFs);
        document.removeEventListener('mozfullscreenchange', this.handleFs);
        document.removeEventListener('webkitfullscreenchange', this.handleFs);
        document.removeEventListener('fullscreenchange', this.handleFs);
    },

    onBookCreated: function () {
        var o = this.options;

        var self = this;

        if (!o.cover && Number(o.startPage) < 2) {
            o.startPage = 2;
        }

        var root = document.documentElement;
        root.style.setProperty('--flipbook-link-color', this.options.linkColor);
        root.style.setProperty('--flipbook-link-color-hover', this.options.linkColorHover);
        root.style.setProperty('--flipbook-link-opacity', this.options.linkOpacity);

        this.elemStatic = getComputedStyle(this.elem).position == 'static';

        this.resizeContainer();

        this.addEventListeners();

        this.resizeObserver = new ResizeObserver((entries) => {
            self.resizeContainer();
        });

        this.resizeObserver.observe(this.elem);

        this.resizeObserver2 = new ResizeObserver(() => {
            self.resize();
        });

        this.resizeObserver2.observe(this.bookLayer);

        if (o.rightToLeft) {
            this.goToPage(Number(o.pages.length - Number(o.startPage) + 1), true);
        } else {
            this.goToPage(Number(o.startPage), true);
        }

        this.playBgMusic();

        if (o.lightboxCloseOnBack) {
            window.onpopstate = function () {
                if (self.Book.enabled && FLIPBOOK.lightboxOpened) {
                    if (!window.location.hash) {
                        self.lightbox.closeLightbox(true);
                    }
                }
            };
        }

        if (this.options.viewMode != 'scroll') {
            this.bookLayer.addEventListener(
                'wheel',
                function (e) {
                    if (!this.Book.enabled) return;

                    if (!this.options.lightBox && !this.fullscreenActive) {
                        if (this.options.wheelDisabledNotFullscreen || this.bodyHasVerticalScrollbar()) {
                            return;
                        }
                    }

                    const deltaX = e.deltaX || -e.wheelDeltaX || -e.detail;
                    const deltaY = e.deltaY || -e.wheelDeltaY || -e.detail;

                    if (Math.abs(deltaY) > 0 && Math.abs(deltaY) > Math.abs(deltaX)) {
                        if (deltaY > 0) {
                            this.zoomOut(e);
                        } else {
                            this.zoomIn(e);
                        }
                        return false;
                    }
                }.bind(this)
            );
        }

        if (self.options.contentOnStart) {
            this.toggleToc(true);
        } else if (self.options.thumbnailsOnStart) {
            this.options.thumbsStyle = 'side';
            this.toggleThumbs(true);
        } else if (self.options.searchOnStart) {
            this.toggleSearch(true);
            if (typeof self.options.searchOnStart == 'string') {
                this.thumbs.$findInput.val(this.options.searchOnStart).trigger('keyup');
            }
        }

        if (o.autoplayOnStart) {
            this.toggleAutoplay(true);
        }

        this.initColors();

        this.resize();
        this.Book.updateVisiblePages();
        this.Book.zoomTo(o.zoomMin);
        this.updateCurrentPage();

        if (o.onbookcreated) {
            o.onbookcreated.call(this);
        }
        this.bookCreated = true;
    },

    initSound: function () {
        if (this.options.flipSound) {
            this.flipSound = document.createElement('audio');
            this.flipSound.preload = 'auto';
            var flipSource = document.createElement('source');
            flipSource.src = this.options.assets.flipMp3;
            flipSource.type = 'audio/mpeg';
            this.flipSound.appendChild(flipSource);
        }

        if (this.options.backgroundMusic) {
            this.backgroundMusic = document.createElement('audio');
            this.backgroundMusic.preload = 'auto';
            this.backgroundMusic.autoplay = true;
            var bgMusicSource = document.createElement('source');
            bgMusicSource.src = this.options.backgroundMusic;
            bgMusicSource.type = 'audio/mpeg';
            this.backgroundMusic.appendChild(bgMusicSource);
        }
    },

    touchSwipe: function (element, callback) {
        let startX;
        let startY;
        let startDistance;
        let startTime;
        let isSwiping = false;
        let isPinching = false;
        let fingerCount = 0;
        let touchStarted = false;
        let lastX;
        let lastY;

        function calculateDistance(touches) {
            if (touches.length < 2) {
                return 0;
            }
            let dx = touches[0].clientX - touches[1].clientX;
            let dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }

        function calculateDirectionAndDistance(currentX, currentY) {
            let deltaX = currentX - startX;
            let deltaY = currentY - startY;
            let distanceX = deltaX;
            let distanceY = deltaY;
            return { distanceX, distanceY };
        }

        function getTouchObject(e) {
            return e.type.includes('mouse') ? e : e.touches[0];
        }

        var self = this;
        function startHandler(e) {
            if (e.type === 'touchstart') {
                touchStarted = true;
            } else if (e.type === 'mousedown' && touchStarted) {
                return;
            } else if (e.target.tagName === 'A' || e.target.tagName === 'SPAN' || e.target.tagName === 'MARK') {
                self.trigger('disableIScroll');
                return;
            }
            self.trigger('enableIScroll');

            let touchObj = getTouchObject(e);
            startX = touchObj.clientX;
            startY = touchObj.clientY;
            startTime = new Date().getTime();
            isSwiping = true;
            fingerCount = e.touches ? e.touches.length : 1;
            callback(e, 'start', null, 0, 0, fingerCount);
            element.addEventListener('mousemove', moveHandler);
            element.addEventListener('touchmove', moveHandler, { passive: false });
        }

        function moveHandler(e) {
            let touchObj = getTouchObject(e);
            let { distanceX, distanceY } = calculateDirectionAndDistance(touchObj.clientX, touchObj.clientY);

            lastX = touchObj.clientX;
            lastY = touchObj.clientY;

            if (isSwiping && e.type === 'mousemove') {
                e.preventDefault();
                callback(e, 'move', distanceX, distanceY, 0, 1);
            } else if (e.touches && e.touches.length === 2) {
                e.preventDefault();
                let scale;
                if (typeof e.scale === 'number') {
                    scale = e.scale;
                } else {
                    let currentDistance = calculateDistance(e.touches);
                    if (!isPinching) {
                        isPinching = true;
                        startDistance = currentDistance;
                        scale = 1;
                    } else {
                        scale = currentDistance / startDistance;
                    }
                }

                if (isPinching) {
                    callback(e, 'pinch', scale, null, 0, 2);
                } else {
                    isPinching = true;
                    startDistance = calculateDistance(e.touches);
                    callback(e, 'pinchstart', scale, null, 0, 2);
                }
            } else if (e.touches && e.touches.length === 1) {
                if (self.zoom > 1) {
                    e.preventDefault();
                }
                callback(e, 'move', distanceX, distanceY, 0, 1);
            }
        }

        function endHandler(e) {
            self.trigger('enableIScroll');
            if (e.type === 'touchend' || e.type === 'mouseup') {
                setTimeout(function () {
                    touchStarted = false;
                }, 300);
            }

            let touchObj = e.changedTouches ? e.changedTouches[0] : e;
            let { distanceX, distanceY } = calculateDirectionAndDistance(touchObj.clientX, touchObj.clientY);
            let duration = new Date().getTime() - startTime;

            if (isSwiping) {
                isSwiping = false;
                callback(e, 'end', distanceX, distanceY, duration, e.changedTouches ? e.changedTouches.length : 1);
            }

            if (isPinching) {
                isPinching = false;
                callback(e, 'pinchend', null, 0, 0, 2);
            }
            removeEventListeners();
        }

        function cancelHandler(e) {
            setTimeout(function () {
                touchStarted = false;
            }, 300);

            let duration = new Date().getTime() - startTime;
            let { distanceX, distanceY } = calculateDirectionAndDistance(lastX, lastY);

            if (isSwiping) {
                isSwiping = false;
                callback(e, 'cancel', distanceX, distanceY, duration, 1);
            }
            if (isPinching) {
                isPinching = false;
                callback(e, 'pinchcancel', distanceX, distanceY, duration, 2);
            }
            removeEventListeners();
        }

        function removeEventListeners() {
            element.removeEventListener('mousemove', moveHandler);
            element.removeEventListener('touchmove', moveHandler);
        }

        element.addEventListener('mousedown', startHandler);
        element.addEventListener('touchstart', startHandler);
        element.addEventListener('mouseup', endHandler);
        element.addEventListener('touchend', endHandler);
        element.addEventListener('mouseleave', cancelHandler);
        element.addEventListener('touchcancel', cancelHandler);
    },

    initSwipe: function () {
        var self = this;

        let zooming = false;
        let pinching = false;
        let textSelect = false;
        this.touchSwipe(this.book, function (e, phase, distanceX, distanceY, duration, fingerCount) {
            textSelect = self.tool == 'toolSelect' || self.options.pageDragDisabled;

            if (phase == 'start') {
                self.zoomStart = self.zoom;
                try {
                    self.currentPageInput.dispatchEvent(new Event('blur', { bubbles: true, cancelable: true }));
                } catch (e) {}
            }

            if (fingerCount > 1 && phase == 'pinch') {
                let scale = distanceX;
                if (e.scale) {
                    scale = e.scale;
                }
                self.zoomTo(self.zoomStart * scale, 0, e);
                pinching = true;
            }

            if (phase == 'end') {
                if (!self.options.doubleClickZoomDisabled) {
                    if (!self.clickTimer) {
                        self.clickTimer = setTimeout(function () {
                            delete self.clickTimer;
                        }, 300);
                    } else {
                        clearTimeout(self.clickTimer);
                        delete self.clickTimer;
                        const pageHtmlClicked = e.target.closest('.flipbook-page-html') !== null;
                        if (pageHtmlClicked) {
                            var t = self.options.zoomTime;
                            if (self.zoom >= self.options.zoomMax) {
                                self.zoomTo(self.options.zoomMin, t, e);
                            } else {
                                self.zoomTo(self.options.zoomMax, t, e);
                            }
                        }
                    }
                }
                if (Math.abs(distanceX) < 5 && duration < 200) {
                    zooming = true;
                }
            }

            if (!zooming && !pinching && !textSelect) {
                self.Book.onSwipe(e, phase, distanceX, distanceY, duration, fingerCount);
            }
            zooming = false;

            if (phase == 'pinchend') {
                pinching = false;
            }
        });

        this.swipeEnabled = true;
    },

    createSVGIcon: function (name, reverse) {
        var icons = {
            plus: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>',
            minus: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>',
            close: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>',
            next: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>',
            expand: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"/></svg>',
            compress:
                '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z"/></svg>',
            thumbs: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M448 96V224H288V96H448zm0 192V416H288V288H448zM224 224H64V96H224V224zM64 288H224V416H64V288zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"/></svg>',
            print: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>',
            sound: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>',
            mute: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>',
            share: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"/></svg>',
            facebook:
                '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>',
            twitter:
                '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>',
            list: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M24 56c0-13.3 10.7-24 24-24H80c13.3 0 24 10.7 24 24V176h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24H56V80H48C34.7 80 24 69.3 24 56zM86.7 341.2c-6.5-7.4-18.3-6.9-24 1.2L51.5 357.9c-7.7 10.8-22.7 13.3-33.5 5.6s-13.3-22.7-5.6-33.5l11.1-15.6c23.7-33.2 72.3-35.6 99.2-4.9c21.3 24.4 20.8 60.9-1.1 84.7L86.8 432H120c13.3 0 24 10.7 24 24s-10.7 24-24 24H32c-9.5 0-18.2-5.6-22-14.4s-2.1-18.9 4.3-25.9l72-78c5.3-5.8 5.4-14.6 .3-20.5zM224 64H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>',
            pdf: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M64 464l48 0 0 48-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 304l-48 0 0-144-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"/></svg>',
            tools: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>',
            
            pause: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>',
            play: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>',
            bookmark:
                '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>',
            download:
                '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>',
            search: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>',
            last: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>',

            double: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M384 80c8.8 0 16 7.2 16 16l0 320c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16L48 96c0-8.8 7.2-16 16-16l320 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z"/></svg>',
            single: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5l0-377.4c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8L0 454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5l0-370.3c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11L304 456c0 11.4 11.7 19.3 22.4 15.5z"/></svg>',

            linkedin:
                '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>',
            whatsapp:
                '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>',
            pinterest:
                '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"/></svg>',
            email: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>',
            digg: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M81.7 172.3H0v174.4h132.7V96h-51v76.3zm0 133.4H50.9v-92.3h30.8v92.3zm297.2-133.4v174.4h81.8v28.5h-81.8V416H512V172.3H378.9zm81.8 133.4h-30.8v-92.3h30.8v92.3zm-235.6 41h82.1v28.5h-82.1V416h133.3V172.3H225.1v174.4zm51.2-133.3h30.8v92.3h-30.8v-92.3zM153.3 96h51.3v51h-51.3V96zm0 76.3h51.3v174.4h-51.3V172.3z"/></svg>',
            reddit: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.1-42.3L293 52.3l88.2 19.8c0 21.6 17.6 39.2 39.2 39.2 22 0 39.7-18.1 39.7-39.7s-17.6-39.7-39.7-39.7c-15.4 0-28.7 9.3-35.3 22l-97.4-21.6c-4.9-1.3-9.7 2.2-11 7.1L246.3 177c-52.9 2.2-100.5 18.1-136.3 42.8-9.7-10.1-23.4-16.3-38.4-16.3-55.6 0-73.8 74.6-22.9 100.1-1.8 7.9-2.6 16.3-2.6 24.7 0 83.8 94.4 151.7 210.3 151.7 116.4 0 210.8-67.9 210.8-151.7 0-8.4-.9-17.2-3.1-25.1 49.9-25.6 31.5-99.7-23.8-99.7zM129.4 308.9c0-22 17.6-39.7 39.7-39.7 21.6 0 39.2 17.6 39.2 39.7 0 21.6-17.6 39.2-39.2 39.2-22 .1-39.7-17.6-39.7-39.2zm214.3 93.5c-36.4 36.4-139.1 36.4-175.5 0-4-3.5-4-9.7 0-13.7 3.5-3.5 9.7-3.5 13.2 0 27.8 28.5 120 29 149 0 3.5-3.5 9.7-3.5 13.2 0 4.1 4 4.1 10.2.1 13.7zm-.8-54.2c-21.6 0-39.2-17.6-39.2-39.2 0-22 17.6-39.7 39.2-39.7 22 0 39.7 17.6 39.7 39.7-.1 21.5-17.7 39.2-39.7 39.2z"/></svg>',
            
        };

        var container = document.createElement('div');
        container.innerHTML = icons[name];

        var svgElement = container.firstChild;

        svgElement.setAttribute('aria-hidden', 'true');
        svgElement.classList.add('flipbook-icon');

        if (reverse) {
            svgElement.classList.add('flipbook-icon-reverse');
        }

        return svgElement;
    },

    createButton: function (btn) {
        var o = this.options;
        var inToolsMenu = btn.toolsMenu && o.btnTools.enabled;
        var floating =
            !inToolsMenu &&
            ((btn.vAlign === 'top' && o.menu2Transparent) || (btn.vAlign !== 'top' && o.menuTransparent));
        var bgColor = btn.background || (floating ? o.floatingBtnBackground : o.btnBackground);
        var bgColorHover = btn.backgroundHover || (floating ? o.floatingBtnBackgroundHover : o.btnBackgroundHover);
        var color = btn.color || (floating ? o.floatingBtnColor : o.btnColor);
        var colorHover = btn.colorHover || (floating ? o.floatingBtnColorHover : o.btnColorHover);
        var textShadow = floating ? o.floatingBtnTextShadow : o.btnTextShadow;
        var radius = btn.radius || (floating ? o.floatingBtnRadius : o.btnRadius);
        var border = btn.border || (floating ? o.floatingBtnBorder : o.btnBorder);
        var margin = floating ? o.floatingBtnMargin : o.btnMargin;
        var paddingV = o.btnPaddingV + 2;
        var paddingH = o.btnPaddingH + 2;
        var $btn = document.createElement('span');
        var material = o.icons === 'material';
        var btnSize = material ? (btn.size || o.btnSize) + 8 : btn.size || o.btnSize;

        if (inToolsMenu) {
            bgColor = 'none';
            bgColorHover = 'none';
        }

        function addCSS(btn) {
            btn.style.margin = `${margin}px`;
            btn.style.padding = `${paddingV}px ${paddingH}px`;
            btn.style.borderRadius = `${radius}px`;
            btn.style.boxShadow = o.btnShadow;
            btn.style.border = border;
            btn.style.color = color;
            btn.$icon.style.fill = color;
            btn.style.background = bgColor;
            btn.style.textShadow = textShadow;
            btn.style.width = `${btnSize}px`;
            btn.style.height = `${btnSize}px`;

            if (color) {
                btn.classList.remove('skin-color');
            }
            if (bgColor) {
                btn.classList.remove('skin-color-bg');
            }
        }

        const iconName = btn.svg || btn.name.replace('btn', '').toLowerCase();

        $btn.$icon = this.createSVGIcon(iconName, btn.iconReverse);
        $btn.appendChild($btn.$icon);

        if (btn.svgAlt) {
            $btn.$iconAlt = this.createSVGIcon(btn.svgAlt, btn.iconReverse);
            $btn.appendChild($btn.$iconAlt);
            $btn.$iconAlt.classList.add('flipbook-hidden');
        }

        addCSS($btn);

        if (btn.onclick) {
            $btn.addEventListener('click', function () {
                btn.onclick();
            });
        }

        if (colorHover || bgColorHover) {
            $btn.addEventListener('mouseenter', function () {
                if (this.classList.contains('disabled')) return;
                $btn.$icon.style.fill = colorHover;
                $btn.$icon.style.background = bgColorHover;
                if ($btn.$iconAlt) {
                    $btn.$icon.style.fill = colorHover;
                    $btn.$icon.style.background = bgColorHover;
                }
            });

            $btn.addEventListener('mouseleave', function () {
                $btn.$icon.style.fill = color;
                $btn.$icon.style.background = bgColor;
                if ($btn.$iconAlt) {
                    $btn.$iconAlt.style.fill = color;
                    $btn.$iconAlt.style.background = bgColor;
                }
            });
        }

        var menu;

        if (inToolsMenu) {
            menu = this.toolsMenu;
            var span = document.createElement('span');
            span.textContent = btn.title;
            span.classList.add('skin-color');
            $btn.appendChild(span);
        } else if (btn.vAlign === 'top') {
            if (o.menu2Floating) {
                menu = this.menuTC;
            } else if (btn.hAlign === 'left') {
                menu = this.menuTL;
            } else if (btn.hAlign === 'right') {
                menu = this.menuTR;
            } else {
                menu = this.menuTC;
            }
        } else {
            if (o.menuFloating) {
                menu = this.menuBC;
            } else if (btn.hAlign === 'left') {
                menu = this.menuBL;
            } else if (btn.hAlign === 'right') {
                menu = this.menuBR;
            } else {
                menu = this.menuBC;
            }
        }

        $btn.setAttribute('data-name', btn.name);
        $btn.classList.add('flipbook-menu-btn-wrapper', 'flipbook-menu-btn', 'skin-color');
        $btn.style.order = btn.order;
        menu.appendChild($btn);

        if (!inToolsMenu) {
            $btn.setAttribute('data-tooltip', btn.title);
            $btn.classList.add('flipbook-has-tooltip');
        }

        return $btn;
    },

    createMenu: function () {
        if (this.menuBottom) {
            return;
        }

        var o = this.options;

        var menuBottomClass = o.menuFloating ? 'flipbook-menu-floating' : 'flipbook-menu-fixed';
        var menuTopClass = o.menu2Floating ? 'flipbook-menu-floating' : 'flipbook-menu-fixed';

        var self = this;

        this.menuBottom = document.createElement('div');
        this.menuBottom.classList.add('flipbook-menuBottom', menuBottomClass);
        this.menuBottom.style.background = o.menuBackground;
        this.menuBottom.style.boxShadow = o.menuShadow;
        this.menuBottom.style.margin = o.menuMargin + 'px';
        this.menuBottom.style.padding = o.menuPadding + 'px';
        this.wrapper.appendChild(this.menuBottom);

        if (!o.menuTransparent && !o.menuBackground) {
            this.menuBottom.classList.add('skin-color-bg');
        }

        if (o.hideMenu) {
            this.menuBottom.classList.add('flipbook-hidden');
        }

        this.menuTop = document.createElement('div');
        this.menuTop.classList.add('flipbook-menuTop', menuTopClass);
        this.menuTop.style.background = o.menu2Background;
        this.menuTop.style.boxShadow = o.menu2Shadow;
        this.menuTop.style.margin = o.menu2Margin + 'px';
        this.menuTop.style.padding = o.menu2Padding + 'px';
        this.wrapper.appendChild(this.menuTop);

        if (!o.menu2Transparent && !o.menu2Background) {
            this.menuTop.classList.add('skin-color-bg');
        }

        if (o.viewMode === 'swipe') {
            o.btnSound.enabled = false;
        }

        function createAndAppendMenu(className, parentElement) {
            const div = document.createElement('div');
            div.className = className;
            parentElement.appendChild(div);
            return div;
        }

        this.menuBL = createAndAppendMenu('flipbook-menu flipbook-menu-left', this.menuBottom);
        this.menuBC = createAndAppendMenu('flipbook-menu flipbook-menu-center', this.menuBottom);
        this.menuBR = createAndAppendMenu('flipbook-menu flipbook-menu-right', this.menuBottom);

        this.menuTL = createAndAppendMenu('flipbook-menu flipbook-menu-left', this.menuTop);
        this.menuTC = createAndAppendMenu('flipbook-menu flipbook-menu-center', this.menuTop);
        this.menuTR = createAndAppendMenu('flipbook-menu flipbook-menu-right', this.menuTop);

        if (this.options.btnTools.enabled) {
            this.toolsMenu = document.createElement('div');
            this.toolsMenu.className = 'flipbook-tools flipbook-submenu skin-color skin-color-bg flipbook-font';
        }

        if (this.options.btnShare.enabled) {
            this.shareMenu = document.createElement('div');
            this.shareMenu.className = 'flipbook-share flipbook-submenu skin-color skin-color-bg flipbook-font';
        }

        function initButton(button, onclick) {
            button.addEventListener('click', function (e) {
                if (button.disabled) {
                    return false;
                }
                button.disabled = true;
                setTimeout(function () {
                    button.disabled = false;
                }, 300);

                e.stopPropagation();
                e.preventDefault();
                onclick();
            });

            button.style.width = o.arrowSize + 'px';
            button.style.borderRadius = o.arrowRadius + 'px';
            button.style.padding = o.arrowPadding + 'px';
            button.style.filter = 'drop-shadow(' + o.arrowTextShadow + ')';
            button.style.border = o.arrowBorder;
            button.style.color = o.arrowColor;
            button.style.fill = o.arrowColor;
            button.style.background = o.arrowBackground;
            button.style.boxSizing = 'initial';

            if (o.arrowBackgroundHover) {
                button.addEventListener('mouseenter', function () {
                    if (this.classList.contains('disabled')) return;
                    button.style.background = o.arrowBackgroundHover;
                });
                button.addEventListener('mouseleave', function () {
                    button.style.background = o.arrowBackground;
                });
            }

            if (o.arrowColor) {
                button.classList.remove('skin-color');
            }
            if (o.arrowBackground) {
                button.classList.remove('skin-color-bg');
            }
        }

        if (o.sideNavigationButtons) {
            this.$arrowWrapper = document.createElement('div');
            this.$arrowWrapper.className = 'flipbook-nav';
            this.bookLayer.appendChild(this.$arrowWrapper);

            this.btnNext = this.createSVGIcon('next');
            this.$arrowWrapper.appendChild(this.btnNext);
            this.btnNext.style.height = o.arrowSize + 'px';
            this.btnNext.style.fontSize = o.arrowSize + 'px';
            this.btnNext.style.marginTop = String(-o.arrowSize / 2) + 'px';
            this.btnNext.style.marginRight = o.arrowMargin + 'px';
            this.btnNext.classList.add('flipbook-right-arrow');
            initButton(this.btnNext, this.nextPage.bind(this));

            this.btnPrev = this.createSVGIcon('next', true);
            this.$arrowWrapper.appendChild(this.btnPrev);
            this.btnPrev.style.height = o.arrowSize + 'px';
            this.btnPrev.style.fontSize = o.arrowSize + 'px';
            this.btnPrev.style.marginTop = String(-o.arrowSize / 2) + 'px';
            this.btnPrev.style.marginLeft = o.arrowMargin + 'px';
            this.btnPrev.classList.add('flipbook-left-arrow');
            initButton(this.btnPrev, this.prevPage.bind(this));

            if (o.btnFirst.enabled) {
                this.btnFirst = this.createSVGIcon('last', true);
                this.$arrowWrapper.appendChild(this.btnFirst);
                this.btnFirst.style.height = o.arrowSize * 0.5 + 'px';
                this.btnFirst.style.fontSize = o.arrowSize * 0.5 + 'px';
                this.btnFirst.style.marginTop = String(o.arrowSize / 2 + o.arrowMargin + 2 * o.arrowPadding) + 'px';
                this.btnFirst.style.marginLeft = o.arrowMargin + 'px';
                this.btnFirst.classList.add('flipbook-first-arrow');
                initButton(this.btnFirst, this.firstPage.bind(this));
            }

            if (o.btnLast.enabled) {
                this.btnLast = this.createSVGIcon('last');
                this.$arrowWrapper.appendChild(this.btnLast);
                this.btnLast.style.height = o.arrowSize * 0.5 + 'px';
                this.btnLast.style.fontSize = o.arrowSize * 0.5 + 'px';
                this.btnLast.style.marginTop = String(o.arrowSize / 2 + o.arrowMargin + 2 * o.arrowPadding) + 'px';
                this.btnLast.style.marginRight = o.arrowMargin + 'px';
                this.btnLast.classList.add('flipbook-last-arrow');
                initButton(this.btnLast, this.lastPage.bind(this));
            }

            if (!o.menuNavigationButtons) {
                if (o.btnOrder.indexOf('btnFirst') >= 0) {
                    o.btnOrder.splice(o.btnOrder.indexOf('btnFirst'), 1);
                }
                if (o.btnOrder.indexOf('btnPrev') >= 0) {
                    o.btnOrder.splice(o.btnOrder.indexOf('btnPrev'), 1);
                }
                if (o.btnOrder.indexOf('btnNext') >= 0) {
                    o.btnOrder.splice(o.btnOrder.indexOf('btnNext'), 1);
                }
                if (o.btnOrder.indexOf('btnLast') >= 0) {
                    o.btnOrder.splice(o.btnOrder.indexOf('btnLast'), 1);
                }
            }
        }

        if (o.pdfMode && !o.btnDownloadPdf.url) {
            o.btnDownloadPdf.url = o.pdfUrl;
        }

        if (!o.pdfTextLayer && o.btnSearch) {
            o.btnSearch.enabled = false;
        }

        for (var i = 0; i < o.btnOrder.length; i++) {
            var btnName = o.btnOrder[i];
            var btn = o[btnName];

            if (o.isMobile && btn.hideOnMobile) {
                btn.enabled = false;
            }

            if (btn.enabled) {
                btn.name = btnName;
                if (btn.name === 'currentPage') {
                    this.createCurrentPage();
                } else if (btn.name === 'search') {
                    
                    this.$search = document.createElement('div');
                    this.$search.className = 'flipbook-findbar';
                    this.$search.innerHTML =
                        '<div>' +
                        '<input class="toolbarField skin-color skin-color-bg" title="Find" autocapitalize="none" placeholder="' +
                        o.strings.findInDocument +
                        '...">' +
                        '</div>' +
                        '<div class="flipbook-find-info skin-color"></div>';

                    this.menuTL.appendChild(this.$search);

                    var searchInput = this.$search.querySelector('input');
                    searchInput.addEventListener('change', function () {
                        self.toggleSearch(true);
                        self.thumbs.$findInput.value = this.value;
                        var event = new Event('keyup');
                        self.thumbs.$findInput.dispatchEvent(event);
                        this.value = '';
                    });

                    this.menuTL.style.flexDirection = 'column';
                    this.menuTL.style.alignItems = 'flex-start';
                    
                } else {
                    this[btnName] = this.createButton(btn);
                    this[btnName].addEventListener('click', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        self.onButtonClick(this, e);
                    });
                }
            }
        }

        if (o.buttons) {
            o.buttons.forEach((newButton) => {
                self.createButton(newButton).index(1);
            });
        }

        if (this.btnSingle) this.toggleIcon(this.btnSingle, this.options.singlePageMode);
    },

    onButtonClick: function (btn, _) {
        var name = btn.dataset.name;
        var o = this.options;

        switch (name) {
            case 'btnFirst':
                this.firstPage();
                break;
            case 'btnPrev':
                this.prevPage();
                break;
            case 'btnNext':
                this.nextPage();
                break;
            case 'btnLast':
                this.lastPage();
                break;
            case 'btnZoomIn':
                this.zoomIn();
                break;
            case 'btnZoomOut':
                this.zoomOut();
                break;
            case 'btnAutoplay':
                if (!this.autoplay) {
                    this.nextPage();
                }
                this.toggleAutoplay();
                break;
            case 'btnSearch':
                this.toggleSearch();
                break;
            case 'btnBookmark':
                this.toggleBookmark();
                break;
            case 'btnRotateLeft':
                if (this.Book.rotateLeft) {
                    this.Book.rotateLeft();
                }
                break;
            case 'btnRotateRight':
                if (this.Book.rotateRight) {
                    this.Book.rotateRight();
                }
                break;
            case 'btnToc':
                this.toggleToc();
                break;
            case 'btnThumbs':
                this.toggleThumbs();
                break;
            case 'btnShare':
                this.toggleShareMenu();
                break;
            case 'btnTools':
                this.toggleToolsMenu();
                break;
            case 'btnNotes':
                this.toggleNotesMenu();
                break;
            case 'btnDownloadPages':
                if (o.downloadMenu) {
                    this.toggleDownloadMenu();
                } else {
                    var link = document.createElement('a');
                    link.href = o.btnDownloadPages.url;
                    link.download = o.btnDownloadPages.name;
                    link.dispatchEvent(new MouseEvent('click'));
                }

                break;

            case 'btnPrint':
                if (o.printMenu) {
                    this.togglePrintMenu();
                } else {
                    this.togglePrintWindow();
                }

                break;

            case 'btnDownloadPdf':
                if (o.btnDownloadPdf.forceDownload) {
                    var path = o.btnDownloadPdf.url;
                    var save = document.createElement('a');
                    save.href = path;
                    var filename = save.href.split('/').pop().split('#')[0].split('?')[0];
                    save.download = filename;
                    document.body.appendChild(save);
                    save.click();
                    document.body.removeChild(save);
                } else {
                    var target =
                        o.btnDownloadPdf.openInNewWindow || typeof (o.btnDownloadPdf.openInNewWindow == 'undefined')
                            ? '_blank'
                            : '_self';
                    window.open(o.btnDownloadPdf.url, target);
                }

                this.sendGAEvent({
                    event: 'flipbook_pdf_download',
                    book_name: this.options.name,
                    url: o.btnDownloadPdf.url || o.pdfUrl,
                    nonInteraction: true,
                });

                break;

            case 'btnSound':
                this.toggleSound();
                break;
            case 'btnExpand':
                this.toggleExpand();
                break;
            case 'btnSingle':
                this.toggleSinglePage();
                break;
            case 'btnClose':
                this.lightbox.closeLightbox();
                break;
        }
    },

    handleFsChange: function () {
        if (!this.Book || !this.Book.enabled) {
            return;
        }

        var currentFullscreenElement =
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement;
        if (currentFullscreenElement === this.fullscreenElement || this.isFullscreen) {
            this.fullscreenActive = true;

            if (this.options.onfullscreenenter) {
                this.options.onfullscreenenter.call(this);
            }
            document.body.classList.add('flipbook-fullscreen');
        } else {
            this.fullscreenActive = false;
            if (this.options.onfullscreenexit) {
                this.options.onfullscreenexit.call(this);
            }
            document.body.classList.remove('flipbook-fullscreen');
        }

        this.toggleIcon(this.btnExpand, !this.fullscreenActive);
    },

    createLogo: function () {
        var o = this.options;
        if (!o.logoImg) {
            return;
        }
        if (o.isMobile && o.logoHideOnMobile) {
            return;
        }

        var $logo = jQuery('<img>').attr('src', o.logoImg).attr('style', o.logoCSS).appendTo(this.wrapper);

        if (o.logoAlignH == 'right') {
            $logo.css('right', '0');
        }
        if (o.logoAlignV == 'bottom') {
            $logo.css('bottom', '0');
        }

        if (o.logoUrl) {
            $logo.css('cursor', 'pointer').bind('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
                window.open(o.logoUrl, o.logoUrlTarget || '_blank');
            });
        }
    },

    setLoadingProgress: function (percent) {
        if (this.disposed) {
            return;
        }

        if (this.$fillPreloader) {
            this.setFillPreloaderProgress(percent);
        } else {
            if (percent > 0 && percent < 1) {
                this.preloader.classList.remove('flipbook-hidden');
            } else {
                this.preloader.classList.add('flipbook-hidden');
            }
        }
    },

    setFillPreloaderProgress: function (percent) {
        if (!this.$fillPreloader) {
            return;
        }

        if (percent > 0 && percent < 1) {
            this.fillPreloaderProgress = this.fillPreloaderProgress || 0;

            if (percent < this.fillPreloaderProgress) {
                return;
            } else {
                this.fillPreloaderProgress = percent;
            }
            var img = this.$fillPreloaderImg[0];
            img.style.clip = 'rect(0px,' + img.width * percent + 'px,' + img.height + 'px,0px)';
            this.$fillPreloader.show();
        } else {
            this.$fillPreloader.hide();
        }
    },

    playFlipSound: function () {
        if (this.options.sound && this.Book.enabled && typeof this.flipSound.play != 'undefined') {
            this.flipSound.currentTime = 0;

            var self = this;

            setTimeout(function () {
                self.flipSound.play().then(
                    function () {},
                    function () {}
                );
            }, 70);
        }
    },

    playBgMusic: function () {
        if (this.options.sound && this.backgroundMusic && this.backgroundMusic.play) {
            var self = this;
            this.backgroundMusic.play().then(
                function () {},
                function (_) {
                    setTimeout(function () {
                        self.playBgMusic();
                    }, 100);
                }
            );
        }
    },

    onMouseWheel: function (e) {
        if ('wheelDeltaX' in e) {
            wheelDeltaX = e.wheelDeltaX / 12;
            wheelDeltaY = e.wheelDeltaY / 12;
        } else if ('wheelDelta' in e) {
            wheelDeltaX = wheelDeltaY = e.wheelDelta / 12;
        } else if ('detail' in e) {
            wheelDeltaX = wheelDeltaY = -e.detail * 3;
        } else {
            return;
        }
        if (wheelDeltaX > 0) {
            this.zoomIn(e);
        } else {
            this.zoomOut(e);
        }
    },

    zoomTo: function (val, time, e) {
        this.zoom = val;

        var x;
        var y;

        if (typeof e == 'undefined') {
            x = this.wrapperW / 2;
            y = this.wrapperH / 2;
        } else {
            if (e.touches && e.touches[0]) {
                x = e.touches[0].pageX;
                y = e.touches[0].pageY;
            } else if (e.changedTouches && e.changedTouches[0]) {
                x = e.changedTouches[0].pageX;
                y = e.changedTouches[0].pageY;
            } else {
                x = e.pageX;
                y = e.pageY;
            }

            let wrapperRect = this.wrapper.getBoundingClientRect();
            x = x - wrapperRect.left - window.scrollX;
            y = y - wrapperRect.top - window.scrollY;
        }

        const zoomMin = this.getZoomMin();

        if (this.zoom < zoomMin) {
            this.zoom = zoomMin;
        }
        if (this.zoom > this.options.zoomMax) {
            this.zoom = this.options.zoomMax;
        }

        if (this.options.zoomMax2 && this.zoom > this.options.zoomMax2) {
            this.zoom = this.options.zoomMax2;
        }

        this.Book.zoomTo(this.zoom, time, x, y);

        this.onZoom(this.zoom);
    },

    zoomOut: function (e) {
        var newZoom = this.zoom - this.options.zoomStep * 0.5;
        if (newZoom < 1 && this.zoom > 1) {
            newZoom = 1;
        }
        const zoomMin = this.getZoomMin();
        newZoom = newZoom < zoomMin ? zoomMin : newZoom;

        if (this.zoom == newZoom) {
            return;
        }

        this.zoom = newZoom;

        var t = this.options.zoomTime;

        this.zoomTo(this.zoom, t, e);
    },

    zoomIn: function (e) {
        var newZoom = this.zoom + this.options.zoomStep * 0.5;
        if (newZoom > 1 && this.zoom < 1) {
            newZoom = 1;
        }

        if (newZoom > this.options.zoomMax) {
            newZoom = this.options.zoomMax;
        }

        if (this.zoom == newZoom) {
            return;
        }

        this.zoom = newZoom;

        this.zoomTo(this.zoom, this.options.zoomTime, e);
    },

    getZoomMin: function () {
        return this.options.viewMode == 'scroll' ? this.options.zoomMin2 : this.options.zoomMin;
    },

    nextPage: function () {
        if (!this.Book) {
            return;
        }
        this.flippingPage = true;
        if (this.nextEnabled) {
            this.Book.nextPage();
            window.getSelection().removeAllRanges();
        }
    },

    prevPage: function () {
        if (!this.Book) {
            return;
        }
        this.flippingPage = true;
        if (this.prevEnabled) {
            this.Book.prevPage();
            window.getSelection().removeAllRanges();
        }
    },

    firstPage: function () {
        this.goToPage(1);
    },

    lastPage: function () {
        this.goToPage(this.options.pages.length);
    },

    goToPage: function (pageNumber, instant) {
        if (!this.Book) {
            return;
        }

        if (!instant) {
            this.flippingPage = true;
        }

        if (!this.options.cover) {
            pageNumber++;
        }

        if (pageNumber < 1) {
            pageNumber = 1;
        } else if (pageNumber > this.options.numPages && !this.options.rightToLeft) {
            pageNumber = this.options.numPages;
        }

        this.Book.goToPage(pageNumber, instant);
        window.getSelection().removeAllRanges();
    },

    moveBook: function (direction) {
        if (this.Book && this.Book.move) {
            this.Book.move(direction);
        }
    },

    onZoom: function (newZoom) {
        this.zoom = newZoom;
        const zoomMin = this.getZoomMin();
        this.enableButton(this.btnZoomIn, newZoom < this.options.zoomMax);
        this.enableButton(this.btnZoomOut, newZoom > zoomMin);
        this.enableSwipe(newZoom <= 1);
    },

    enableSwipe: function (val) {
        this.swipeEnabled = val;
    },

    createCurrentPage: function () {
        var self = this;
        var o = this.options;
        var menu;
        var cssClass = 'flipbook-currentPageHolder ';

        if (o.currentPage.vAlign == 'top') {
            if (o.currentPage.hAlign == 'left') {
                menu = this.menuTL;
            } else if (o.currentPage.hAlign == 'right') {
                menu = this.menuTR;
            } else {
                menu = this.menuTC;
            }
        } else {
            if (o.currentPage.hAlign == 'left') {
                menu = this.menuBL;
            } else if (o.currentPage.hAlign == 'right') {
                menu = this.menuBR;
            } else {
                menu = this.menuBC;
            }
        }

        var floating =
            (o.currentPage.vAlign == 'top' && o.menu2Transparent) ||
            (o.currentPage.vAlign != 'top' && o.menuTransparent);
        var bgColor = floating ? o.floatingBtnBackground : '';
        var color = floating ? o.floatingBtnColor : o.btnColor;
        var textShadiw = floating ? o.floatingBtnTextShadow : '';
        var radius = floating ? o.floatingBtnRadius : o.btnRadius;
        var currentPageHolder = document.createElement('div');
        menu.appendChild(currentPageHolder);

        currentPageHolder.style.margin = o.currentPage.marginV + 'px ' + o.currentPage.marginH + 'px';
        currentPageHolder.style.height = o.btnSize + 'px';
        currentPageHolder.style.padding = o.btnPaddingV + 'px';

        if (!floating) {
            cssClass += ' skin-color';
        }
        currentPageHolder.className = cssClass;
        currentPageHolder.style.color = color;
        currentPageHolder.style.background = bgColor;
        currentPageHolder.style.textShadow = textShadiw;
        currentPageHolder.style.borderRadius = radius + 'px';

        if (o.currentPage.order) {
            currentPageHolder.style.order = o.currentPage.order;
        }

        this.currentPageHolder = currentPageHolder;

        var form = document.createElement('form');
        currentPageHolder.appendChild(form);

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var value = parseInt(self.currentPageInput.value, 10);
            if (self.options.rightToLeft) {
                value = o.pages.length - value + 1;
                value -= self.options.pageNumberOffset;
            } else {
                value = Math.min(value, o.pages.length);
                value += self.options.pageNumberOffset;
            }
            self.goToPage(value);
            return false;
        });

        this.currentPageInput = document.createElement('input');
        this.currentPageInput.type = 'text';
        this.currentPageInput.className = 'flipbook-currentPageInput';
        this.currentPageInput.style.margin = o.currentPage.marginV + 'px ' + o.currentPage.marginH + 'px';
        this.currentPageInput.style.color = color;

        this.currentPageInput.addEventListener('focus', function () {
            self.currentPageInput.value = '';
        });

        var restTime = null;
        this.currentPageInput.addEventListener('blur', function () {
            self.currentPageInput.value = self.currentPageString;

            clearTimeout(restTime);

            restTime = setTimeout(() => {

                let lastViewPageData = JSON.parse(localStorage.getItem('bookLastPage')) || [];

                // Check if the object with bookId already exists in the array
                let found = false;
                for (let i = 0; i < lastViewPageData.length; i++) {
                    if (lastViewPageData[i][bookId] !== undefined) {
                        // If the key exists, update its value
                        lastViewPageData[i][bookId] = self.currentPageInput.value.split('-')[0];
                        found = true;
                        break;
                    }
                }

                // If the bookId does not exist, add a new object to the array
                if (!found) {
                    lastViewPageData.push({
                        [bookId]: self.currentPageInput.value.split('-')[0]
                    });
                }

                localStorage.setItem('bookLastPage', JSON.stringify(lastViewPageData));
                
            }, 2000);
        });

        form.appendChild(this.currentPageInput);

        var digits = String(o.numPages).length;
        this.currentPageInput.classList.add('digits-' + digits);
        this.currentPageInput.setAttribute('maxlength', digits);

        this.currentPage = document.createElement('div');
        this.currentPage.className = 'flipbook-currentPageNumber';
        currentPageHolder.appendChild(this.currentPage);

        if (!floating) {
            this.currentPageInput.classList.add('skin-color');
        }
    },

    createMenuHeader: function (el, title, _) {
        var header = document.createElement('div');
        header.className = 'flipbook-menu-header skin-clor flipbook-font';
        el.appendChild(header);

        var titleSpan = document.createElement('span');
        titleSpan.textContent = title;
        titleSpan.className = 'flipbook-menu-title skin-color';
        header.appendChild(titleSpan);

        var btnClose = document.createElement('span');
        btnClose.className = 'flipbook-btn-close skin-color skin-color-bg';
        header.appendChild(btnClose);
        btnClose.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.closeMenus();
        });

        var closeIcon = this.createSVGIcon('close');
        btnClose.appendChild(closeIcon);
    },

    createToc: function () {
        var tocArray = this.options.tableOfContent;

        this.tocHolder = document.createElement('div');
        this.tocHolder.className = 'flipbook-tocHolder flipbook-side-menu skin-color-bg';
        this.wrapper.appendChild(this.tocHolder);
        this.tocHolder.style[this.options.sideMenuPosition] = '0';
        this.tocHolder.classList.add('flipbook-hidden');

        this.createMenuHeader(this.tocHolder, this.strings.tableOfContent, this.toggleToc);

        this.toc = document.createElement('div');
        this.toc.className = 'flipbook-toc';
        this.tocHolder.appendChild(this.toc);

        var arr = this.options.pages;

        if (!tocArray || !tocArray.length) {
            tocArray = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].title) {
                    tocArray.push({
                        title: arr[i].title,
                        page: String(i + 1),
                        pageNumberDisplay: arr[i].name,
                    });
                }
            }
        }

        for (var i = 0; i < tocArray.length; i++) {
            if (arr[i] && arr[i].name && tocArray[i].page) {
                tocArray[i].pageNumberDisplay = arr[tocArray[i].page - 1].name;
            }
        }

        var iconExpand = this.createSVGIcon('next');

        this.tocScroller = this.buildTOC(tocArray);
        this.tocScroller.className = 'flipbook-toc-scroller';
        this.toc.appendChild(this.tocScroller);

        this.initColors();
        this.tocCreated = true;
        this.toggleToc();
    },

    buildTOC: function (items) {
        const self = this;
        const ul = document.createElement('ul');
        const expandSvg = this.createSVGIcon('next');

        items.forEach((item) => {
            const li = document.createElement('li');

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('toc-item', 'skin-color');

            const titleContainer = document.createElement('div');
            titleContainer.classList.add('title-container');

            if (item.items && item.items.length > 0) {
                const expandIcon = document.createElement('span');
                expandIcon.classList.add('expand-icon');

                expandIcon.innerHTML = expandSvg.outerHTML;

                expandIcon.addEventListener('click', function (event) {
                    event.stopPropagation();
                    const subUl = li.querySelector('ul');
                    if (subUl.style.display === 'none') {
                        subUl.style.display = 'block';
                        expandIcon.classList.add('expanded');
                    } else {
                        subUl.style.display = 'none';
                        expandIcon.classList.remove('expanded');
                    }
                });

                titleContainer.appendChild(expandIcon);
            } else {
                const spacer = document.createElement('span');
                spacer.classList.add('spacer');
                spacer.innerHTML = '&nbsp;';
                titleContainer.appendChild(spacer);
            }

            const titleSpan = document.createElement('span');
            titleSpan.textContent = item.title;
            titleSpan.classList.add('title');
            titleContainer.appendChild(titleSpan);

            itemDiv.appendChild(titleContainer);

            const pageSpan = document.createElement('span');
            pageSpan.textContent = item.pageNumberDisplay || item.page;
            pageSpan.classList.add('page-number');
            itemDiv.appendChild(pageSpan);

            itemDiv.addEventListener('click', function (e) {
                e.stopPropagation();
                e.preventDefault();

                if (self.options.tableOfContentCloseOnClick) {
                    self.toggleToc(false);
                }

                if (!item.page && item.dest) {
                    if (typeof item.dest === 'string') {
                        self.pdfService.pdfDocument.getDestination(item.dest).then(function (destArray) {
                            self.goToDest(destArray);
                        });
                    } else {
                        self.goToDest(item.dest);
                    }
                } else {
                    var targetPage = Number(item.page);

                    targetPage = self.options.rightToLeft ? self.options.pages.length - targetPage + 1 : targetPage;

                    setTimeout(function () {
                        self.goToPage(targetPage);
                    }, 200);
                }
            });

            li.appendChild(itemDiv);

            if (item.items && item.items.length > 0) {
                const subUl = this.buildTOC(item.items);
                subUl.style.display = 'none';
                li.appendChild(subUl);
            }

            ul.appendChild(li);
        });

        return ul;
    },

    goToDest: function (destArray) {
        
        var self = this;
        self.pdfService.pdfDocument.getPageIndex(destArray[0]).then(function (index) {
            var targetPage = index + 1;

            if (self.options.doublePage) {
                targetPage = 2 * targetPage - 1;
            }

            targetPage = self.options.rightToLeft ? self.options.pages.length - targetPage + 1 : targetPage;

            setTimeout(function () {
                self.goToPage(targetPage);
            }, 200);
        });
        
    },

    enablePrev: function (val) {
        this.enableButton(this.btnPrev, val);
        this.enableButton(this.btnFirst, val);
        this.prevEnabled = val;
        this.Book.enablePrev(val);
    },

    enableNext: function (val) {
        this.enableButton(this.btnNext, val);
        this.enableButton(this.btnLast, val);
        this.nextEnabled = val;
        this.Book.enableNext(val);
    },

    enableButton: function (button, enabled) {
        if (typeof button === 'undefined') {
            return;
        }

        if (enabled) {
            button.classList.remove('disabled');
        } else {
            button.classList.add('disabled');
        }

        button.enabled = enabled;
    },

    resize: function (force) {
        var o = this.options;

        this.updateWrapperDimensions();

        if (!this.Book || !this.Book.enabled) {
            return;
        }

        if (this.menuShowing) {
            this.bookLayer.style.bottom =
                !o.menuOverBook && this.menuBottom ? this.menuBottom.offsetHeight + 'px' : '0px';
            this.bookLayer.style.top = !o.menu2OverBook && this.menuTop ? this.menuTop.offsetHeight + 'px' : '0px';
        }

        if (this.tocShowing || this.thumbsShowing || this.searchShowing || this.bookmarkShowing) {
            var sidebarWdith = this.tocShowing
                ? this.tocHolder.getBoundingClientRect().width
                : this.thumbsShowing && this.options.thumbsStyle === 'overlay'
                  ? 0
                  : this.thumbs.thumbHolder.getBoundingClientRect().width;

            this.bookLayer.style[this.options.sideMenuPosition] = `${sidebarWdith}px`;
            let sideMenuCss = { bottom: '0px', top: '0px' };
            if (!o.sideMenuOverMenu) {
                sideMenuCss.bottom = this.menuBottom.offsetHeight + 'px';
            }
            if (!o.sideMenuOverMenu2) {
                sideMenuCss.top = this.menuTop.offsetHeight + 'px';
            }

            var sideMenus = this.wrapper.querySelectorAll('.flipbook-side-menu');

            sideMenus.forEach(function (element) {
                for (var property in sideMenuCss) {
                    if (sideMenuCss.hasOwnProperty(property)) {
                        element.style[property] = sideMenuCss[property];
                    }
                }
            });
        } else {
            this.bookLayer.style[this.options.sideMenuPosition] = '0px';
        }

        this.adjustZoomLimits();

        this.Book.onResize(force);
        if (o.zoomReset) {
            this.Book.zoomTo(o.zoomMin);
        }
    },

    updateWrapperDimensions: function () {
        let rect = this.bookLayer.getBoundingClientRect();
        this.wrapperW = rect.width;
        this.wrapperH = rect.height;
    },

    adjustZoomLimits: function () {
        var o = this.options;
        var wrapperRatio = this.wrapperW / this.wrapperH;
        var pageRatio = this.pageW / this.pageH;
        var bookRatio = 2 * pageRatio;

        if (o.viewMode == 'scroll') {
            o.zoomMax = (2 * ((o.zoomSize * o.pageWidth) / o.pageHeight)) / this.wrapperW;
        } else if (
            o.responsiveView &&
            this.wrapperW <= o.responsiveViewTreshold &&
            wrapperRatio < bookRatio &&
            wrapperRatio < o.responsiveViewRatio
        ) {
            o.zoomMax = (o.zoomSize / this.wrapperH) * (wrapperRatio > pageRatio ? 1 : pageRatio / wrapperRatio);
        } else {
            o.zoomMax = (o.zoomSize / this.wrapperH) * (wrapperRatio > bookRatio ? 1 : bookRatio / wrapperRatio);
        }

        o.zoomMax = Math.max(o.zoomMax, o.zoomMin);
    },

    pdfResize: function () {
        var self = this;
        self.Book.onZoom();
    },

    createThumbs: function () {
        this.thumbs = new FLIPBOOK.Thumbnails(this);
    },

    toggleThumbs: function (value) {
        if (!this.thumbs) {
            this.createThumbs();
        }

        if (typeof value != 'undefined') {
            this.thumbsShowing = !value;
        }

        if (!this.thumbsShowing) {
            this.closeMenus();
            this.thumbs.show();
            this.thumbsShowing = true;
        } else {
            this.thumbs.hide();
            this.thumbsShowing = false;
        }

        this.resize();
    },

    toggleToc: function (value) {
        if (!this.tocCreated) {
            this.createToc();
            return;
        }

        if (!this.tocShowing || value) {
            this.closeMenus();
            this.tocShowing = true;
            this.tocHolder.classList.remove('flipbook-hidden');
        } else {
            this.tocHolder.classList.add('flipbook-hidden');
            this.tocShowing = false;
        }

        this.resize();
    },

    toggleSearch: function (value) {
        
        if (!this.thumbs) {
            this.createThumbs();
        }

        if (typeof value != 'undefined') {
            this.searchShowing = !value;
        }

        if (!this.searchShowing) {
            this.closeMenus();
            this.thumbs.show();
            this.thumbs.showSearch();
            this.searchShowing = true;
        } else {
            this.thumbs.hide();
            this.searchShowing = false;
            this.unmark();
        }

        this.resize();
        
    },

    toggleBookmark: function (value) {
        
        if (!this.thumbs) {
            this.createThumbs();
        }

        if (typeof value != 'undefined') {
            this.bookmarkShowing = !value;
        }

        if (!this.bookmarkShowing) {
            this.closeMenus();
            this.thumbs.show();
            this.thumbs.showBookmarks();
            this.bookmarkShowing = true;
        } else {
            this.thumbs.hide();
            this.bookmarkShowing = false;
        }

        this.resize();
        
    },

    closeMenus: function () {
        if (this.thumbsShowing) {
            this.toggleThumbs();
        }
        if (this.tocShowing) {
            this.toggleToc();
        }
        if (this.searchShowing) {
            this.toggleSearch();
        }
        if (this.bookmarkShowing) {
            this.toggleBookmark();
        }

        if (this.printMenuShowing) {
            this.togglePrintMenu();
        }
        if (this.dlMenuShowing) {
            this.toggleDownloadMenu();
        }
        if (this.shareMenuShowing) {
            this.toggleShareMenu();
        }
        if (this.toolsMenuShowing) {
            this.toggleToolsMenu();
        }
        if (this.notesMenuShowing) {
            this.toggleNotesMenu();
        }
        if (this.passwordMenuShowing) {
            this.togglePasswordMenu();
        }
    },

    toggleToolsMenu: function () {
        var self = this;

        if (!this.toolsMenu.parentNode) {
            this.btnTools.appendChild(this.toolsMenu);
            this.initColors();
            this.closeMenus();
            this.toolsMenu.classList.remove('flipbook-hidden');
            this.btnTools.classList.add('flipbook-btn-active');
            this.btnTools.classList.remove('flipbook-has-tooltip');
            this.toolsMenuShowing = true;

            this.toolsMenu.addEventListener('click', function (event) {
                event.stopPropagation();
            });

            document.addEventListener('click', function (event) {
                if (self.toolsMenuShowing) {
                    self.toggleToolsMenu();
                }
                if (self.shareMenuShowing) {
                    self.toggleShareMenu();
                }
            });
        } else if (!this.toolsMenuShowing) {
            this.closeMenus();
            this.toolsMenu.classList.remove('flipbook-hidden');
            this.toolsMenuShowing = true;
            this.btnTools.classList.add('flipbook-btn-active');
            this.btnTools.classList.remove('flipbook-has-tooltip');
        } else {
            this.toolsMenu.classList.add('flipbook-hidden');
            this.toolsMenuShowing = false;
            this.btnTools.classList.remove('flipbook-btn-active');
            this.btnTools.classList.add('flipbook-has-tooltip');
        }
    },

    togglePrintMenu: function () {
        var self = this;

        if (!this.printMenu) {
            this.printMenu = document.createElement('div');
            this.printMenu.className = 'flipbook-sub-menu flipbook-font';
            this.wrapper.appendChild(this.printMenu);

            var center = document.createElement('div');
            center.className = 'flipbook-sub-menu-center';
            this.printMenu.appendChild(center);

            var content = document.createElement('div');
            content.className = 'flipbook-sub-menu-content skin-color-bg';
            center.appendChild(content);

            this.createMenuHeader(content, this.strings.print, this.togglePrintMenu.bind(this));

            var currentPageButton = document.createElement('a');
            currentPageButton.innerHTML =
                '<div class="c-p skin-color flipbook-btn">' + this.strings.printCurrentPage + '</div>';
            content.appendChild(currentPageButton);
            currentPageButton.addEventListener('click', function () {
                self.printPage(self.cPage[0], this);
            });

            var leftPageButton = document.createElement('a');
            leftPageButton.innerHTML =
                '<div class="c-l-p skin-color flipbook-btn">' + this.strings.printLeftPage + '</div>';
            content.appendChild(leftPageButton);
            leftPageButton.addEventListener('click', function () {
                self.printPage(self.cPage[0], this);
            });

            var rightPageButton = document.createElement('a');
            rightPageButton.innerHTML =
                '<div class="c-r-p skin-color flipbook-btn">' + this.strings.printRightPage + '</div>';
            content.appendChild(rightPageButton);
            rightPageButton.addEventListener('click', function () {
                self.printPage(self.cPage[1], this);
            });

            var allPagesButton = document.createElement('a');
            allPagesButton.innerHTML = '<div class="skin-color flipbook-btn">' + this.strings.printAllPages + '</div>';
            content.appendChild(allPagesButton);
            allPagesButton.addEventListener('click', function () {
                self.togglePrintWindow();
            });

            this.closeMenus();
            this.printMenuShowing = true;
            this.initColors();
            this.updateCurrentPage();
        } else if (!this.printMenuShowing) {
            this.closeMenus();
            this.printMenu.style.display = 'block';
            this.printMenuShowing = true;
            this.updateCurrentPage();
        } else {
            this.printMenu.style.display = 'none';
            this.printMenuShowing = false;
        }
    },

    toggleDownloadMenu: function () {
        
        var self = this;

        if (!this.dlMenu) {
            this.dlMenu = document.createElement('div');
            this.dlMenu.className = 'flipbook-sub-menu flipbook-font';
            this.wrapper.appendChild(this.dlMenu);

            var center = document.createElement('div');
            center.className = 'flipbook-sub-menu-center';
            this.dlMenu.appendChild(center);

            var content = document.createElement('div');
            content.className = 'flipbook-sub-menu-content skin-color-bg';
            center.appendChild(content);

            this.createMenuHeader(content, this.strings.download, this.toggleDownloadMenu.bind(this));

            var currentPageButton = document.createElement('a');
            currentPageButton.innerHTML =
                '<div class="c-p skin-color flipbook-btn">' + this.strings.downloadCurrentPage + '</div>';
            content.appendChild(currentPageButton);
            currentPageButton.addEventListener('click', function () {
                self.downloadPage(self.cPage[0], this);
            });

            var leftPageButton = document.createElement('a');
            leftPageButton.innerHTML =
                '<div class="c-l-p skin-color flipbook-btn">' + this.strings.downloadLeftPage + '</div>';
            content.appendChild(leftPageButton);
            leftPageButton.addEventListener('click', function () {
                self.downloadPage(self.cPage[0], this);
            });

            var rightPageButton = document.createElement('a');
            rightPageButton.innerHTML =
                '<div class="c-r-p skin-color flipbook-btn">' + this.strings.downloadRightPage + '</div>';
            content.appendChild(rightPageButton);
            rightPageButton.addEventListener('click', function () {
                self.downloadPage(self.cPage[1], this);
            });

            var allPagesButton = document.createElement('a');
            allPagesButton.innerHTML =
                '<div class="skin-color flipbook-btn">' + this.strings.downloadAllPages + '</div>';
            content.appendChild(allPagesButton);
            allPagesButton.addEventListener('click', function () {
                var link = document.createElement('a');
                link.href = self.options.btnDownloadPages.url;
                var filename = link.href.split('/').pop().split('#')[0].split('?')[0];
                link.download = filename;
                link.dispatchEvent(new MouseEvent('click'));
            });

            this.closeMenus();
            this.dlMenuShowing = true;
            this.initColors();
            this.updateCurrentPage();
        } else if (!this.dlMenuShowing) {
            this.closeMenus();
            this.dlMenu.style.display = 'block';
            this.dlMenuShowing = true;
            this.updateCurrentPage();
        } else {
            this.dlMenu.style.display = 'none';
            this.dlMenuShowing = false;
        }
        
    },

    toggleShareMenu: function () {
        var self = this;
        if (!this.shareMenu.parentNode) {
            this.btnShare.appendChild(this.shareMenu);
            this.initColors();
            this.closeMenus();
            this.shareMenu.classList.remove('flipbook-hidden');
            this.shareMenu.classList.add('flipbook-btn-active');
            this.shareMenu.classList.remove('flipbook-has-tooltip');
            this.shareMenuShowing = true;

            this.shareMenu.addEventListener('click', function (event) {
                event.stopPropagation();
            });

            document.addEventListener('click', function (event) {
                if (self.toolsMenuShowing) {
                    self.toggleToolsMenu();
                }
                if (self.shareMenuShowing) {
                    self.toggleShareMenu();
                }
            });

            var o = this.options;
            var networks = ['facebook', 'twitter'];

            
            networks.push('pinterest', 'linkedin', 'whatsapp', 'digg', 'reddit', 'email');
            

            var left = window.screen.width / 2 - 300;
            var top = window.screen.height / 2 - 300;

            networks.forEach(function (network) {
                if (o[network].enabled) {
                    var btn = document.createElement('span');
                    btn.className = 'flipbook-menu-btn-wrapper flipbook-has-tooltip';
                    btn.setAttribute('data-network', network);
                    btn.setAttribute('data-tooltip', o[network].title);

                    let svg = self.createSVGIcon(network);
                    btn.appendChild(svg);

                    self.shareMenu.appendChild(btn);

                    btn.addEventListener('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();

                        var network = this.dataset.network;
                        var text = encodeURIComponent(
                            o.shareTitle || o[network].description || 'Check out this flipbook'
                        );
                        var url = encodeURIComponent(o.shareUrl || window.location.href);
                        var image = encodeURIComponent(o.shareImage || '');
                        var shareUrl;

                        switch (network) {
                            case 'facebook':
                                shareUrl = 'https://www.facebook.com/sharer.php?u=' + url + '&t=' + text;
                                break;
                            case 'twitter':
                                shareUrl = 'https://twitter.com/intent/tweet?text=' + text + '&url=' + url;
                                break;
                            
                            case 'linkedin':
                                shareUrl =
                                    'https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + text;
                                break;
                            case 'pinterest':
                                shareUrl =
                                    'https://www.pinterest.com/pin/create/button/?url=' +
                                    url +
                                    '&media=' +
                                    image +
                                    '&description=' +
                                    text;
                                break;
                            case 'email':
                                shareUrl = 'mailto:?subject=' + text + '&body=' + url;
                                break;
                            case 'digg':
                                shareUrl = 'http://digg.com/submit?url=' + url + '&title=' + text;
                                break;
                            case 'reddit':
                                shareUrl = 'http://reddit.com/submit?url=' + url + '&title=' + text;
                                break;
                            case 'whatsapp':
                                shareUrl = o.isMobile
                                    ? 'whatsapp://send?text=' + text + '%20' + url
                                    : 'https://wa.me?text=' + text + '%20' + url;
                                break;
                            
                        }

                        window.open(
                            shareUrl,
                            'Share',
                            'toolbar=no, location=no, directories=no, status=no, ' +
                                'menubar=no, scrollbars=no, resizable=no, copyhistory=no, ' +
                                'width=600, height=600, top=' +
                                top +
                                ', left=' +
                                left
                        );
                    });
                }
            });
        } else if (!this.shareMenuShowing) {
            this.closeMenus();
            this.shareMenu.classList.remove('flipbook-hidden');
            this.shareMenuShowing = true;
            this.btnShare.classList.add('flipbook-btn-active');
            this.btnShare.classList.remove('flipbook-has-tooltip');
        } else {
            this.shareMenu.classList.add('flipbook-hidden');
            this.shareMenuShowing = false;
            this.btnShare.classList.remove('flipbook-btn-active');
            this.btnShare.classList.add('flipbook-has-tooltip');
        }
    },

    toggleNotesMenu: function () {
        
        if (!this.notesMenu) {
            this.notesMenu = jQuery(document.createElement('div'))
                .appendTo(this.wrapper)
                .addClass('flipbook-sub-menu flipbook-font');
            var center = jQuery('<div class="flipbook-sub-menu-center">').appendTo(this.notesMenu);
            var content = jQuery('<div class="flipbook-sub-menu-content skin-color-bg">').appendTo(center);
            this.createMenuHeader(content, this.options.strings.notes, this.toggleNotesMenu);
            this.closeMenus();
            this.notesMenuShowing = true;
            this.initColors();

            const self = this;
            this.options.noteTypes.forEach(function (type) {
                const row = document.createElement('div');
                row.innerHTML =
                    '<span>' +
                    type.title +
                    '</span>' +
                    '<span aria-hidden="true" class="flipbook-icon-comment flipbook-icon flipbook-menu-btn" ' +
                    'style="font-size: 14px; margin: 2px; padding: 12px; ' +
                    'opacity: var(--flipbook-link-opacity);color:' +
                    type.color +
                    '"></span>';
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.dataset.id = type.id;
                checkbox.checked = type.enabled;
                checkbox.onchange = function () {
                    type.enabled = this.checked;
                    self.updateNoteSettings(type);
                };
                row.appendChild(checkbox);
                content[0].appendChild(row);
            });
        } else if (!this.notesMenuShowing) {
            this.notesMenu.show();

            this.closeMenus();
            this.notesMenuShowing = true;
        } else {
            this.notesMenu.hide();
            this.notesMenuShowing = false;
        }
        
    },

    updateNoteSettings: function (noteType) {
        this.options.noteTypes.forEach(function (type) {
            if (type.id == noteType.id) {
                type.enabled = noteType.enabled;
            }
        });
        this.noteService.updateNoteVisibility();
    },

    bookmarkPage: function (index) {
        
        var arr = this.getBookmarkedPages();
        if (arr.indexOf(String(index)) < 0) {
            arr.push(index);
        }
        this.setBookmarkedPages(arr);

        this.thumbs.showBookmarkedThumbs();

        if (!this.bookmarkShowing) {
            this.toggleBookmark();
        }
        
    },

    removeBookmark: function (index) {
        
        var arr = this.getBookmarkedPages();
        if (arr.indexOf(String(index)) > -1) {
            arr.splice(arr.indexOf(String(index)), 1);
        }
        this.setBookmarkedPages(arr);

        this.thumbs.showBookmarkedThumbs();

        if (!this.bookmarkShowing) {
            this.toggleBookmark();
        }
        
    },

    isBookmarked: function (index) {
        var arr = this.getBookmarkedPages();
        return arr.indexOf(String(index)) > 0;
    },

    getBookmarkedPages: function () {
        var str = localStorage.getItem(this.options.name + '_flipbook_bookmarks');
        if (str) {
            return str.split(';');
        } else {
            return [];
        }
    },

    setBookmarkedPages: function (arr) {
        localStorage.setItem(this.options.name + '_flipbook_bookmarks', arr.join(';'));
    },

    printPage: function (index, _) {
        var url;
        var page = this.options.pages[index];
        var size = this.options.pageTextureSize;
        var self = this;

        if (page) {
            if (page.print) {
                url = page.print;
            } else if (page.images && page.images[size]) {
                const c = document.createElement('canvas');
                const ctx = c.getContext('2d');
                const image = page.images[size];
                c.width = image.width;
                c.height = image.height;

                ctx.drawImage(image, 0, 0, image.width, image.height);
                url = c.toDataURL();

                c.width = c.height = 1;
                ctx.clearRect(0, 0, 1, 1);
            } else if (page.src) {
                url = page.src;
            }
        }

        if (url) {
            this.togglePrintWindow(url);
        } else {
            const pageToLoad = this.options.cover ? index : index + 1;
            this.loadPage(pageToLoad, size, function () {
                self.printPage(index);
            });
        }
    },

    downloadPage: function (index) {
        
        var url;
        var page = this.options.pages[index];
        var size = this.options.pageTextureSize;

        if (page && page.download) {
            url = page.download;
        } else if (page && page.src) {
            url = page.src;
        } else if (page && page.images && page.images[size]) {
            const c = document.createElement('canvas');
            const ctx = c.getContext('2d');
            const image = page.images[size];
            c.width = image.width;
            c.height = image.height;

            ctx.drawImage(image, 0, 0, image.width, image.height);
            url = c.toDataURL();

            c.width = c.height = 1;
            ctx.clearRect(0, 0, 1, 1);
        }

        if (url) {
            var link = document.createElement('a');
            link.href = url;
            link.download = 'page' + String(index + 1);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            var self = this;
            const pageToLoad = this.options.cover ? index : index + 1;
            this.loadPage(pageToLoad, this.options.pageTextureSize, function () {
                self.downloadPage(index);
            });
        }
        
    },

    printFile: function (url) {
        var printIframe = document.createElement('iframe');
        printIframe.classList.add('flipbook-hidden');
        printIframe.src = url;
        document.body.appendChild(printIframe);
        printIframe.contentWindow.onload = function () {
            var self = this;
            setTimeout(function () {
                self.print();
            }, 100);
        };
    },

    togglePrintWindow: function (url) {
        var self = this;
        var printContent = '';

        if (url) {
            printContent = url;
        } else if (self.options.printPdfUrl) {
            self.printFile(self.options.printPdfUrl);
            return;
        } else if (self.options.pdfUrl) {
            self.printFile(self.options.pdfUrl);
            return;
        }

        function printme() {
            var link = 'about:blank';
            var pw = window.open(link, '_new');
            pw.document.open();
            if (url) {
                printContent = '<img src="' + url + '"/>\n';
            } else {
                for (var i = 0; i < self.options.pages.length; i++) {
                    if (self.options.pages[i].src) {
                        printContent += '<img src="' + self.options.pages[i].src.toString() + '"/>\n';
                    }
                }
            }

            var printHtml = printWindowHtml(printContent);
            pw.document.write(printHtml);
            pw.document.close();
        }

        function printWindowHtml(printContent) {
            return (
                '<html>\n' +
                '<head>\n' +
                '<title>Temporary Printing Window</title>\n' +
                '<script>\n' +
                'function step1() {\n' +
                "  setTimeout('step2()', 10);\n" +
                '}\n' +
                'function step2() {\n' +
                "  window.addEventListener('afterprint', function(){\n" +
                '       debugger;\n' +
                '       window.close();\n' +
                '  });\n' +
                '  window.print();\n' +
                '}\n' +
                '</scr' +
                'ipt>\n' +
                '<style>img {' +
                'display:block;' +
                'max-width:100%;' +
                'page-break-after: always;' +
                '}' +
                '@media print header{' +
                'display: none;' +
                '}</style>\n' +
                '</head>\n' +
                "<body onLoad='step1()'>\n" +
                printContent +
                '</body>\n' +
                '</html>\n'
            );
        }

        printme();
    },

    thumbsVertical: function () {
        if (!this.thumbsCreated) {
            return;
        }
    },

    toggleExpand: function () {
        const elem = this.fullscreenElement;

        const requestFullscreen = (element) => {
            const methods = [
                'requestFullscreen',
                'mozRequestFullScreen',
                'webkitRequestFullscreen',
                'msRequestFullscreen',
            ];
            for (const method of methods) {
                if (element[method]) {
                    try {
                        element[method]();
                        return;
                    } catch (error) {
                        handleFullscreenError(error);
                        return;
                    }
                }
            }
            handleFullscreenError(new Error('Fullscreen API is not supported on this element.'));
        };

        const exitFullscreen = () => {
            const methods = ['exitFullscreen', 'mozCancelFullScreen', 'webkitExitFullscreen', 'msExitFullscreen'];
            for (const method of methods) {
                if (document[method]) {
                    try {
                        document[method]();
                        return;
                    } catch (error) {
                        handleFullscreenError(error);
                        return;
                    }
                }
            }
            handleFullscreenError(new Error('Exiting fullscreen API is not supported in this document.'));
        };

        const isFullscreen = () => {
            return !!(
                document.fullscreenElement ||
                document.mozFullScreenElement ||
                document.webkitFullscreenElement ||
                document.msFullscreenElement
            );
        };

        const handleFullscreenError = (error) => {
            console.error('Fullscreen API error:', error);
            elem.classList.toggle('flipbook-browser-fullscreen');
            document.body.classList.toggle('flipbook-overflow-hidden');
            this.fullscreenActive = !this.fullscreenActive;
            if (this.fullscreenActive) {
                this.elemParent = elem.parentNode;
                document.body.appendChild(elem);
            } else if (this.elemParent) {
                this.elemParent.appendChild(elem);
                this.elemParent = null;
            }
            this.toggleIcon(this.btnExpand, !this.fullscreenActive);
        };

        try {
            if (isFullscreen()) {
                exitFullscreen();
            } else {
                requestFullscreen(elem);
            }
        } catch (error) {
            handleFullscreenError(error);
        }

        if (this.toolsMenuShowing) {
            this.toggleToolsMenu();
        }
    },

    expand: function () {},

    toggleSinglePage: function () {
        
        if (this.options.singlePageMode) {
            this.options.singlePageMode = false;
        } else {
            this.options.singlePageMode = true;
        }
        this.Book.updateSinglePage(this.options.singlePageMode);
        this.toggleIcon(this.btnSingle, this.options.singlePageMode);
        this.closeMenus();
        
    },

    toggleAutoplay: function (value) {
        
        var self = this;
        this.autoplay = value || !this.autoplay;

        if (this.autoplay) {
            this.autoplayTimer = setInterval(function () {
                if (self.autoplay) {
                    var autoplayStartPage = self.options.autoplayStartPage || 1;

                    if (self.options.rightToLeft) {
                        if (self.Book.prevEnabled) {
                            self.prevPage();
                        } else if (self.options.autoplayLoop) {
                            self.goToPage(self.options.pages.length - autoplayStartPage + 1);
                        } else {
                            self.toggleAutoplay(false);
                        }
                    } else {
                        if (self.Book.nextEnabled) {
                            self.nextPage();
                        } else if (self.options.autoplayLoop) {
                            self.goToPage(autoplayStartPage);
                        } else {
                            self.toggleAutoplay(false);
                        }
                    }
                }
            }, self.options.autoplayInterval);
        } else {
            clearInterval(self.autoplayTimer);
        }

        this.toggleIcon(this.btnAutoplay, !this.autoplay);
        
    },
};

FLIPBOOK.Book = function () {};

FLIPBOOK.Book.prototype = {
    rightIndex: 0,

    goToPage: function () {},

    getRightIndex: function () {},

    canFlipNext: function () {
        if (this.flippedright > 0) {
            if (this.singlePage && this.flippedright == 1) {
                return false;
            } else if (this.view == 1 && this.isFocusedLeft && this.isFocusedLeft()) {
                return true;
            } else if (this.flippedright == 1 && !this.options.rightToLeft && !this.options.backCover) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    },

    canFlipPrev: function () {
        if (this.flippedleft > 0) {
            if (this.view == 1 && this.isFocusedRight && this.isFocusedRight()) {
                return true;
            } else if (this.flippedleft == 1 && this.options.rightToLeft && !this.options.backCover) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    },

    getCurrentPageNumber: function () {
        var ri = this.rightIndex % 2 == 1 ? this.rightIndex + 1 : this.rightIndex;
        if (this.options.rightToLeft) {
            ri = this.options.pages.length - ri;
            return this.isFocusedRight() ? ri : ri + 1;
        } else {
            return this.isFocusedLeft() ? ri : ri + 1;
        }
    },

    startPageItems: function (htmlContent) {
        htmlContent.querySelectorAll('.flipbook-page-item').forEach(function (item) {
            if (item.nodeName == 'VIDEO' || item.nodeName == 'AUDIO') {
                const src = item.getAttribute('data-url');
                const source = item.querySelector('source');
                source.setAttribute('src', src);
                item.load();
                item.style.visibility = 'hidden';
                if (item.autoplay || item.controls) {
                    if (item.readyState < 4) {
                        item.oncanplay = function () {
                            if (this.currentTime == this.duration) {
                                this.load();
                            }
                            if (this.autoplay) {
                                this.play();
                            }
                            item.style.visibility = 'visible';
                        };
                    } else {
                        if (item.currentTime == item.duration) {
                            item.load();
                        }
                        if (item.autoplay) {
                            item.play();
                        }
                        item.style.visibility = 'visible';
                    }
                }
            }
        });
    },

    destroy: function () {},
};

FLIPBOOK.Notes = function (main) {
    const self = this;
    this.main = main;
    this.notes = Object.values(main.options.notes || []);

    this.textSelectionRect = document.createElement('span');
    this.textSelectionRect.className = 'flipbook-add-note-rect hover';
    const btn = document.createElement('span');
    btn.className = 'add-note-btn';
    btn.innerText = main.options.strings.addNote;
    btn.onclick = function () {
        self.hideButton();
        self.createNote();
    };
    btn.onmousedown = function () {};
    this.noteButton = btn;
    this.textSelectionRect.appendChild(btn);
    this.hideButton();

    this.notePopup = document.createElement('div');
    this.notePopup.className = 'flipbook-note-display';
    this.notePopup.innerHTML =
        '<div class="note-content"><textarea role="textbox" maxlength="500" placeholder="' +
        main.options.strings.typeInYourNote +
        '" tabindex="0" class="note-article"></textarea></div> ' +
        '<div  aria-hidden="true" class="note-footer"> ' +
        '<span title="Delete Note" class="icon icon-trash-can note-button note-delete-button">' +
        '<svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" focusable="false">' +
        '<path pid="0" d="M15.976 17.862c0 .607-.414 1.138-.885 1.138H8.893c-.47 ' +
        '0-.869-.513-.869-1.12L8.002 8H16l-.023 9.862zM20 6h-5V4.466C15 3.66 14.853 3 14.013 ' +
        '3h-3.858C9.315 3 9 3.659 9 4.466V6H4v2h2v10c0 1.843 1.153 3 2.893 3h6.198C16.84 21 18 ' +
        '19.852 18 18V8h2V6z"></path>' +
        '<path pid="1" d="M13 18h1V9h-1zM10 18h1V9h-1z"></path></svg></span></div>';
    this.notePopup.onmouseup = function (e) {
        e.stopPropagation();
    };
    this.noteDelete = this.notePopup.getElementsByClassName('note-delete-button')[0];
    this.noteDelete.onclick = function () {
        self.deleteNote();
    };
    this.noteInput = this.notePopup.querySelectorAll('textarea')[0];
    this.noteInput.onchange = function () {
        const noteId = this.dataset.note;
        const noteText = this.value;
        self.getNoteById(noteId).text = noteText;
        self.main.trigger('r3d-update-note', {
            note: self.getNoteById(noteId),
        });
    };

    this.updateNoteVisibility();
};

FLIPBOOK.Notes.prototype = {
    initPageNotes: function (page) {
        const self = this;
        this.notes.forEach(function (note) {
            if (note.page == page.index + 1) {
                self.addPageNote(note, page);
            }
        });
        this.addPageNoteListeners(page);
    },

    getNodeColor: function (note) {
        let result = 'green';
        this.main.options.noteTypes.forEach(function (type) {
            if (type.id == note.type) {
                result = type.color;
            }
        });
        return result;
    },

    updateNoteVisibility: function () {
        let root = document.documentElement;
        this.main.options.noteTypes.forEach(function (type) {
            root.style.setProperty(`--note-${type.id}-opacity`, type.enabled ? '1' : '0');
            root.style.setProperty(`--note-${type.id}-pointer-events`, type.enabled ? 'auto' : 'none');
        });
    },

    addPageNote: function (note) {
        const pageNumber = note.page;
        const page = this.main.options.pages[pageNumber - 1];
        const color = this.getNodeColor(note) || 'yellow';
        if (note.selectedText && page.htmlContentInitialized) {
            if (!note.id) {
                note.id = Date.now() + Math.floor(Math.random() * 1000);
            }
            const $htmlContent = jQuery(page.htmlContent);
            const $textLayer = $htmlContent.find('.textLayer');
            const uniqueClass = `flipbook-page-note 
											 note-id-${note.id} 
											 note-page-${pageNumber} 
											 note-type-${note.type} 
											 mark-${color} 
											 flipbook-note-${note.id}`;
            $textLayer.mark(note.selectedText, {
                acrossElements: true,
                separateWordSearch: false,
                className: 'mark-note ' + uniqueClass,
            });
            const self = this;
            $textLayer.find(`.note-id-${note.id}`).each(function (index, el) {
                el.dataset.note = note.id;
                el.onclick = function () {
                    self.showNote(this, page, this.dataset.note);
                    self.hideButton();
                };
                el.style.opacity = 'var(--note-' + note.type + '-opacity)';
                el.style.pointerEvents = 'var(--note-' + note.type + '-pointer-events)';
            });
        }
    },

    showButton: function () {
        this.noteButton.classList.remove('flipbook-hidden');
    },

    hideButton: function () {
        this.noteButton.classList.add('flipbook-hidden');
    },

    showNote(target, page, id) {
        const pageRect = page.htmlContent.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const note = this.getNoteById(id);
        const $htmlContent = jQuery(page.htmlContent);
        $htmlContent[0].appendChild(this.notePopup);

        const main = this.main;
        const scale = (main.Book.sc * main.wrapperH) / 1000;
        const noteTop = (targetRect.y / main.zoom - pageRect.y / main.zoom) / scale;

        if (noteTop < 150) {
            this.notePopup.style.top = noteTop + 40 + 'px';
        } else {
            this.notePopup.style.top = noteTop - 140 + 'px';
        }

        this.notePopup.style.left =
            (targetRect.x / main.zoom + (0.5 * targetRect.width) / main.zoom - pageRect.x / main.zoom) / scale + 'px';

        this.noteInput.value = note.text || '';

        this.noteInput.dataset.note = note.id;
        this.activeNote = note;
        if (note.readonly) {
            this.disableNoteEdit();
        } else {
            this.enableNoteEdit();
        }
    },

    enableNoteEdit: function () {
        this.noteDelete.classList.remove('flipbook-hidden');
        this.noteInput.readOnly = false;
    },

    disableNoteEdit: function () {
        this.noteDelete.classList.add('flipbook-hidden');
        this.noteInput.readOnly = true;
    },

    hideNote: function () {
        if (this.notePopup.parentNode) {
            this.notePopup.parentNode.removeChild(this.notePopup);
        }
        this.activeNote = null;
    },

    createNote: function () {
        this.textSelectionRect.appendChild(this.notePopup);
        this.notePopup.style.left = '50%';
        if (this.textSelectionRect.offsetTop < 150) {
            this.notePopup.style.top = '40px';
        } else {
            this.notePopup.style.top = '-140px';
        }
        this.noteInput.value = '';
        this.noteInput.focus();
        const note = {
            selectedText: this.selectedTextString,
            page: this.selectedTextPageNumber,
            type: 1,
        };
        this.notes.push(note);
        this.addPageNote(note);
        this.noteInput.dataset.note = note.id;
        this.addPageNoteListeners(this.main.options.pages[note.page - 1]);
        this.activeNote = note;
        this.enableNoteEdit();
        this.main.trigger('r3d-update-note', { note: note });
    },

    deleteNote: function () {
        const page = this.main.options.pages[this.activeNote.page - 1];
        const $htmlContent = jQuery(page.htmlContent);
        const $textLayer = $htmlContent.find('.textLayer');
        $textLayer.unmark({
            className: `flipbook-note-${this.activeNote.id}`,
        });
        const index = this.notes.indexOf(this.activeNote);
        if (index > -1) {
            this.notes.splice(index, 1);
        }
        this.hideNote();
        this.main.trigger('r3d-delete-note', {
            note: this.activeNote,
        });
    },

    getNoteById: function (id) {
        let toReturn = null;
        this.notes.forEach(function (note) {
            if (Number(note.id) == Number(id)) {
                toReturn = note;
            }
        });
        return toReturn;
    },

    removeTextRect: function () {
        if (this.textSelectionRect.parentNode) {
            this.textSelectionRect.parentNode.removeChild(this.textSelectionRect);
        }
    },

    addPageNoteListeners: function (page) {
        const self = this;

        if (!page.textLayerDiv || page.notesInitialized) {
            return;
        }

        page.textLayerDiv.addEventListener('mouseup', function (e) {
            if (e.target.classList.contains('add-note-btn')) {
                return;
            }

            self.hideNote();
            self.showButton();

            self.selectedText = window.getSelection();
            if (self.selectedText.toString()) {
                self.selectedTextString = self.selectedText.toString();
                self.selectedTextPageNumber = Number(this.dataset.pageNumber);
                self.selectedTextRange = self.selectedText.getRangeAt(0);

                const rect = self.selectedTextRange.getBoundingClientRect();
                const pageRect = this.getBoundingClientRect();
                const main = self.main;
                let scale = (main.Book.sc * main.wrapperH) / 1000;
                self.textSelectionRect.style.top = (rect.y / main.zoom - pageRect.y / main.zoom) / scale + 'px';
                self.textSelectionRect.style.left = (rect.x / main.zoom - pageRect.x / main.zoom) / scale + 'px';
                self.textSelectionRect.style.width = rect.width / main.zoom / scale + 'px';
                self.textSelectionRect.style.height = rect.height / main.zoom / scale + 'px';
                this.appendChild(self.textSelectionRect);
            } else {
                self.removeTextRect();
            }
        });

        page.textLayerDiv.addEventListener('mousemove', function (e) {
            if (self.selectedTextRange && self.selectedText.toString()) {
                const textSelectionRect = self.textSelectionRect.getBoundingClientRect();
                const btnRect = self.textSelectionRect.firstChild.getBoundingClientRect();
                if (
                    e.clientX >= textSelectionRect.left &&
                    e.clientX <= textSelectionRect.right &&
                    e.clientY >= btnRect.top &&
                    e.clientY <= textSelectionRect.bottom
                ) {
                    self.showButton();
                } else {
                    self.hideButton();
                }
            }
        });

        page.notesInitialized = true;
    },
};

FLIPBOOK.Tooltip = function () {
    this.domElement = document.createElement('div');
    this.domElement.className = 'flipbook-tooltip flipbook-noselect';
    this.domElement.classList.add('flipbook-hidden');
    const self = this;
    this.currentPosition = { x: 0, y: 0 };
    document.addEventListener('scroll', function () {
        self.position();
    });
};

FLIPBOOK.Tooltip.prototype = {
    show: function (params) {
        if (!this.showing) {
            this.domElement.classList.remove('flipbook-hidden');
            this.showing = true;

            if (params.text) {
                this.domElement.innerText = params.text;
            }
            if (params.parent) {
                params.parent.appendChild(this.domElement);
            }
            if (params.onClick) {
                this.domElement.style.cursor = 'pointer';
                this.domElement.onclick = params.onClick;
            } else {
                this.domElement.style.cursor = 'auto';
                this.domElement.removeAttribute('onclick');
            }
            this.currentPosition = params.position;
            this.position();
        }
    },
    hide: function () {
        if (this.showing) {
            this.domElement.classList.add('flipbook-hidden');
            this.showing = false;
        }
    },
    position: function () {
        const wrapperRect = this.domElement.parentNode.getBoundingClientRect();
        this.domElement.style.top = this.currentPosition.y - wrapperRect.top - scrollY + 'px';
        this.domElement.style.left = this.currentPosition.x - wrapperRect.left - scrollX + 'px';
    },
};

FLIPBOOK.Thumbnails = function (main) {
    var self = this;
    var options = main.options;
    var wrapper = main.wrapper;

    this.main = main;
    this.options = options;
    this.wrapper = wrapper;
    this.active = null;

    this.thumbHolder = document.createElement('div');
    this.thumbHolder.className = 'flipbook-thumbHolder flipbook-side-menu skin-color-bg';
    wrapper.appendChild(this.thumbHolder);
    this.thumbHolder.style[options.sideMenuPosition] = '0';
    this.thumbHolder.classList.add('flipbook-hidden');

    main.createMenuHeader(this.thumbHolder, main.strings.thumbnails, main.toggleThumbs);

    this.bookmark = document.createElement('div');
    this.bookmark.className = 'flipbook-font';
    this.thumbHolder.appendChild(this.bookmark);
    this.bookmark.classList.add('flipbook-hidden');

    var currentBookmark = document.createElement('a');
    currentBookmark.innerHTML =
        '<div class="c-p skin-color flipbook-btn">' + options.strings.bookmarkCurrentPage + '</div>';
    this.bookmark.appendChild(currentBookmark);
    currentBookmark.addEventListener('click', function (e) {
        main.bookmarkPage(main.cPage[0], this);
        e.preventDefault();
        e.stopPropagation();
    });

    var leftBookmark = document.createElement('a');
    leftBookmark.innerHTML =
        '<div class="c-l-p skin-color flipbook-btn">' + options.strings.bookmarkLeftPage + '</div>';
    this.bookmark.appendChild(leftBookmark);
    leftBookmark.addEventListener('click', function (e) {
        main.bookmarkPage(main.cPage[0], this);
        e.preventDefault();
        e.stopPropagation();
    });

    var rightBookmark = document.createElement('a');
    rightBookmark.innerHTML =
        '<div class="c-r-p skin-color flipbook-btn">' + options.strings.bookmarkRightPage + '</div>';
    this.bookmark.appendChild(rightBookmark);
    rightBookmark.addEventListener('click', function (e) {
        main.bookmarkPage(main.cPage[1], this);
        e.preventDefault();
        e.stopPropagation();
    });

    this.search = document.createElement('div');
    this.search.className = 'flipbook-search';
    this.thumbHolder.appendChild(this.search);
    this.search.classList.add('flipbook-hidden');

    this.searchBar = document.createElement('div');
    this.searchBar.className = 'flipbook-findbar';
    this.search.appendChild(this.searchBar);

    this.findInputCotainer = document.createElement('div');
    this.findInputCotainer.id = 'findbarInputContainer';
    this.searchBar.appendChild(this.findInputCotainer);

    this.findInput = document.createElement('input');
    this.findInput.className = 'toolbarField skin-color skin-color-bg';
    this.findInput.title = 'Find';
    this.findInput.autocapitalize = 'none';
    this.findInput.placeholder = `${options.strings.findInDocument}...`;
    this.findInputCotainer.appendChild(this.findInput);

    this.clearInput = document.createElement('span');
    this.clearInput.className = 'flipbook-search-clear flipbook-hidden skin-color skin-color-bg';

    var closeIcon = main.createSVGIcon('close');
    this.clearInput.appendChild(closeIcon);
    this.clearInput.addEventListener('click', function () {
        self.findInput.value = '';
        self.hideAllThumbs();
        self.clearSearchResults();
        main.unmark();
        main.searchingString = '';
        self.clearInput.classList.add('flipbook-hidden');
        self.findInput.focus();
    });

    this.findInputCotainer.appendChild(this.clearInput);

    this.thumbsWrapper = document.createElement('div');
    this.thumbsWrapper.className = 'flipbook-thumbsWrapper';
    this.thumbHolder.appendChild(this.thumbsWrapper);

    this.closeGrid = document.createElement('div');
    this.closeGrid.className = 'flipbook-thumbs-grid-close skin-color flipbook-menu-btn';
    this.thumbsWrapper.appendChild(this.closeGrid);
    this.closeGrid.addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        self.main.closeMenus();
    });

    var closeIcon = this.main.createSVGIcon('close');
    this.closeGrid.appendChild(closeIcon);

    this.thumbsScroller = document.createElement('div');
    this.thumbsScroller.className = 'flipbook-thumbsScroller skin-color';
    this.thumbsWrapper.appendChild(this.thumbsScroller);

    var searchTimeout = 0;

    this.findInput.addEventListener('keyup', function () {
        var str = this.value;
        if (str) {
            self.clearInput.classList.remove('flipbook-hidden');
        } else {
            self.clearInput.classList.add('flipbook-hidden');
        }
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(function () {
            var main = self.main;
            var pdfService = main.pdfService;
            if (str !== '') {
                var options = main.options;
                var matchesFound = 0;

                self.hideAllThumbs();
                self.clearSearchResults();
                self.pagesFound = 0;
                main.unmark();
                main.searchingString = str;

                if (pdfService) {
                    for (var i = 0; i < pdfService.info.numPages; i++) {
                        pdfService.findInPage(str, i, function (matches, htmlContent, index, pageText) {
                            if (matches.length > 0) {
                                self.pagesFound++;
                                matchesFound += matches.length;
                                main.mark(str);
                                if (options.searchResultsThumbs) self.showThumb(index);
                                else self.showSearchResults(matches, index, pageText);
                            }
                        });
                    }
                } else {
                    options.pagesOriginal.forEach((_, index) => {
                        if (!options.cover) {
                            index++;
                        }
                        var pi = index;
                        if (options.doublePage) {
                            pi *= 2;
                        }
                        if (options.doublePage && pi === options.pagesOriginal.length * 2 - 2) {
                            pi--;
                        }

                        main.loadPageHTML(pi, function (htmlContent, index) {
                            var matches = htmlContent.innerText
                                .toUpperCase()
                                .search(main.searchingString.toUpperCase());
                            if (matches > -1) {
                                if (options.doublePage) {
                                    index /= 2;
                                }
                                self.showThumb(index);
                                self.pagesFound++;
                                main.mark(str);
                            }
                        });
                    });
                }
            } else {
                self.hideAllThumbs();
                self.clearSearchResults();
                main.unmark();
                main.searchingString = str;
                self.clearInput.classList.add('flipbook-hidden');
            }
        }, 700);
    });

    this.thumbs = [];

    var arr2 = options.pages;
    var arr = [];

    if (options.doublePage) {
        for (var i = 0; i < arr2.length; i++) {
            if (i === 0 || i % 2 !== 0) {
                arr.push(arr2[i]);
            }
        }
    } else {
        arr = arr2;
    }

    if (options.pdfMode) {
        this.loadThumbsFromPdf(arr);
    }

    var h = options.thumbSize;
    var w = (options.thumbSize * options.pageWidth) / options.pageHeight;

    arr.forEach((item, i) => {
        if (item.empty) return;

        var thumb = document.createElement('div');
        thumb.className = 'flipbook-thumb';
        thumb.setAttribute('data-thumb-index', i);
        thumb.style.width = w + 'px';
        thumb.style.height = h + 'px';
        self.thumbsScroller.appendChild(thumb);

        var btnClose = document.createElement('span');
        btnClose.className = 'thumb-btn-close skin-color skin-color-bg';
        thumb.appendChild(btnClose);
        btnClose.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            main.removeBookmark(thumb.getAttribute('data-thumb-index'));
        });

        var iconClose = main.createSVGIcon('close');
        btnClose.appendChild(iconClose);

        this.thumbs.push(thumb);

        var thumbImg;
        if (item.thumbCanvas) {
            thumbImg = item.thumbCanvas;
        } else if (item.thumb) {
            thumbImg = document.createElement('img');
            thumbImg.src = item.thumb;
        } else {
            return;
        }

        thumb.appendChild(thumbImg);
        thumbImg.style.height = h + 'px';

        var hasBackCover = options.doublePage && options.pages.length % 2 === 0;
        var isBackCover = hasBackCover && i === arr.length - 1;
        var isCover = options.doublePage && i === 0;
        var isDouble = options.doublePage && !isCover && !isBackCover;

        if (isBackCover) {
            thumbImg.setAttribute('page-title', 2 * i);
            var span = document.createElement('span');
            span.textContent = String(2 * i);
            span.className = 'skin-color flipbook-thumb-num';
            thumb.appendChild(span);
        } else if (isDouble) {
            thumb.style.width = 2 * w + 'px';
            thumbImg.setAttribute('page-title', 2 * i + 1);
            var span = document.createElement('span');
            span.textContent = String(2 * i) + '-' + String(2 * i + 1);
            span.className = 'skin-color flipbook-thumb-num';
            thumb.appendChild(span);
        } else {
            thumbImg.setAttribute('page-title', i + 1);
            var title = String(i + 1);
            if (this.options.pages[i] && this.options.pages[i].name) {
                title = this.options.pages[i].name;
            }

            var span = document.createElement('span');
            span.textContent = title;
            span.className = 'skin-color flipbook-thumb-num';
            thumb.appendChild(span);
        }

        if (options.thumbsStyle === 'overlay') {
            options.thumbsCloseOnClick = true;
        }

        thumbImg.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var clickedPage = Number(thumbImg.getAttribute('page-title'));
            if (options.rightToLeft) {
                clickedPage = options.pages.length - clickedPage + 1;
            }
            main.goToPage(clickedPage);

            if (self.active !== 'search' && options.thumbsCloseOnClick) {
                main.toggleThumbs(false);
            }
        });
    });

    main.initColors();
};

FLIPBOOK.Thumbnails.prototype = {
    loadThumbsFromPdf: function (arr) {
        var numPages = this.main.pdfService.info.numPages;

        for (var i = 0; i < numPages; i++) {
            var c = document.createElement('canvas');
            arr[i].thumbCanvas = c;
        }

        this.loadThumbFromPdf(0, arr);
    },

    loadVisibleThumbs: function () {},

    loadThumbFromPdf: function (i, arr) {
        var self = this;

        this.main.pdfService.pdfDocument.getPage(i + 1).then(function (page) {
            var v = page.getViewport({ scale: 1 });

            var scale = self.options.thumbSize / v.height;

            var viewport = page.getViewport({ scale: scale });

            var c = arr[page._pageIndex].thumbCanvas;
            var context = c.getContext('2d');
            c.height = viewport.height;
            c.width = viewport.width;

            var renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            page.cleanupAfterRender = true;

            var renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
                page.cleanup();
                if (page._pageIndex + 1 < self.main.pdfService.info.numPages) {
                    self.loadThumbFromPdf(page._pageIndex + 1, arr);
                }
            });
        });
    },

    showAllThumbs: function () {
        document.querySelectorAll('.flipbook-thumb').forEach((thumb) => thumb.classList.remove('flipbook-hidden'));
        this.clearSearchResults();
    },

    hideAllThumbs: function () {
        document.querySelectorAll('.flipbook-thumb').forEach((thumb) => thumb.classList.add('flipbook-hidden'));
    },

    clearSearchResults: function () {
        document.querySelectorAll('.flipbook-search-match').forEach((match) => match.remove());
    },

    showSearchResults: function (matches, pageIndex, str) {
        var self = this;
        var o = this.main.options;

        var num = matches.length;
        var pageNumber = Number(pageIndex + 1);

        var searchMatch = document.createElement('div');
        searchMatch.className = 'flipbook-search-match';
        searchMatch.setAttribute('data-page', pageNumber);
        searchMatch.style.order = pageIndex;
        searchMatch.innerHTML = `
            <div class="flipbook-search-match-title">
                <span style="float:left;"><strong>Page ${pageNumber}</strong></span>
                <span style="float:right;">${num} matches</span>
            </div>
            <div class="flipbook-search-match-text">${str}</div>
        `;
        self.thumbsScroller.appendChild(searchMatch);
        searchMatch.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var targetPage = Number(this.dataset.page);

            targetPage = o.rightToLeft && o.pages && o.pages.length ? o.pages.length - targetPage + 1 : targetPage;

            self.main.goToPage(targetPage);
        });
    },

    showThumb: function (index) {
        if (this.thumbs[index]) {
            this.thumbs[index].classList.remove('flipbook-hidden');
        }
    },

    hideThumb: function (index) {
        this.thumbs[index].classList.add('flipbook-hidden');
    },

    showBookmarks: function () {
        document.querySelectorAll('.thumb-btn-close').forEach((btn) => btn.classList.remove('flipbook-hidden'));
        this.showBookmarkedThumbs();
        this.clearSearchResults();
        this.bookmark.classList.remove('flipbook-hidden');
        this.setTitle(this.options.strings.bookmarks);
        this.main.updateCurrentPage();
        this.active = 'bookmarks';
        this.thumbHolder.classList.remove('flipbook-thumbs-grid');
    },

    showSearch: function () {
        this.clearSearchResults();
        this.hideAllThumbs();
        this.search.classList.remove('flipbook-hidden');
        document.querySelectorAll('.thumb-btn-close').forEach((btn) => btn.classList.add('flipbook-hidden'));
        this.setTitle(this.options.strings.search);
        this.findInput.value = '';
        this.clearInput.classList.add('flipbook-hidden');
        this.findInput.focus();
        this.active = 'search';
        this.thumbHolder.classList.remove('flipbook-thumbs-grid');
    },

    showBookmarkedThumbs: function () {
        var arr = this.main.getBookmarkedPages();

        this.hideAllThumbs();

        for (var i = 0; i < arr.length; i++) {
            var index = arr[i];
            if (index) {
                this.showThumb(index);
            }
        }
    },

    show: function () {
        this.setTitle(this.options.strings.thumbnails);
        this.bookmark.classList.add('flipbook-hidden');
        this.search.classList.add('flipbook-hidden');
        this.thumbHolder.classList.remove('flipbook-hidden');
        this.main.thumbsVertical();

        this.showAllThumbs();
        document.querySelectorAll('.thumb-btn-close').forEach((btn) => btn.classList.add('flipbook-hidden'));
        this.loadVisibleThumbs();
        this.main.resize();
        this.active = 'thumbs';
        if (this.main.options.thumbsStyle === 'overlay') {
            this.thumbHolder.classList.add('flipbook-thumbs-grid');
        }
    },

    hide: function () {
        this.thumbHolder.classList.add('flipbook-hidden');
        this.main.resize();
        this.active = null;
    },

    setTitle: function (str) {
        this.thumbHolder.querySelector('.flipbook-menu-title').textContent = str;
    },
};

FLIPBOOK.Lightbox = function (context, content, options) {
    var self = this;
    this.context = context;
    this.options = options;

    this.$document = document;
    this.$body = document.body;
    this.$html = document.documentElement;
    this.$window = window;

    self.overlay = document.createElement('div');
    self.overlay.className = 'flipbook-overlay';
    self.overlay.classList.add('flipbook-hidden');
    self.overlay.style.top = self.options.lightboxMarginV;
    self.overlay.style.bottom = self.options.lightboxMarginV;
    self.overlay.style.left = self.options.lightboxMarginH;
    self.overlay.style.right = self.options.lightboxMarginH;
    Object.assign(self.overlay.style, options.lightboxCSS);
    document.body.appendChild(self.overlay);

    if (options.lightboxBackground) {
        self.overlay.style.background = options.lightboxBackground;
    }

    if (options.lightboxBackgroundColor) {
        self.overlay.style.background = options.lightboxBackgroundColor;
    }

    if (options.lightboxBackgroundPattern) {
        self.overlay.style.background = 'url(' + options.lightboxBackgroundPattern + ') repeat';
    }

    if (options.lightboxBackgroundImage) {
        self.overlay.style.background = 'url(' + options.lightboxBackgroundImage + ') no-repeat';
        self.overlay.style.backgroundSize = 'cover';
        self.overlay.style.backgroundPosition = 'center center';
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            self.closeLightbox();
        }
    });

    self.wrapper = document.createElement('div');
    self.wrapper.style.height = 'auto';
    self.wrapper.className = 'flipbook-wrapper-transparent';
    self.wrapper.style.margin = '0px auto';
    self.wrapper.style.padding = '0px';
    self.wrapper.style.height = '100%';
    self.wrapper.style.width = '100%';
    self.overlay.appendChild(self.wrapper);

    self.wrapper.appendChild(content);

    var toolbar = document.createElement('div');
    toolbar.className = 'flipbook-lightbox-toolbar';
    self.wrapper.appendChild(toolbar);
};

FLIPBOOK.Lightbox.prototype = {
    openLightbox: function () {
        if (FLIPBOOK.lightboxOpened) {
            return;
        }

        FLIPBOOK.lightboxOpened = true;

        this.overlay.classList.remove('flipbook-hidden');

        var element = this.overlay;

        void this.overlay.offsetWidth;

        element.classList.add('flipbook-overlay-visible');
        element.addEventListener('transitionend', function handleTransitionEnd() {
            element.removeEventListener('transitionend', handleTransitionEnd);
        });

        document.body.classList.add('flipbook-overflow-hidden');
        this.$html.classList.add('flipbook-overflow-hidden');

        const lightboxOpenEvent = new Event('r3d-lightboxopen');
        window.dispatchEvent(lightboxOpenEvent);

        if (!this.options.deeplinkingEnabled) {
            window.history.pushState(null, '', window.location.href);
        }

        if (this.context.options.password && !this.context.pdfinitStarted && this.context.initialized) {
            this.context.initPdf();
        }
    },

    closeLightbox: function (popState) {
        if (!FLIPBOOK.lightboxOpened || !this.context.Book || !this.context.Book.enabled) {
            return;
        }

        FLIPBOOK.lightboxOpened = false;

        var element = this.overlay;
        element.classList.remove('flipbook-overlay-visible');
        element.addEventListener('transitionend', function handleTransitionEnd() {
            element.classList.add('flipbook-hidden');
            element.removeEventListener('transitionend', handleTransitionEnd);
        });

        document.body.classList.remove('flipbook-overflow-hidden');
        this.$html.classList.remove('flipbook-overflow-hidden');

        const lightboxCloseEvent = new Event('r3d-lightboxclose');
        window.dispatchEvent(lightboxCloseEvent);

        this.context.trigger('lightboxclose');

        this.context.fullscreenElement.classList.remove('flipbook-browser-fullscreen');

        this.context.lightboxEnd();

        if (!popState && !this.options.deeplinkingEnabled) {
            history.back();
        }
    },

    disposeLightbox: function () {
        FLIPBOOK.lightboxOpened = false;

        var element = this.overlay;
        element.classList.remove('flipbook-overlay-visible');
        element.addEventListener('transitionend', function handleTransitionEnd() {
            element.classList.add('flipbook-hidden');
            element.removeEventListener('transitionend', handleTransitionEnd);
        });

        document.body.classList.remove('flipbook-overflow-hidden');
        this.$html.classList.remove('flipbook-overflow-hidden');

        const lightboxCloseEvent = new Event('r3d-lightboxclose');
        window.dispatchEvent(lightboxCloseEvent);

        this.context.trigger('lightboxclose');

        this.context.fullscreenElement.classList.remove('flipbook-browser-fullscreen');

        this.context.lightboxEnd();

        this.context.disposed = true;
    },
};

FLIPBOOK.onPageLinkClick = function (link) {
    var id = link.dataset.bookid;
    var page = link.dataset.page;
    if (page) {
        FLIPBOOK.books[id].goToPage(Number(page));
    }
    var _url = link.dataset.url;
    if (_url) {
        window.open(_url, '_blank');
    }
};

FLIPBOOK.easings = {
    linear: function (t) {
        return t;
    },
    easeInQuad: function (t) {
        return t * t;
    },
    easeOutQuad: function (t) {
        return t * (2 - t);
    },
    easeInOutQuad: function (t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic: function (t) {
        return t * t * t;
    },
    easeOutCubic: function (t) {
        return --t * t * t + 1;
    },
    easeInOutCubic: function (t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart: function (t) {
        return t * t * t * t;
    },
    easeOutQuart: function (t) {
        return 1 - --t * t * t * t;
    },
    easeInOutQuart: function (t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    easeInQuint: function (t) {
        return t * t * t * t * t;
    },
    easeOutQuint: function (t) {
        return 1 + --t * t * t * t * t;
    },
    easeInOutQuint: function (t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    },
    easeInSine: function (t) {
        return 1 - Math.cos((t * Math.PI) / 2);
    },
    easeOutSine: function (t) {
        return Math.sin((t * Math.PI) / 2);
    },
    easeInOutSine: function (t) {
        return 0.5 * (1 - Math.cos(Math.PI * t));
    },
};

FLIPBOOK.animate = function (params) {
    let start = performance.now();
    let from = params.from;
    let to = params.to;
    let duration = params.duration;
    let change = to - from;
    let easing = FLIPBOOK.easings[params.easing] || FLIPBOOK.easings.linear;
    let rafId = null;
    let pausedAt = null;
    let repeatCount = params.repeat || 1;
    let yoyo = params.yoyo || false;
    let currentIteration = 0;
    let reversed = false;
    let delay = params.delay || 0;

    function animate() {
        let now = performance.now();
        let timeElapsed = pausedAt !== null ? pausedAt - start : now - start;

        if (timeElapsed < delay) {
            rafId = requestAnimationFrame(animate);
            return;
        }

        timeElapsed -= delay; // Adjust timeElapsed after delay
        let progress = Math.min(timeElapsed / duration, 1);
        let value;

        if (reversed) {
            value = from + change * easing(1 - progress);
        } else {
            value = from + change * easing(progress);
        }

        if (params.step) {
            params.step(value);
        }

        if (progress < 1) {
            rafId = requestAnimationFrame(animate);
        } else {
            currentIteration++;
            if (currentIteration < repeatCount) {
                if (yoyo) {
                    reversed = !reversed;
                }
                start = performance.now();
                rafId = requestAnimationFrame(animate);
            } else {
                if (params.step) {
                    params.step(to);
                }
                if (params.complete) {
                    params.complete();
                }
            }
        }
    }

    function pause() {
        if (rafId) {
            cancelAnimationFrame(rafId);
            pausedAt = performance.now();
        }
    }

    function resume() {
        if (pausedAt) {
            start += performance.now() - pausedAt;
            pausedAt = null;
            rafId = requestAnimationFrame(animate);
        }
    }

    function stop() {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
    }

    if (delay > 0) {
        setTimeout(() => {
            start = performance.now(); // Reset start time after delay
            rafId = requestAnimationFrame(animate);
        }, delay);
    } else {
        rafId = requestAnimationFrame(animate);
    }

    return {
        pause,
        resume,
        stop,
    };
};

FLIPBOOK.Linkify = function (element, linkTarget) {
    const urlRegex = /\b(?:https?|ftp):\/\/[^\s<>\"]+|\bwww\.[^\s<>\"]+/gi;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/gi;

    linkTarget = linkTarget || '_blank';

    let htmlContent = element.innerHTML;

    htmlContent = htmlContent.replace(urlRegex, function (url) {
        let fullUrl = url;
        if (url.startsWith('www.')) {
            fullUrl = 'http://' + url;
        }
        return `<a href="${fullUrl}" target="${linkTarget}" class="flipbook-page-auto-link">${url}</a>`;
    });

    htmlContent = htmlContent.replace(emailRegex, function (email) {
        return `<a href="mailto:${email}" target="${linkTarget}" class="flipbook-page-auto-link">${email}</a>`;
    });

    element.innerHTML = htmlContent;
};

FLIPBOOK.extend = function () {
    function isPlainObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if (typeof target === 'boolean') {
        deep = target;
        target = arguments[1] || {};
        // Skip the boolean and the target
        i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }

    // Extend the target object if only one argument is passed
    if (length === i) {
        target = this;
        --i;
    }

    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
            // Extend the base object
            for (name in options) {
                if (Object.prototype.hasOwnProperty.call(options, name)) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = FLIPBOOK.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
    }

    // Return the modified object
    return target;
};
