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

export function initUI(elements) {
    themeSidebar = elements.themeSidebar;
    settingsSidebar = elements.settingsSidebar;
    themeButton = elements.themeButton;
    settingsButton = elements.settingsButton;
    topRightButton = elements.topRightButton;
    specialGameButtons = document.querySelectorAll('.game-list-button'); // Re-select
    styledButtons = document.querySelectorAll('.styled-button'); // Re-select
    titleBackgroundImage = elements.titleBackgroundImage;
    backgroundVideo = elements.backgroundVideo;
    musicToggleButton = elements.musicToggleButton;
    bottomBar = elements.bottomBar;

    // Initialize slideshow for title background
    if (titleBackgroundImage && slideshowImages.length > 0) {
        setInterval(changeTitleBackgroundImage, slideshowInterval);
    }

    // Add mouse move/leave listeners for buttons
    specialGameButtons.forEach((button, index) => {
        setTimeout(() => {
            button.classList.add('loaded');
            button.addEventListener('mousemove', handleButtonMouseMove);
            button.addEventListener('mouseleave', handleButtonMouseLeave);
        }, 100 * index);
    });

    styledButtons.forEach(button => {
        // Avoid re-adding if already handled by specific ID listeners in script.js
        if (button.id !== 'top-right-button' && button.id !== 'github-button' && button.id !== 'bottom-right-github-button') {
            button.addEventListener('mousemove', handleButtonMouseMove);
            button.addEventListener('mouseleave', handleButtonMouseLeave);
        }
    });
    
    if (titleBackgroundImage) {
        titleBackgroundImage.addEventListener('mousemove', handleImageMouseMove);
        titleBackgroundImage.addEventListener('mouseleave', handleImageMouseLeave);
        // Ensure animation is off if glow is disabled by default or setting
        // This might be better handled by applyGlowSettings
    }

    // Sidebar toggling (basic example, might need more robust logic from script.js)
    if (themeButton && themeSidebar) {
        themeButton.addEventListener('click', () => toggleSidebar(themeSidebar, [settingsSidebar]));
    }
    if (settingsButton && settingsSidebar) {
        settingsButton.addEventListener('click', () => toggleSidebar(settingsSidebar, [themeSidebar]));
    }

    // Global click listener for closing sidebars (simplified from script.js)
    document.body.addEventListener('click', (event) => {
        const target = event.target;
        if (themeSidebar && !themeSidebar.contains(target) && target !== themeButton) {
            themeSidebar.classList.remove('open');
        }
        if (settingsSidebar && !settingsSidebar.contains(target) && target !== settingsButton) {
            settingsSidebar.classList.remove('open');
        }
        // Add credits sidebar logic if it's also managed here
    });
}


function toggleSidebar(sidebarToToggle, otherSidebars) {
    otherSidebars.forEach(sb => {
        if (sb && sb.classList.contains('open')) {
            sb.classList.remove('open');
        }
    });
    if (sidebarToToggle) {
        sidebarToToggle.classList.toggle('open');
    }
}


function changeTitleBackgroundImage() {
    if (!titleBackgroundImage) return;
    titleBackgroundImage.style.opacity = '0';

    setTimeout(() => {
        currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
        titleBackgroundImage.src = slideshowImages[currentImageIndex];
        titleBackgroundImage.style.opacity = '1';
    }, fadeDuration);
}

export function applyGlowSettings(color, enabled) {
    document.documentElement.style.setProperty('--glow-color', color);
    document.documentElement.style.setProperty('--glow-color-darker', adjustColorBrightness(color, -30));

    if (color && color.startsWith('#') && color.length === 7) {
        const r = parseInt(color.substring(1, 3), 16);
        const g = parseInt(color.substring(3, 5), 16);
        const b = parseInt(color.substring(5, 7), 16);
        document.documentElement.style.setProperty('--glow-color-rgb', `${r}, ${g}, ${b}`);
    } else {
        document.documentElement.style.setProperty('--glow-color-rgb', `0, 255, 255`); // Default
    }

    const allGlowElements = [
        ...document.querySelectorAll('.styled-button'),
        ...document.querySelectorAll('.game-list-button'),
        document.getElementById('title-background-image')
    ].filter(el => el);

    allGlowElements.forEach(element => {
        // Special case for popup close buttons, always no-glow
        if (element.textContent === 'X' && element.closest('.popup-container')) {
            element.classList.add('no-glow');
            return;
        }
        if (enabled) {
            element.classList.remove('no-glow');
        } else {
            element.classList.add('no-glow');
        }
    });
     // Re-apply mouse leave to reset transform if glow was just disabled
    if (!enabled && titleBackgroundImage) {
        handleImageMouseLeave({ target: titleBackgroundImage });
    }
}

