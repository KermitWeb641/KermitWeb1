import { initSearch } from "./search.js";
import { initTheme } from "./theme.js";
import { initGames, gameData, openGameInNewTab } from "./games.js";

const backgroundVideo = document.getElementById('background-video');
const themeSidebar = document.getElementById('theme-sidebar');
const themeButton = document.getElementById('theme-button');
const settingsButton = document.getElementById('settings-button');
const settingsSidebar = document.getElementById('settings-sidebar');
const creditsButton = document.getElementById('credits-button');
const creditsSidebar = document.getElementById('credits-sidebar');
const gameCountDisplay = document.getElementById('game-count');
const titleBackgroundImage = document.getElementById('title-background-image');
const bottomBar = document.getElementById('bottom-bar');
const musicToggleButton = document.getElementById('music-toggle-button');
const spotifyIframe = document.getElementById('spotify-iframe');
const customPlaylistInput = document.getElementById('custom-playlist-input');
const setPlaylistButton = document.getElementById('set-playlist-button');
const visitorCounterElement = document.getElementById('visitor-counter');
const pingCounterElement = document.getElementById('ping-counter');
const fpsCounterElement = document.getElementById('fps-counter');
let pingIntervalId = null;

const topRightButton = document.getElementById('top-right-button');
const githubButton = document.getElementById('github-button');
const bottomRightGithubButton = document.getElementById('bottom-right-github-button');

const gameListButtons = document.querySelectorAll('.game-list-button'); 
const styledButtons = document.querySelectorAll('.styled-button');

const glowColorPicker = document.getElementById('glow-color-picker');
const glowToggle = document.getElementById('glow-toggle');
const darkModeToggle = document.getElementById('dark-mode-toggle');

const saveSettingsButton = document.getElementById('save-settings-button');
const loadSettingsButton = document.getElementById('load-settings-button');
const loadSettingsInput = document.getElementById('load-settings-input');
const loadingScreen = document.getElementById('loading-screen'); // Added loading screen element

let lastFrameTime = performance.now();
let frameCount = 0;
let fpsUpdateInterval = 1000;
let lastFpsUpdateTime = performance.now();

const slideshowImages = [
    'https://i0.wp.com/615film.com//wp-content/uploads/2017/10/Feature-Image.jpg?ssl=1',
    'https://pixeldie.com/wp-content/uploads/2020/12/20201213195528_1.jpg?w=816',
    'https://storymuseum.s3-assets.com/_1023x682_crop_center-center_80_none/1001_Undertale.png',
    'https://fnf-online.org/data/image/posts/fnf-online-game-image2.jpg',
    'https://cdn.mobygames.com/covers/11288398-pizza-tower-windows-front-cover.jpg',
    'https://images4.alphacoders.com/659/659657.jpg',
    'https://pbs.twimg.com/media/Cy1Em3QVEAA_e2i.jpg:large',
    'https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=png/99e090d154caf30f3625df7e456d5984.png',
    'https://assetsio.gnwcdn.com/paper-mario-the-thousand-year-door-remake-header.png?width=1200&height=630&fit=crop&enable=upscale&auto=webp',
];
let currentImageIndex = 0;
const slideshowInterval = 10000;
const fadeDuration = 500;

const defaultSpotifySrc = 'https://open.spotify.com/embed/playlist/4rDW63aN3C3BGKy1FVHDyG?utm_source=generator&repeat=true';

function changeTitleBackgroundImage() {
    titleBackgroundImage.style.opacity = '0';

    setTimeout(() => {
        currentImageIndex = (currentImageIndex + 1) % slideshowImages.length
        titleBackgroundImage.src = slideshowImages[currentImageIndex];

        titleBackgroundImage.style.opacity = '1';
    }, fadeDuration);
}

setInterval(changeTitleBackgroundImage, slideshowInterval);

gameCountDisplay.textContent = `Total Games: ${Object.keys(gameData).length}`;

