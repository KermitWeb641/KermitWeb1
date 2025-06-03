/**
 * Manages the Spotify iframe, music toggle, and custom playlist input.
 */

// Music Element references (will be passed during initialization)
let bottomBar;
let musicToggleButton;
let spotifyIframe;
let customPlaylistInput;
let setPlaylistButton;

// Default Spotify playlist URL
const defaultSpotifySrc = 'https://open.spotify.com/embed/playlist/4rDW63aN3C3BGKy1FVHDyG?utm_source=generator&repeat=true';

export function initMusic(elements) {
    // Assign element references
    bottomBar = elements.bottomBar;
    musicToggleButton = elements.musicToggleButton;
    spotifyIframe = elements.spotifyIframe;
}