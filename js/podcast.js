const audioPlayer = document.getElementById('footer-audio-player');
const playPauseButton = document.getElementById('footer-play-pause-button');
const prevButton = document.getElementById('footer-prev-button');
const nextButton = document.getElementById('footer-next-button');
const progress = document.getElementById('footer-progress');
const progressBar = document.getElementById('footer-progress-bar');
const currentTimeDisplay = document.getElementById('footer-current-time');
const totalTimeDisplay = document.getElementById('footer-total-time');
const songTitleDisplay = document.getElementById('footer-song-title');
const songThumbnailDisplay = document.getElementById('footer-song-thumbanil');
var songs = [];
var currentSongIndex = parseInt(localStorage.getItem('footer_currentSongIndex')) || 0;
var savedTimes = JSON.parse(localStorage.getItem('footer_savedTimes')) || {};
const url = window.location.href;
const params = new URLSearchParams(new URL(url).search);
var currentPlayPodcastId = null;
var currentPodcastThumbnail = null;
const pathname = window.location.pathname;
const filename = pathname.split('/').pop();

// Function to load the song at the given index
function loadSong(index) {
    if (songs.length === 0) return; // If no songs are loaded, do nothing

    currentSongIndex = index;
    audioPlayer.src = songs[index].url;
    songTitleDisplay.textContent = songs[index].title;
    songThumbnailDisplay.src = songs[index].thumbnail;
    audioPlayer.currentTime = savedTimes[index] || 0;
    localStorage.setItem('footer_currentSongIndex', index);
    updatePlayPauseButton();
}

// Update progress bar and current time
function updateProgress() {
    const value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = value + '%';
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);

    // Only save time if it's more than 5 seconds into the song
    if (audioPlayer.currentTime > 5) {
        savedTimes[currentSongIndex] = audioPlayer.currentTime;
        localStorage.setItem('footer_savedTimes', JSON.stringify(savedTimes));
    }
}

// Play the current song
function playSong() {
    window.dispatchEvent(new CustomEvent('music-play-started', { detail: { playerId: 'footer-audio-player' } }));
    audioPlayer.play();
    updatePlayPauseButton();
}

// Pause the current song
function pauseSong() {
    audioPlayer.pause();
    updatePlayPauseButton();
}

// Toggle play/pause
function togglePlayPause() {
    if (audioPlayer.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

// Play the previous song
function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

// Play the next song
function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

// Set total time when metadata is loaded
function setTotalTime() {
    totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
}

// Format time to MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Seek to a specific point in the song
function seek(event) {
    const percent = event.offsetX / progressBar.offsetWidth;
    audioPlayer.currentTime = percent * audioPlayer.duration;
    updateProgress();
}

// Event listeners for buttons
playPauseButton.addEventListener('click', togglePlayPause);
prevButton.addEventListener('click', playPrevious);
nextButton.addEventListener('click', playNext);
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('loadedmetadata', setTotalTime);
audioPlayer.addEventListener('ended', playNext);
progressBar.addEventListener('click', seek);

// Listen for play events from other players
window.addEventListener('music-play-started', function (e) {
    if (e.detail.playerId !== 'footer-audio-player') {
        pauseSong();
    }
});

// Save current times before unloading the page
window.addEventListener('beforeunload', function () {
    localStorage.setItem('footer_savedTimes', JSON.stringify(savedTimes));
});


function updatePlayPauseButton() {
    const audioPlayer = document.getElementById('footer-audio-player');
    const playPauseButton = document.getElementById('footer-play-pause-button');

    if (audioPlayer.paused) {
        playPauseButton.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'; // Play icon
    } else {
        playPauseButton.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'; // Pause icon
    }
}

let offset = 0;

function playAudio(podcastId, audioUrl, songTitle, thumbnail) {

    if ($('#footer-music-player').is(':hidden')) {
        $('#footer-music-player').slideDown('slow');
        $('#show-all-epi-btn').slideDown('slow');
    }

    songs.push({ title: songTitle, url: audioUrl, thumbnail: thumbnail });
    const audioPlayer = document.getElementById('footer-audio-player');
    const songTitleDisplay = document.getElementById('footer-song-title');
    const songThumbnailDisplay = document.getElementById('footer-song-thumbanil');
    const playPauseButton = document.getElementById('footer-play-pause-button');

    // Set the audio player source to the clicked item's audio URL
    audioPlayer.src = audioUrl;
    songThumbnailDisplay.src = thumbnail;

    // Update the displayed song title
    songTitleDisplay.textContent = songTitle;

    // Play the audio
    audioPlayer.play();

    currentPlayPodcastId = podcastId;
    currentPodcastThumbnail = thumbnail;

    if($('#all-epi-container').is(':visible')){
        loadAllEpisode();
    }

    // Update the play/pause button to reflect the current state
    updatePlayPauseButton();
}

function createItemHtml_grid(item, pageType) {
    var link = `#`;
    var audioUrl = null;
    var thumbnailUrl = null;

    if(pageType === "podcast.php"){
        audioUrl = item.audio_url;
        thumbnailUrl = item.thumbnail;
    }else{
        audioUrl = `https://roshan1.b-cdn.net/${item.audio_url}`;
        thumbnailUrl = `https://roshan1.b-cdn.net/${item.thumbnail}`;
    }
    
    return `
        <div class="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12" onclick="playAudio('${item.id}', '${audioUrl}', '${item.title}', '${thumbnailUrl}')">
            <div class="product__thumb">
                <a class="first__img" href="${link}">
                    <img src="${thumbnailUrl}" alt="product image">
                </a>
            </div>
            <div class="content--center">
                <h4 style="font-size: 16px; padding: 10px 2px; font-weight: 500;"><a href="${link}">${item.title}</a></h4>
            </div>
        </div>
    `;
}

function loadPodcast() {
    // $('#loading').show();
    handleLoading(true);
    let category_id_parm = params.get('category_id');

    $.ajax({
        url: 'api.php',
        method: 'GET',
        data: {
            offset: offset,
            function_name: 'load_podcast',
            category_id: category_id_parm ? category_id_parm : null,
            filename: filename
        },
        success: function (data) {

            const items = JSON.parse(data);

            if (items.length === 0) {
                $(window).off('scroll');
                $('#load_more_button').hide();
                return;
            } else {
                $('#load_more_button').show();
            }

            let container = $('#ebook_row_container');
            let itemHtml = createItemHtml_grid;

            items.forEach((item) => {
                container.append(itemHtml(item, filename));
            })

            offset += 9;

            if (items.length < 8) {
                $('#load_more_button').hide();
            } else {
                $('#load_more_button').show();
            }
        },
        complete: function () {
            $('#loading').hide();
            loading = false;
            handleLoading(false);
        }
    });
}

loadPodcast();
$('#load_more_button').on('click', loadPodcast);


function loadAllEpisode(){
    $.ajax({
        method: 'GET',
        url: 'api.php',
        data: { function_name: 'load_podcast_episodes', podcast_parent_id : currentPlayPodcastId, filename: filename },
        success: function (res){
            let resArray = JSON.parse(res);
            $('#all-episode-list').html("");
            resArray.forEach(item => {
                $('#all-episode-list').append(`<li onclick="playAudio('${currentPlayPodcastId}', '${item.audio_url}', '${item.title}', '${currentPodcastThumbnail}')">${item.title}</li>`)
            });
        },
        error: function(err){
        console.log("Error in loading all episode of a podcast: ",err);
        }
    });
}

function showEpisodeList(){
    $('#show-all-epi-btn').slideToggle("fast");
    loadAllEpisode();
    $('#all-epi-container').slideToggle("fast");
}