function formatSpotifyEmbedUrl(playlistUrl) {
    try {
        const url = new URL(playlistUrl);
        if (url.hostname === 'open.spotify.com' && url.pathname.startsWith('/playlist/')) {
            const playlistId = url.pathname.split('/')[2];
            return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&repeat=true`;
        }
        if (url.protocol === 'spotify:' && url.pathname.startsWith('playlist:')) {
            const playlistId = url.pathname.split(':')[1];
            return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&repeat=true`;
        }
        if (url.hostname === 'open.spotify.com' && url.pathname.startsWith('/embed/playlist/')) {
            return playlistUrl;
        }
    } catch (e) {
        console.error("Invalid Spotify playlist URL format:", playlistUrl, e);
    }
    return null;
}

function showThemeMessage(message) {
    const themeMessageContainer = document.getElementById('theme-message-container');
    const messageElement = document.createElement('div');
    messageElement.classList.add('theme-message');
    messageElement.textContent = message;

    themeMessageContainer.appendChild(messageElement);
    requestAnimationFrame(() => {
        messageElement.classList.add('show');
    });

    setTimeout(() => {
        messageElement.classList.remove('show');
        messageElement.addEventListener('transitionend', () => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        });
    }, 3000);
}

function loadCurrentPlaylist() {
    const customUrl = localStorage.getItem('customPlaylistUrl');
    const themeUrl = localStorage.getItem('themePlaylistUrl');

    let srcToLoad = defaultSpotifySrc;

    if (customUrl) {
        const embedUrl = formatSpotifyEmbedUrl(customUrl);
        if (embedUrl) {
            srcToLoad = embedUrl;
            if (customPlaylistInput) {
                customPlaylistInput.value = customUrl;
            }
        } else {
            console.error("Saved custom playlist URL is invalid, loading theme or default.");
            localStorage.removeItem('customPlaylistUrl');
            loadCurrentPlaylist();
            return;
        }
    } else if (themeUrl) {
        const embedUrl = formatSpotifyEmbedUrl(themeUrl);
        if(embedUrl) {
            srcToLoad = embedUrl;
            if (customPlaylistInput) {
                customPlaylistInput.value = '';
            }
        } else {
            console.error("Saved theme playlist URL is invalid, loading default.");
            localStorage.removeItem('themePlaylistUrl');
            loadCurrentPlaylist();
            return;
        }
    } else {
        if (customPlaylistInput) {
            customPlaylistInput.value = '';
        }
    }

    if (spotifyIframe) {
        spotifyIframe.src = srcToLoad;
    }
}

initTheme(themeButton, themeSidebar, backgroundVideo, spotifyIframe, showThemeMessage, loadCurrentPlaylist);
initSearch(gameData);

initGames(gameData, gameListButtons); 

function applyGlowColor(color) {
    document.documentElement.style.setProperty('--glow-color', color);
    document.documentElement.style.setProperty('--glow-color-darker', adjustColorBrightness(color, -30));

    // Extract RGB components from hex for the top glow and other RGBA uses
    if (color && color.startsWith('#') && color.length === 7) {
        const r = parseInt(color.substring(1, 3), 16);
        const g = parseInt(color.substring(3, 5), 16);
        const b = parseInt(color.substring(5, 7), 16);
        document.documentElement.style.setProperty('--glow-color-rgb', `${r}, ${g}, ${b}`);
    } else {
        // Fallback for default or invalid color
        document.documentElement.style.setProperty('--glow-color-rgb', `0, 255, 255`); // Default to cyan
    }
}

