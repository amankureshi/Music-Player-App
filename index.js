const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  playBtn = document.getElementById("play"),
  background = document.getElementById("bg-img");

const music = new Audio();

const songs = [
  {
    path: "assets/Bole Chudiyan x Saajanji Ghar Aaye.mp3",
    displayName: "Bole Chudiyan x Saajanji Ghar Aaye",
    cover: "assets/1.jpg",
    artist: "Ashwani Machal",
  },
  {
    path: "assets/care-ni-carda.mp3",
    displayName: "Care Ni Karda",
    cover: "assets/2.jpg",
    artist: "Yoyo Honey Singh",
  },
  {
    path: "assets/mummy-nu-pasand.mp3",
    displayName: "Mummy Nu Pasand",
    cover: "assets/3.jpg",
    artist: "Sunny s, Sonnalli S",
  },
  {
    path: "assets/mere-wala-saradar.mp3",
    displayName: "Mere Wala Saradar",
    cover: "assets/4.jpg",
    artist: "Jugraj Sandhu",
  },
];
let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}
function playMusic() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}
function pauseMusic() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}
function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
}
function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}
function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}
function setProgressBar(e) {
  console.log(e);
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}
playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);

// Keyboard event ----->

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    togglePlay();
  } else if (event.code === "ArrowRight") {
    changeMusic(1);
  } else if (event.code === "ArrowLeft") {
    changeMusic(-1);
  }
});
