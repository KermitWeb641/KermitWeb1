/**
 * Manages user settings including glow, background video, music, and save/load functionality.
 */

import { applyGlowSettings, applyVideoBackground } from "./ui.js"; // Import functions from ui.js
import { loadCurrentPlaylist } from "./music.js"; // Import function from music.js

// Setting Element references (will be passed during initialization)
let glowColorPicker;
let glowToggle;
let customPlaylistInput;
let saveSettingsButton;
let loadSettingsButton;
let loadSettingsInput;
let backgroundVideo; // Need access to apply video setting
let musicToggleButton; // Need access to toggle music bar class
let bottomBar; // Need access to toggle music bar class

// Default background video URL
const defaultBackgroundVideoUrl = "https://mods.store.gx.me/mods/de1b7f3e-200b-4030-96a5-935f9e9a4132/89d301bd-026e-4b1d-8453-033a09f27ff6/e5911994-7bf2-4a69-be14-896d60bbb9db/1434e61f-b962-4f35-9a8a-861cbab8bd20/contents/wallpaper/video2.mp4/mp4-1280?2338ec21d573a4d4de230c10e668108c"; // Hollow Knight

export function initSettings(elements) {
    // Assign element references
    glowColorPicker = elements.glowColorPicker;
    glowToggle = elements.glowToggle;
    customPlaylistInput = elements.customPlaylistInput;
    saveSettingsButton = elements.saveSettingsButton;
    loadSettingsButton = elements.loadSettingsButton;
    loadSettingsInput = elements.loadSettingsInput;
    backgroundVideo = elements.backgroundVideo;
    musicToggleButton = elements.musicToggleButton;
    bottomBar = elements.bottomBar;


    // Load settings from localStorage on initialization
    loadSettingsFromLocalStorage();

    // Add event listeners
    if (glowColorPicker) {
        glowColorPicker.addEventListener('input', (event) => {
            const selectedColor = event.target.value;
            applyGlowSettings(selectedColor, glowToggle.checked);
            localStorage.setItem('buttonGlowColor', selectedColor);
        });
    }

    if (glowToggle) {
        glowToggle.addEventListener('change', () => {
            applyGlowSettings(glowColorPicker.value, glowToggle.checked);
            localStorage.setItem('buttonGlowEnabled', glowToggle.checked);
        });
    }

     if (saveSettingsButton) {
        saveSettingsButton.addEventListener('click', saveSettings);
    }

    if (loadSettingsButton && loadSettingsInput) {
        loadSettingsButton.addEventListener('click', () => {
            loadSettingsInput.click();
        });

        loadSettingsInput.addEventListener('change', handleLoadSettingsFile);
    }

    // Note: Custom Playlist and Music Toggle listeners are handled in music.js
    //       because they directly interact with the music player state.
    //       Settings.js is responsible for saving/loading their state via applyLoadedSettings.
}

// Loads settings from localStorage and applies them
function loadSettingsFromLocalStorage() {
    const savedColor = localStorage.getItem('buttonGlowColor');
    if (savedColor) {
        if (glowColorPicker) glowColorPicker.value = savedColor;
        // Apply glow color and state directly through ui.js
    } else {
         if (glowColorPicker) glowColorPicker.value = '#00ffff'; // Default
    }

    const savedGlowState = localStorage.getItem('buttonGlowEnabled');
    if (savedGlowState !== null) {
         if (glowToggle) glowToggle.checked = JSON.parse(savedGlowState);
    } else {
         if (glowToggle) glowToggle.checked = true; // Default
    }

     // Apply glow settings based on loaded values
     applyGlowSettings(glowColorPicker ? glowColorPicker.value : '#00ffff', glowToggle ? glowToggle.checked : true);


    const savedVideoUrl = localStorage.getItem('backgroundVideoUrl');
    if (savedVideoUrl) {
        applyVideoBackground(savedVideoUrl);
    } else {
        applyVideoBackground(defaultBackgroundVideoUrl); // Default
    }

    const savedMusicBarHidden = localStorage.getItem('musicBarHidden');
    if (savedMusicBarHidden !== null && bottomBar && musicToggleButton) {
        const isHidden = JSON.parse(savedMusicBarHidden);
        if (isHidden) {
            bottomBar.classList.add('hidden');
            musicToggleButton.textContent = 'show music';
        } else {
            bottomBar.classList.remove('hidden');
            musicToggleButton.textContent = 'hide music';
        }
    } else if (bottomBar && musicToggleButton) {
        // Default state is visible
        bottomBar.classList.remove('hidden');
        musicToggleButton.textContent = 'hide music';
    }

    // Custom playlist URL is loaded by music.js's loadCurrentPlaylist function
    // but we can set the input value here if it exists in localStorage
    const customUrl = localStorage.getItem('customPlaylistUrl');
    if (customPlaylistInput && customUrl) {
        customPlaylistInput.value = customUrl;
    } else if (customPlaylistInput) {
        customPlaylistInput.value = '';
    }

    // Explicitly trigger music playlist load based on current localStorage
    loadCurrentPlaylist();
}