function adjustColorBrightness(hex, percent) {
    let R = parseInt(hex.substring(1, 3), 16);
    let G = parseInt(hex.substring(3, 5), 16);
    let B = parseInt(hex.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    R = (R > 0) ? R : 0;
    G = (G > 0) ? G : 0;
    B = (B > 0) ? B : 0;

    R = Math.round(R).toString(16).length === 1 ? "0" + Math.round(R).toString(16) : Math.round(R).toString(16);
    G = Math.round(G).toString(16).length === 1 ? "0" + Math.round(G).toString(16) : Math.round(G).toString(16);
    B = Math.round(B).toString(16).length === 1 ? "0" + Math.round(B).toString(16) : Math.round(B).toString(16);

    return "#" + R + G + B;
}

function updateGlowState() {
    const enableGlow = glowToggle.checked;
    const allGlowElements = [...styledButtons, ...gameListButtons, titleBackgroundImage]; 

    allGlowElements.forEach(element => {
        if (element.textContent === 'X' && element.closest('.popup-container')) {
            element.classList.add('no-glow');
            return;
        }

        if (enableGlow) {
            element.classList.remove('no-glow');
        } else {
            element.classList.add('no-glow');
        }
    });
}

function applyLoadedSettings(settings) {
    if (settings.glowColor) {
        glowColorPicker.value = settings.glowColor;
        applyGlowColor(settings.glowColor);
        localStorage.setItem('buttonGlowColor', settings.glowColor);
    }
    if (settings.glowEnabled !== undefined) {
        glowToggle.checked = settings.glowEnabled;
        updateGlowState();
        localStorage.setItem('buttonGlowEnabled', settings.glowEnabled);
    }
    if (settings.backgroundVideoUrl) {
        backgroundVideo.innerHTML = `<source src="${settings.backgroundVideoUrl}" type="video/mp4">Your browser does not support the video tag.`;
        backgroundVideo.load();
        localStorage.setItem('backgroundVideoUrl', settings.backgroundVideoUrl);
    }

    if (settings.customPlaylistUrl !== undefined) {
        if (settings.customPlaylistUrl) {
            localStorage.setItem('customPlaylistUrl', settings.customPlaylistUrl);
            localStorage.removeItem('themePlaylistUrl');
        } else {
            localStorage.removeItem('customPlaylistUrl');
        }
        loadCurrentPlaylist();
    }

    if (settings.musicBarHidden !== undefined) {
        if (settings.musicBarHidden) {
            bottomBar.classList.add('hidden');
            musicToggleButton.textContent = 'show music';
        } else {
            bottomBar.classList.remove('hidden');
            musicToggleButton.textContent = 'hide music';
        }
        localStorage.setItem('musicBarHidden', settings.musicBarHidden);
    }
    if (settings.darkModeEnabled !== undefined) {
        darkModeToggle.checked = settings.darkModeEnabled;
        applyDarkMode(settings.darkModeEnabled);
        localStorage.setItem('darkModeEnabled', settings.darkModeEnabled);
    }
}

// Function to apply dark mode
function applyDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

async function measurePing() {
    if (!pingCounterElement) return;

    const startTime = performance.now();
    try {
        const resourceUrl = window.location.href.split('?')[0].split('#')[0] + '?pingCacheBust=' + Date.now();
        await fetch(resourceUrl, { method: 'HEAD', cache: 'no-store', mode: 'cors' });
        const endTime = performance.now();
        const ping = Math.round(endTime - startTime);
        pingCounterElement.textContent = `Ping: ${ping} ms`;
    } catch (error) {
        pingCounterElement.textContent = 'Ping: N/A';
    }
}

function updateFPS() {
    const now = performance.now();
    frameCount++;
    const deltaTime = now - lastFrameTime;
    lastFrameTime = now;

    if (now - lastFpsUpdateTime > fpsUpdateInterval) {
        const fps = Math.round((frameCount * 1000) / (now - lastFpsUpdateTime));
        if (fpsCounterElement) {
            fpsCounterElement.textContent = `FPS: ${fps}`;
        }
        frameCount = 0;
        lastFpsUpdateTime = now;
    }
    requestAnimationFrame(updateFPS);
}

function startPingMeasurement() {
    measurePing();
    if (pingIntervalId) clearInterval(pingIntervalId);
    pingIntervalId = setInterval(measurePing, 5000);
}

function updateVisitorCount() {
    if (!visitorCounterElement) return;
    let visitorCount = parseInt(localStorage.getItem('visitorCountKermitWeb') || '0');
    
    // Only increment if this is a new session or the first visit in a while
    // For simplicity, we'll increment on every page load for now.
    // A more robust solution would involve session tracking or server-side logic.
    visitorCount++;
    localStorage.setItem('visitorCountKermitWeb', visitorCount.toString());
    visitorCounterElement.textContent = `Visitors: ${visitorCount}`;
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

// Alias openGameInNewTab for clarity in its specific use case here
const openInGameWindowViaIframe = (name, url, redirectOriginal = true) => {
    openGameInNewTab(name, url, redirectOriginal, true); // Explicitly use iframe
};

window.addEventListener('load', () => {
    // Add loading-active class to body to prevent scrolling
    document.body.classList.add('loading-active');

    // This call is intended to cloak the main page by opening it within an iframe in a new tab,
    // and then redirecting the original tab.
    // Only run this self-cloaking if the current window is the top-level window.
    if (window.self === window.top) {
        openInGameWindowViaIframe("Kermit Web", window.location.href, true);
    }

    const savedColor = localStorage.getItem('buttonGlowColor');
    if (savedColor) {
        glowColorPicker.value = savedColor;
        applyGlowColor(savedColor);
    } else {
        applyGlowColor(glowColorPicker.value);
    }

    const savedGlowState = localStorage.getItem('buttonGlowEnabled');
    if (savedGlowState !== null) {
        glowToggle.checked = JSON.parse(savedGlowState);
    } else {
        glowToggle.checked = true;
    }

    updateGlowState();

    // Dark Mode Load
    const savedDarkModeState = localStorage.getItem('darkModeEnabled');
    if (savedDarkModeState !== null) {
        darkModeToggle.checked = JSON.parse(savedDarkModeState);
    } else {
        darkModeToggle.checked = false; // Default to light mode
    }
    applyDarkMode(darkModeToggle.checked);

    const currentVideoSource = backgroundVideo.querySelector('source');
    const hollowKnightUrl = "https://mods.store.gx.me/mods/de1b7f3e-200b-4030-96a5-935f9e9a4132/89d301bd-026e-4b1d-8453-033a09f27ff6/e5911994-7bf2-4a69-be14-896d60bbb9db/1434e61f-b962-4f35-9a8a-861cbab8bd20/contents/wallpaper/video2.mp4/mp4-1280?2338ec21d573a4d4de230c10e668108c";

    const savedVideoUrl = localStorage.getItem('backgroundVideoUrl');

    if (savedVideoUrl) {
        backgroundVideo.innerHTML = `<source src="${savedVideoUrl}" type="video/mp4">Your browser does not support the video tag.`;
        backgroundVideo.load();
    } else {
        backgroundVideo.innerHTML = `<source src="${hollowKnightUrl}" type="video/mp4"">Your browser does not support the video tag.`;
        backgroundVideo.load();
    }

    const savedMusicBarHidden = localStorage.getItem('musicBarHidden');
    if (savedMusicBarHidden !== null) {
        const isHidden = JSON.parse(savedMusicBarHidden);
        if (isHidden) {
            bottomBar.classList.add('hidden');
            musicToggleButton.textContent = 'show music';
        } else {
            bottomBar.classList.remove('hidden');
            musicToggleButton.textContent = 'hide music';
        }
    } else {
        bottomBar.classList.remove('hidden');
        musicToggleButton.textContent = 'hide music';
    }

    loadCurrentPlaylist();
    startPingMeasurement();
    requestAnimationFrame(updateFPS);
    updateVisitorCount();

    // Hide loading screen after a short delay
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.classList.remove('loading-active'); // Re-enable scrolling

            // Optional: Remove the loading screen from DOM after transition
            loadingScreen.addEventListener('transitionend', () => {
                if (loadingScreen.classList.contains('hidden') && loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            });
        }, 100); // Short delay to allow initial rendering and script execution
    }
});

