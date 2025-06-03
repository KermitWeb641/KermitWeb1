export function initTheme(themeButton, themeSidebar, backgroundVideo, settingsSidebar, spotifyIframe) {

    // Theme data: [title, thumbnail_url, video_url, optional_spotify_url]
    const themes = [
        ["Minecraft Cherry Blossom", "https://blog.shockbyte.com/content/images/2025/03/cherry-blossom-grove-in-minecraft.jpg", "https://mods.store.gx.me/mods/d11216fa-e804-4728-9232-0822d7d4d590/ab6462da-d1c3-4d2b-b707-fcab2cf6400b/bddb5dca-1999-401a-bd7e-ffca88600a6e/71d7a02c-5c9d-43ba-ae47-e6e030c647b3/contents/wallpaper/video.mp4"],
        ["Cozy Undertale", "https://i.ytimg.com/vi/t-jENvMtE9I/maxresdefault.jpg", "https://mods.store.gx.me/mods/9826c29e-8ac0-456b-80d4-ca0e2585957a/5e671657-3084-4059-be6a-977e3c9209b0/a9d48786-6d70-4242-b790-8234a3db7438/b69f2cdf-0315-4add-9214-e2980ad1b2d0/contents/wallpaper/video.webm/mp4-1280?858db9a0121e2268a537b8e0c31118c2", "https://open.spotify.com/embed/album/2M2Ae2SvZe3fmzUtlVOV5Z?utm_source=generator"],
        ["Zelda Breath of the Wild", "https://zelda.nintendo.com/breath-of-the-wild/assets/media/wallpapers/desktop-1.jpg", "https://mods.store.gx.me/mods/5f76a26b-1dee-433e-b092-1d46160b41b5/8ea6f98a-efb6-46dd-ad94-7c465cfed851/401e3a0e-535c-4d09-9beb-9916e93dcf01/eb0fe1ea-1713-434f-a908-6720431141a2/contents/wallpaper/videoplayback.webm/mp4-1280?49bd08acd230f77b96743e4ccfba63fb", "https://open.spotify.com/embed/playlist/4ktUPf6I5s4HCVWcUDC0qI?utm_source=generator"],
        ["Pokemon Emerald", "https://i.ytimg.com/vi/IHGyqB4g4ho/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGDQgXShlMA8=&rs=AOn4CLCawZZYw4PC3BWsaQ-jfcFBqYQsxA", "https://mods.store.gx.me/mods/41f406ac-5918-4857-8a35-c2fe4c1faad9/39577161-40a6-49fa-abfa-c38569b6cf3a/0ae2a98f-163e-43ec-a1b6-c86e844d87af/53a812f4-c821-40e5-85cd-82f164a5b0ce/contents/wallpaper/Pokemon%20Rayquaza.webm/mp4-1280?b7e1f380764ddeec2c3c8edfd09effe1", "https://open.spotify.com/embed/playlist/0PsgzwM6v2bPV1oQyLpAHU?utm_source=generator&theme=0"],
        ["Hollow Knight", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg?t=1695270428", "https://mods.store.gx.me/mods/de1b7f3e-200b-4030-96a5-935f9e9a4132/89d301bd-026e-4b1d-8453-033a09f27ff6/e5911994-7bf2-4a69-be14-896d60bbb9db/1434e61f-b962-4f35-9a8a-861cbab8bd20/contents/wallpaper/video2.mp4/mp4-1280?2338ec21d573a4d4de230c10e668108c", "https://open.spotify.com/embed/album/4XgGOMRY7H4hl6OQi5wb2Z?utm_source=generator"],
        ["Sonic Frontiers", "https://frontiers.sonicthehedgehog.com/img/media/animation_02_thumb.jpg", "https://mods.store.gx.me/mods/43d8317d-9183-47c5-852a-fb4c75d77157/27d60adf-bd59-4edd-932f-120c39f25d4b/7bc53a3e-146d-4cf0-ad77-f88893a0f165/0e81b3b7-4e0f-464f-907a-5f1776b87ce7/contents/wallpaper/light.webm/mp4-1280?d6f4eb2815e9d29c4f53d550e63e3434", "https://open.spotify.com/embed/album/52exAJ8OkzVCXKTJ2FrcYA?utm_source=generator"],
        ["Car 4K", "https://img.freepik.com/free-photo/anime-car-city_23-2151710993.jpg", "https://mods.store.gx.me/mods/c78fe56b-1532-45f2-94de-1dcd7c7dcc7a/b23cecd8-2f10-4dfb-a5b3-2044807a1af5/ced2e9e2-9d30-437d-8af4-f711e02c26e1/71b37d60-b0ff-4de8-acb5-c33ae0db5592/contents/wallpaper/dark.webm/mp4-1280?506c6053457aea274957fbfcc48a0682"],
        ["Goku Chill", "https://wallpapers-clan.com/wp-content/uploads/2025/01/dragon-ball-goku-cloudscape-desktop-wallpaper-preview.jpg", "https://mods.store.gx.me/mods/77f575c8-6444-4834-b679-aba0b3fd1e56/38b2b30c-5ffb-4c5c-a4f5-bc0edaccc7c2/52e5936c-f17a-4d63-9b47-fb2a66d58805/e278c2a0-9557-436c-9032-b3dda6e6d29e/contents/wallpaper/Goku.webm/mp4-1280?1b02601fb66bf7fe5f2f3e33608da0a8"],
        ["D4DJ", "https://mods.store.gx.me/mods/4cfb7cc1-4fb2-4112-b520-e30563a01ac8/13bdb495-7e2c-40f4-bd93-b9b99f490ea8/ab321f3f-3b43-457a-8947-dff479185f3e/contents/D4DJTHUMBNAIL.png?9879c2739085da9c71b064cc389015b3", "https://mods.store.gx.me/mods/4cfb7cc1-4fb2-4112-b520-e30563a01ac8/13bdb495-7e2c-40f4-bd93-b9b99f490ea8/ab321f3f-3b43-457a-8947-dff479185f3e/61f0c845-0706-4eff-9d65-cb2829c54aea/contents/D4DJVIDEO.webm/mp4-1280?b50a35a0d725f0d4731768b2152d743b"],
        ["Oddish x Arcanine", "https://motionbgs.com/i/c/960x540/media/183/arcanine-and-oddish.jpg", "https://motionbgs.com/media/183/arcanine-and-oddish.960x540.mp4"]
    ];

    const themeMessageContainer = document.getElementById('theme-message-container');

    function showThemeMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('theme-message');
        messageElement.textContent = message;

        // Append to container and immediately trigger the 'show' class for animation
        themeMessageContainer.appendChild(messageElement);
        requestAnimationFrame(() => {
            messageElement.classList.add('show');
        });

        // Hide the message after 3 seconds
        setTimeout(() => {
            messageElement.classList.remove('show');
            // Remove the element after the transition
            messageElement.addEventListener('transitionend', () => {
                 if (messageElement.parentNode) {
                    messageElement.parentNode.removeChild(messageElement);
                 }
            });
        }, 3000); // Adjust duration as needed
    }

    themes.forEach(theme => {
        const newThemeOption = document.createElement('div');
        newThemeOption.classList.add('theme-option');
        newThemeOption.title = theme[0];
        newThemeOption.innerHTML = `<img src="${theme[1]}">`;
        newThemeOption.addEventListener('click', function() {
            showThemeMessage(`Applying theme: ${theme[0]}`); // Show message on click
            backgroundVideo.innerHTML = `<source src="${theme[2]}" type="video/mp4">Your browser does not support the video tag.`;
            backgroundVideo.load();
            localStorage.setItem('backgroundVideoUrl', theme[2]);

            // Apply theme playlist only if no custom playlist is set
            if (!localStorage.getItem('customPlaylistUrl') && theme[3]) {
                 if (spotifyIframe) {
                    spotifyIframe.src = theme[3];
                    localStorage.setItem('themePlaylistUrl', theme[3]);
                 }
            } else if (!localStorage.getItem('customPlaylistUrl') && !theme[3]) {
                 // If no custom playlist and theme has no playlist, remove theme playlist from storage
                 localStorage.removeItem('themePlaylistUrl');
            }
        });
        if(themeSidebar) {
            themeSidebar.appendChild(newThemeOption);
        }
    });

    function getBackgroundVideo() {
        return localStorage.getItem('backgroundVideoUrl');
    }
}
