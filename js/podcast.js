// Your dynamic song data (this can be replaced with an API call)
let songs = [];
document.addEventListener('DOMContentLoaded', function() {
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



    let currentSongIndex = parseInt(localStorage.getItem('footer_currentSongIndex')) || 0;
    let savedTimes = JSON.parse(localStorage.getItem('footer_savedTimes')) || {};

    // Function to dynamically load songs (you can replace this with a fetch call or other methods)
    function loadSongs() {
        console.log("loanSOng");
        // songs = [
        //     { title: "Song 1", url: "http://51.68.207.190/roshanebook/sample1.mp3" },
        //     { title: "Song 2", url: "http://51.68.207.190/roshanebook/sample2.mp3" },
        //     { title: "Song 3", url: "http://51.68.207.190/roshanebook/sample3.mp3" },
        //     { title: "Song 4", url: "http://51.68.207.190/roshanebook/sample4.mp3" }
        //     // Add more songs dynamically here
        // ];
        
        // Load the current song when the page is ready
        loadSong(currentSongIndex);
    }

    // Function to load the song at the given index
    function loadSong(index) {
        if (songs.length === 0) return; // If no songs are loaded, do nothing

        currentSongIndex = index;
        console.log("current", songs[index])
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
        console.log("play")
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
    window.addEventListener('music-play-started', function(e) {
        if (e.detail.playerId !== 'footer-audio-player') {
            pauseSong();
        }
    });

    // Initial song load and setup
    loadSongs();

    // Save current times before unloading the page
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('footer_savedTimes', JSON.stringify(savedTimes));
    });
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

function playAudio(audioUrl, songTitle, thumbnail) {
    console.log("playAudio", songs)
    songs.push({title: songTitle, url: audioUrl, thumbnail: thumbnail});
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
    
    // Update the play/pause button to reflect the current state
    updatePlayPauseButton();
}


function createItemHtml_grid(item) {
    var link = `#`;
    var audioUrl = item.audio_url;
    return `
        <div class="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12" onclick="playAudio('${audioUrl}', '${item.title}', '${item.thumbnail}')">
            <div class="product__thumb">
                <a class="first__img" href="${link}">
                    <img src="${item.thumbnail}" alt="product image">
                </a>
            </div>
            <div class="product__content content--center">
                <h4><a href="${link}">${item.title}</a></h4>
            </div>
        </div>
    `;
}

function loadPodcast(){
    // $('#loading').show();
    handleLoading(true);

    $.ajax({
        url: 'api.php',
        method: 'GET',
        data: { 
            offset: offset,
            function_name: 'load_podcast',
            category_id : null
        },
        success: function (data) {

            const items = JSON.parse(data);

            if(items.length === 0){
                $(window).off('scroll');
                $('#load_more_button').hide();
                return;
            }else{
                $('#load_more_button').show();
            }
            
            let container = $('#ebook_row_container');
            let itemHtml = createItemHtml_grid;

            items.forEach((item) => {
                container.append(itemHtml(item));
            })

            offset += 9;

            if(items.length < 9){
                $('#load_more_button').hide();
            }else{
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