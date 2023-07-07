console.log("Welcome to AudioAura");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let timer = document.querySelector('.timer');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Aashiq Hoon - Raj Barman",  filePath: "songs/Aashiq Hoon_192(PagalWorld.com.se).mp3", coverPath: "covers/1.jpeg"},
    {songName: "Chor Denge - Parampara Tandon", filePath: "songs/Chor Denge_64(PagalWorld.com.se).mp3", coverPath: "covers/3.jpeg"},
    {songName: "Dhokebaaz - Afsana Khan", filePath: "songs/Dhokebaaz_192(PagalWorld.com.se).mp3", coverPath: "covers/4.jpeg"},
    {songName: "Dil Tod Ke - B Praak", filePath: "songs/Dil Tod Ke - B Praak.mp3", coverPath: "covers/5.jpg"},
    {songName: "Dil Maang Raha Hai Mohabbat", filePath: "songs/Dil-Maang-Raha-Hai-Ringtone.mp3", coverPath: "covers/6.jpeg"},
    {songName: "Dua Karo - Stebin Ben", filePath: "songs/Dua Karo_320(PagalWorld.com.se).mp3", coverPath: "covers/7.jpeg"},
    {songName: "Jaa Rahe Ho - Yasser Desai", filePath: "songs/Jaa Rahe Ho_192(PagalWorld.com.se).mp3", coverPath: "covers/8.jpeg"},
    {songName: "Kesariya - Arjit Singh", filePath: "songs/Kesariya_192(PagalWorld.com.pe).mp3", coverPath: "covers/9.jpeg"},
    {songName: "Kya Hoti Hai Bewafai - Meher Anjum", filePath: "songs/Kya Hoti Hai Bewafai_320(PagalWorld).mp3", coverPath: "covers/10.jpeg"},
    {songName: "Mujhe Kone Ke Baad", filePath: "songs/Mujhe Khone Ke Baad_192(PagalWorld).mp3", coverPath: "covers/11.jpeg"},
    {songName: "On My Way - Alan Walker,Sabrina Carpenter", filePath: "songs/Alan Walker, Sabrina Carpenter & Farruko  - On My Way (320 kbps).mp3", coverPath: "covers/2.jpeg"},
    {songName: "Tera Naam Dhokha - Arjit Singh", filePath: "songs/Tera Naam Dhokha Rakh Du Naraz Hogi Kya(PagalWorld.com.se).mp3", coverPath: "covers/12.jpeg"},
    {songName: "Tere Vaaste - Varun Jain,Sachin Jigar", filePath: "songs/Tere Vaaste_192(PagalWorld.com.se).mp3", coverPath: "covers/13.jpeg"},
    {songName: "Tu Maan Meri Jaan - King",filePath: "songs/Tu Maan Meri Jaan_192(PaglaSongs).mp3", coverPath: "covers/14.jpeg"}
]

// Set initial audio source
audioElement.src = songs[songIndex].filePath;

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
// Get all the play buttons
const playButtons = document.querySelectorAll('.songItemPlay');

// Play a song when a play button is clicked
playButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Pause the currently playing song (if any)
      if (!audioElement.paused && songIndex === index) {
        audioElement.pause();
        button.classList.remove('fa-pause-circle');
        button.classList.add('fa-play-circle');
        gif.style.opacity = 0;
      } else {
        // Set the new source and play the selected song
        audioElement.src = songs[index].filePath;
        audioElement.play();
  
        // Update the song information
        masterSongName.innerText = songs[index].songName;
        songIndex = index; // Update the current song index
  
        // Update play/pause icon and playing status
        playButtons.forEach((playButton, playIndex) => {
          if (playIndex === index) {
            playButton.classList.remove('fa-play-circle');
            playButton.classList.add('fa-pause-circle');
          } else {
            playButton.classList.remove('fa-pause-circle');
            playButton.classList.add('fa-play-circle');
          }
        });
  
        // Update the playing status in the music bar
        gif.style.opacity = 1;
      }
    });
  });
  
// Function to format time in MM:SS format
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) {
        return minutes + ":0" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}

// Update the progress bar and timer
function updateProgressBar() {
    myProgressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
    timer.innerText = formatTime(audioElement.currentTime) + " / " 
    + formatTime(audioElement.duration); //audioElement.duration, built-in, give duration of a song.
}

// Play or pause the song when the masterPlay button is clicked
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Play the next song when the next button is clicked
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
});

// Play the previous song when the previous button is clicked
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
});

// Update the progress bar and timer as the song plays
audioElement.addEventListener('timeupdate', () => {
    updateProgressBar();
});

// Update the song and play the next song when the current song ends
audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
});