if (glowColorPicker) {
    glowColorPicker.addEventListener('input', (event) => {
        const selectedColor = event.target.value;
        applyGlowColor(selectedColor);
        localStorage.setItem('buttonGlowColor', selectedColor);
    });
}

if (glowToggle) {
    glowToggle.addEventListener('change', () => {
        updateGlowState();
        localStorage.setItem('buttonGlowEnabled', glowToggle.checked);
    });
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
        applyDarkMode(darkModeToggle.checked);
        localStorage.setItem('darkModeEnabled', darkModeToggle.checked);
    });
}

if (saveSettingsButton) {
    saveSettingsButton.addEventListener('click', () => {
        const settings = {
            glowColor: glowColorPicker.value,
            glowEnabled: glowToggle.checked,
            darkModeEnabled: darkModeToggle.checked, 
            backgroundVideoUrl: backgroundVideo.querySelector('source').src,
            musicBarHidden: bottomBar.classList.contains('hidden'),
            customPlaylistUrl: customPlaylistInput.value
        };

        const dataStr = JSON.stringify(settings, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'kermit_web_settings.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

if (loadSettingsButton && loadSettingsInput) {
    loadSettingsButton.addEventListener('click', () => {
        loadSettingsInput.click();
    });

    loadSettingsInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const settings = JSON.parse(e.target.result);
                applyLoadedSettings(settings);
            } catch (error) {
                console.error("Error parsing settings file:", error);
                alert("Could not load settings file. Please ensure it is a valid JSON file.");
            }
        };
        reader.readAsText(file);

        event.target.value = null;
    });
}