// Applies settings object loaded from a file
function applyLoadedSettings(settings) {
    if (settings.glowColor !== undefined && glowColorPicker) {
        glowColorPicker.value = settings.glowColor;
        localStorage.setItem('buttonGlowColor', settings.glowColor);
    }
    if (settings.glowEnabled !== undefined && glowToggle) {
        glowToggle.checked = settings.glowEnabled;
        localStorage.setItem('buttonGlowEnabled', settings.glowEnabled);
    }
    // Apply glow settings via ui.js after potentially updating elements
    applyGlowSettings(glowColorPicker ? glowColorPicker.value : '#00ffff', glowToggle ? glowToggle.checked : true);

    if (settings.backgroundVideoUrl !== undefined) {
        applyVideoBackground(settings.backgroundVideoUrl);
        localStorage.setItem('backgroundVideoUrl', settings.backgroundVideoUrl);
    }

    if (settings.customPlaylistUrl !== undefined && customPlaylistInput) {
        if (settings.customPlaylistUrl) {
            localStorage.setItem('customPlaylistUrl', settings.customPlaylistUrl);
            localStorage.removeItem('themePlaylistUrl'); // Loaded settings override theme setting
        } else {
            localStorage.removeItem('customPlaylistUrl');
        }
        customPlaylistInput.value = settings.customPlaylistUrl || '';
        loadCurrentPlaylist(); // Reload playlist based on new localStorage state
    }

    if (settings.musicBarHidden !== undefined && bottomBar && musicToggleButton) {
        const isHidden = settings.musicBarHidden;
        if (isHidden) {
            bottomBar.classList.add('hidden');
            musicToggleButton.textContent = 'show music';
        } else {
            bottomBar.classList.remove('hidden');
            musicToggleButton.textContent = 'hide music';
        }
        localStorage.setItem('musicBarHidden', isHidden);
    }

     // Optional: Add a message indicating settings were loaded
     const themeMessageContainer = document.getElementById('theme-message-container');
     if (themeMessageContainer) {
         const messageElement = document.createElement('div');
         messageElement.classList.add('theme-message');
         messageElement.textContent = "Settings loaded successfully!";
         themeMessageContainer.appendChild(messageElement);
         requestAnimationFrame(() => messageElement.classList.add('show'));
         setTimeout(() => {
             messageElement.classList.remove('show');
             messageElement.addEventListener('transitionend', () => {
                  if (messageElement.parentNode) messageElement.parentNode.removeChild(messageElement);
             });
         }, 3000);
     }
}

// Saves current settings to a JSON file
function saveSettings() {
    const settings = {
        glowColor: glowColorPicker ? glowColorPicker.value : '#00ffff',
        glowEnabled: glowToggle ? glowToggle.checked : true,
        backgroundVideoUrl: backgroundVideo ? backgroundVideo.querySelector('source')?.src : defaultBackgroundVideoUrl,
        musicBarHidden: bottomBar ? bottomBar.classList.contains('hidden') : false,
        customPlaylistUrl: customPlaylistInput ? customPlaylistInput.value : ''
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
}

// Handles the file input change for loading settings
function handleLoadSettingsFile(event) {
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

    event.target.value = null; // Reset file input
}

// Expose a function to get the current background video URL (needed by theme.js)
export function getCurrentBackgroundVideoUrl() {
    return localStorage.getItem('backgroundVideoUrl') || defaultBackgroundVideoUrl;
}