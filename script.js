// script.js
document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('videoPlayer');
    const playlistItems = document.querySelectorAll('.playlist-overlay li');
    const togglePlaylistBtn = document.getElementById('togglePlaylist');
    const playlistOverlay = document.getElementById('playlistOverlay');

    // Function to generate a unique key for each video based on its source URL
    function generateVideoTimeKey(videoSrc) {
        return `videoTime_${encodeURIComponent(videoSrc)}`;
    }

    // Save the current video time to localStorage
    function saveCurrentTime() {
        const videoSrc = videoPlayer.querySelector('source').src;
        const videoTimeKey = generateVideoTimeKey(videoSrc);
        localStorage.setItem(videoTimeKey, videoPlayer.currentTime);
    }

    // Load the saved video time from localStorage
    function loadSavedTime() {
        const videoSrc = videoPlayer.querySelector('source').src;
        const videoTimeKey = generateVideoTimeKey(videoSrc);
        const savedTime = localStorage.getItem(videoTimeKey);
        if (savedTime) {
            videoPlayer.currentTime = parseFloat(savedTime);
        }
    }

    // Event listener to save the time when the video is paused or when the page is unloaded
    videoPlayer.addEventListener('pause', saveCurrentTime);
    window.addEventListener('beforeunload', saveCurrentTime);

    // Load saved time when the video metadata is loaded
    videoPlayer.addEventListener('loadedmetadata', loadSavedTime);

    // Play the selected video from the playlist
    playlistItems.forEach(item => {
        item.addEventListener('click', function() {
            const newSrc = item.getAttribute('data-src');
            videoPlayer.querySelector('source').src = newSrc;
            videoPlayer.load();
            videoPlayer.play();
            playlistOverlay.style.display = 'none'; // Hide the playlist
        });
    });

    // Toggle the playlist visibility
    togglePlaylistBtn.addEventListener('click', function() {
        if (playlistOverlay.style.display === 'none' || playlistOverlay.style.display === '') {
            playlistOverlay.style.display = 'block';
            togglePlaylistBtn.textContent = 'Hide Playlist';
        } else {
            playlistOverlay.style.display = 'none';
            togglePlaylistBtn.textContent = 'Show Playlist';
        }
    });

    // Initially hide the playlist overlay
    playlistOverlay.style.display = 'none';
});