if (musicToggleButton) {
    musicToggleButton.addEventListener('click', () => {
        const isHidden = bottomBar.classList.toggle('hidden');
        musicToggleButton.textContent = isHidden ? 'show music' : 'hide music';
        localStorage.setItem('musicBarHidden', isHidden);
    });
}

if (customPlaylistInput && setPlaylistButton) {
    setPlaylistButton.addEventListener('click', () => {
        const embedUrl = formatSpotifyEmbedUrl(customPlaylistInput.value);
        if (embedUrl) {
            localStorage.setItem('customPlaylistUrl', customPlaylistInput.value);
            localStorage.removeItem('themePlaylistUrl'); 
            loadCurrentPlaylist();
        } else {
            console.error("Invalid custom playlist URL format.");
            alert("Invalid custom playlist URL format. Please enter a valid Spotify playlist URL.");
        }
    });
}

gameListButtons.forEach((button, index) => { 
    setTimeout(() => {
        button.classList.add('loaded');

        button.addEventListener('mousemove', handleButtonMouseMove);
        button.addEventListener('mouseleave', handleButtonMouseLeave);

    }, 100 * index); 
});

if (topRightButton) {
    topRightButton.addEventListener('mousemove', handleButtonMouseMove);
    topRightButton.addEventListener('mouseleave', handleButtonMouseLeave);
    topRightButton.addEventListener('click', () => {
        window.open('https://discord.com/invite/82SkEpke', '_blank');
    });
}

if (githubButton) {
    githubButton.addEventListener('mousemove', handleButtonMouseMove);
    githubButton.addEventListener('mouseleave', handleButtonMouseLeave);
    githubButton.addEventListener('click', () => {
        window.open('https://suroi-client-aafm-kermit641s-projects.vercel.app', '_blank');
    });
}

if (bottomRightGithubButton) {
    bottomRightGithubButton.addEventListener('mousemove', handleButtonMouseMove);
    bottomRightGithubButton.addEventListener('mouseleave', handleButtonMouseLeave);
    bottomRightGithubButton.addEventListener('click', () => {
        window.open('https://github.com/KermitWeb641/KermitWeb1', '_blank'); 
    });
}

styledButtons.forEach(button => {
    if (button !== topRightButton && button !== githubButton && button !== bottomRightGithubButton) {
        button.addEventListener('mousemove', handleButtonMouseMove);
        button.addEventListener('mouseleave', handleButtonMouseLeave);
    }
});

settingsButton.addEventListener('click', function() {
    toggleSidebar(settingsSidebar, [themeSidebar, creditsSidebar]);
});

themeButton.addEventListener('click', function() {
    toggleSidebar(themeSidebar, [settingsSidebar, creditsSidebar]);
});

if (creditsButton) {
    creditsButton.addEventListener('click', function() {
        toggleSidebar(creditsSidebar, [themeSidebar, settingsSidebar]);
    });
}

