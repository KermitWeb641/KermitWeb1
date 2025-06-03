/**
 * Manages the user interface elements, visual effects, and sidebars.
 */

// UI Element references (will be passed during initialization)
let themeSidebar;
let settingsSidebar;
let themeButton;
let settingsButton;
let topRightButton;
let specialGameButtons; // This will be re-selected on init
let styledButtons; // This will be re-selected on init
let titleBackgroundImage;
let backgroundVideo;
let musicToggleButton;
let bottomBar;

// Slideshow variables
const slideshowImages = [
    'https://i0.wp.com/615film.com//wp-content/uploads/2017/10/Feature-Image.jpg?ssl=1',
    'https://pixeldie.com/wp-content/uploads/2020/12/20201213195528_1.jpg?w=816',
    'https://storymuseum.s3-assets.com/_1023x682_crop_center-center_80_none/1001_Undertale.png',
    'https://fnf-online.org/data/image/posts/fnf-online-game-image2.jpg',
    'https://cdn.mobygames.com/covers/11288398-pizza-tower-windows-front-cover.jpg',
    'https://images4.alphacoders.com/659/659657.jpg',
    'https://pbs.twimg.com/media/Cy1Em3QVEAA_e2i.jpg:large',
    'https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=png/99e090d154caf30f3625df7e456d5984.png', // Stickman Hook
    'https://drifthunters2.io/data/image/favicon.png', // Drift Hunters
    'https://m.media-amazon.com/images/M/MV5BNjQzMDlkNDctYmE3Yi00ZWFiLTlmOWYtMjI4MzQ4Y2JhZjY2XkEyXkFqcGc@._V1_.jpg', // Minecraft
    'https://m.media-amazon.com/images/M/MV5BNjhmNzg4ZTMtNWVhMy00NjgwLThhZjUtZjY4ZmU2YTVhYjUwXkEyXkFqcGc@._V1_QL75_UY281_CR6,0,190,281_.jpg', // Super Mario 64
    'https://assetsio.gnwcdn.com/paper-mario-the-thousand-year-door-remake-header.png?width=1200&height=630&fit=crop&enable=upscale&auto=webp', // Paper Mario
    'https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=314,height=314,fit=cover,f=auto/e521bbbf13a6480b60d75421e7edc8d8d0e1edadaccd7d4343862a74088a.png', // Rocket Soccer
    'https://a.silvergames.com/j/b/gun-fest.jpg', // Gun Fest
    'https://nutwg.com/en/wp-content/uploads/sites/2/2024/07/2024-07-05-135225600.webp', // Cluster Rush
    'https://assets-prd.ignimgs.com/2022/02/28/pokemonstadium-1646017802114.jpg', // Pokemon Stadium
    'https://upload.wikimedia.org/wikipedia/en/3/3f/Clicker_Heroes_Logo.jpeg', // Clicker Heroes
    'https://www2.minijuegosgratis.com/v3/games/thumbnails/22727_7_sq.jpg' // RedBall 4
];