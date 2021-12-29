let songIndex = 0;
let audioElement = new Audio('songs/0.mp3');
let masterPlay = document.querySelector('#masterPlay');
let previous = document.querySelector('#previous');
let next = document.querySelector('#next');
let myProgressBar = document.querySelector('#myProgressBar');
let gif = document.querySelector('#gif');
let songItemPlay = document.querySelectorAll('.songItemPlay');
let masterSongName = document.querySelector('#masterSongName');

gif.style.opacity = 0;
let progress = 0;
audioElement.currentTime = myProgressBar.value = 0;
masterSongName.innerText = "Acoustic guitars - Lefsm";


let songs = [{
        songName: "Acoustic guitars - Lefsm",
        filePath: "songs/0.mp3",
        coverPath: "covers/0.jpg"
    },
    {
        songName: "Ambiant piano - Zakhar Valaha",
        filePath: "songs/1.mp3",
        coverPath: "covers/1.jpg"
    },
    {
        songName: "Chilled acoustic indie folk - Lesfm",
        filePath: "songs/2.mp3",
        coverPath: "covers/2.jpg"
    },
    {
        songName: "Cinematic fairy tale - Lesfm",
        filePath: "songs/3.mp3",
        coverPath: "covers/3.jpg"
    },
    {
        songName: "Emotional inspiring - Coma Media",
        filePath: "songs/4.mp3",
        coverPath: "covers/4.jpg"
    },
    {
        songName: "Inpiring cinematic - Lesfm",
        filePath: "songs/5.mp3",
        coverPath: "covers/5.jpg"
    },
    {
        songName: "In the forest - Lesfm",
        filePath: "songs/6.mp3",
        coverPath: "covers/6.jpg"
    },
    {
        songName: "Soft ambient - Alex",
        filePath: "songs/7.mp3",
        coverPath: "covers/7.jpg"
    },
    {
        songName: "The way home - Zakhar Valaha",
        filePath: "songs/8.mp3",
        coverPath: "covers/8.webp"
    },
    {
        songName: "We confidently go the victory - Alex",
        filePath: "songs/9.mp3",
        coverPath: "covers/9.jpg"
    }

];

function playNPause() {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        removePlayAddPause();
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        removePauseAddPlay();
    }
}

function timeProgress() {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    if(progress === 100)
    nextSongPlay();
}

function durationUpdate() {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
}

function makeAllPlay() {
    Array.from(songItemPlay).forEach(element => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(songItemPlay).forEach((element) => {
    element.addEventListener('click', (e) => {

        if (e.target.classList[2] === 'fa-play-circle') {
            makeAllPlay();
            songIndex = parseInt(e.target.id);
            masterSongName.innerText = songs[songIndex].songName;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            audioElement.src = `songs/${songIndex}.mp3`;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            audioElement.currentTime = 0;
            audioElement.play();
        } else if (e.target.classList[2] === 'fa-pause-circle') {
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            audioElement.pause();
        }
    })
})

function removePauseAddPlay() {
    Array.from(songItemPlay).forEach((element) => {
        if (Number(element.id) === Number(songIndex)) {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        }
    })
}

function removePlayAddPause() {
    Array.from(songItemPlay).forEach((element) => {
        if (Number(element.id) === Number(songIndex)) {
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        }
    })
}

function nextSongPlay() {
    removePauseAddPlay();
    if (songIndex >= 9)
        songIndex = 0;
    else
        songIndex += 1;
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    removePlayAddPause();
}

function previousSongPlay() {
    removePauseAddPlay();
    if (songIndex <= 0)
        songIndex = 9;
    else
        songIndex -= 1;
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    removePlayAddPause();
}

masterPlay.addEventListener('click', playNPause);
audioElement.addEventListener('timeupdate', timeProgress);
myProgressBar.addEventListener('change', durationUpdate);
next.addEventListener('click', nextSongPlay);
previous.addEventListener('click', previousSongPlay);