document.body.addEventListener('click', function(event) {
    const target = event.target;

    if (themeSidebar && !themeSidebar.contains(target) && target !== themeButton) {
        themeSidebar.classList.remove('open');
    }
    if (settingsSidebar && !settingsSidebar.contains(target) && target !== settingsButton) {
        settingsSidebar.classList.remove('open');
    }
    if (creditsSidebar && !creditsSidebar.contains(target) && target !== creditsButton) {
        creditsSidebar.classList.remove('open');
    }

    if ((target === musicToggleButton || (bottomBar && bottomBar.contains(target)))) {
        if (themeSidebar && themeSidebar.classList.contains('open') && !themeSidebar.contains(target)) {
            themeSidebar.classList.remove('open');
        }
        if (settingsSidebar && settingsSidebar.classList.contains('open') && !settingsSidebar.contains(target)) {
            settingsSidebar.classList.remove('open');
        }
        if (creditsSidebar && creditsSidebar.classList.contains('open') && !creditsSidebar.contains(target)) {
            creditsSidebar.classList.remove('open');
        }
    }
});

if (titleBackgroundImage) {
    titleBackgroundImage.addEventListener('mousemove', handleImageMouseMove);
    titleBackgroundImage.addEventListener('mouseleave', handleImageMouseLeave);
    titleBackgroundImage.style.animation = 'none';
}

function handleButtonMouseMove(e) {
    const button = e.target.closest('button');

    if (!button) return;

    const isStyledButton = button.classList.contains('styled-button') || button.classList.contains('settings-button');
    const isGameListButton = button.classList.contains('game-list-button'); 
    const isTopRightButton = button.id === 'top-right-button';
    const isGithubButton = button.id === 'github-button';
    const isBottomRightGithubButton = button.id === 'bottom-right-github-button';


    if (button.textContent === 'X' && button.closest('.popup-container')) {
        return;
    }

    if (!isStyledButton && !isGameListButton && !isTopRightButton && !isGithubButton && !isBottomRightGithubButton) { 
        return;
    }

    if (button.classList.contains('no-glow')) {
        return;
    }

    const rect = button.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;

    const maxRotation = isGameListButton ? 10 : 20; 

    const percentageX = mouseX / centerX;
    const percentageY = mouseY / centerY;

    const rotateY = percentageX * maxRotation;
    const rotateX = percentageY * maxRotation;

    if (isGameListButton) { 
        button.style.transform = `translateY(0) perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    } else if (isStyledButton || isTopRightButton || isGithubButton || isBottomRightGithubButton) {
        button.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
}

function handleButtonMouseLeave(e) {
    const button = e.target.closest('button');

    if (!button) return;

    const isStyledButton = button.classList.contains('styled-button') || button.classList.contains('settings-button');
    const isGameListButton = button.classList.contains('game-list-button'); 
    const isTopRightButton = button.id === 'top-right-button';
    const isGithubButton = button.id === 'github-button';
    const isBottomRightGithubButton = button.id === 'bottom-right-github-button';

    if (button.textContent === 'X' && button.closest('.popup-container')) {
        return;
    }

    if (!isStyledButton && !isGameListButton && !isTopRightButton && !isGithubButton && !isBottomRightGithubButton) { 
        return;
    }

    if (button.classList.contains('no-glow')) {
        return;
    }

    if (isGameListButton) { 
        button.style.transform = 'translateY(0) perspective(500px) rotateX(0) rotateY(0)';
    } else if (isStyledButton || isTopRightButton || isGithubButton || isBottomRightGithubButton) {
        button.style.transform = 'perspective(500px) rotateX(0) rotateY(0)';
    }
}

function handleImageMouseMove(e) {
    const image = e.target.closest('#title-background-image');
    if (!image || image.classList.contains('no-glow')) return;

    image.style.transform = 'translateX(-50%) scale(1.03)';
}

function handleImageMouseLeave(e) {
    const image = e.target.closest('#title-background-image');
    if (!image || image.classList.contains('no-glow')) return;

    image.style.transform = 'translateX(-50%) scale(1)';
}