function adjustColorBrightness(hex, percent) {
    let R = parseInt(hex.substring(1,3),16);
    let G = parseInt(hex.substring(3,5),16);
    let B = parseInt(hex.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    R = (R > 0) ? R : 0;
    G = (G > 0) ? G : 0;
    B = (B > 0) ? B : 0;

    R = Math.round(R).toString(16).padStart(2, '0');
    G = Math.round(G).toString(16).padStart(2, '0');
    B = Math.round(B).toString(16).padStart(2, '0');

    return "#"+R+G+B;
}


export function applyVideoBackground(videoUrl) {
    if (backgroundVideo && videoUrl) {
        backgroundVideo.innerHTML = `<source src="${videoUrl}" type="video/mp4">Your browser does not support the video tag.`;
        backgroundVideo.load();
    }
}

function handleButtonMouseMove(e) {
    const button = e.currentTarget; // Use currentTarget for attached listener
    if (!button || button.classList.contains('no-glow')) return;
    if (button.textContent === 'X' && button.closest('.popup-container')) return;


    const rect = button.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;

    const maxRotation = button.classList.contains('game-list-button') ? 10 : 20;
    const percentageX = mouseX / centerX;
    const percentageY = mouseY / centerY;
    const rotateY = percentageX * maxRotation;
    const rotateX = percentageY * maxRotation * -1; // Invert X rotation for natural feel

    if (button.classList.contains('game-list-button') && button.classList.contains('loaded')) {
        button.style.transform = `translateY(0) perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    } else if (button.classList.contains('styled-button') || button.id === 'top-right-button' || button.id === 'github-button' || button.id === 'bottom-right-github-button') {
        button.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
}

function handleButtonMouseLeave(e) {
    const button = e.currentTarget;
    if (!button) return;
    // Don't reset transform if glow is disabled, as it might look odd without the glow effect
    // if (button.classList.contains('no-glow')) return; 
    // Allow reset even if no-glow, to return to base state. Glow state controls the visual effect, not the transform.

    if (button.classList.contains('game-list-button') && button.classList.contains('loaded')) {
        button.style.transform = 'translateY(0) perspective(500px) rotateX(0) rotateY(0)';
    } else if (button.classList.contains('styled-button') || button.id === 'top-right-button' || button.id === 'github-button' || button.id === 'bottom-right-github-button') {
        button.style.transform = 'perspective(500px) rotateX(0) rotateY(0)';
    }
}

function handleImageMouseMove(e) {
    const image = e.currentTarget;
    if (!image || image.classList.contains('no-glow')) return;
    image.style.transform = 'translateX(-50%) scale(1.03)';
}

function handleImageMouseLeave(e) {
    const image = e.currentTarget;
    if (!image) return; // No need to check for no-glow, always reset
    image.style.transform = 'translateX(-50%) scale(1)';
}

export function showNotification(message, duration = 3000) {
    const notificationContainer = document.getElementById('theme-message-container');
    if (!notificationContainer) {
        console.error('Notification container #theme-message-container not found.');
        return;
    }

    const messageElement = document.createElement('div');
    messageElement.classList.add('theme-message'); // Re-using existing class
    messageElement.textContent = message;

    notificationContainer.appendChild(messageElement);
    // Force reflow to ensure animation plays
    void messageElement.offsetWidth; 
    
    requestAnimationFrame(() => {
        messageElement.classList.add('show');
    });

    setTimeout(() => {
        messageElement.classList.remove('show');
        messageElement.addEventListener('transitionend', () => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, { once: true });
    }, duration);
}
