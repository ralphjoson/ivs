export default {
  buttonActions(player){
    const video = player.querySelector('video');
    const playPause = player.querySelector('.ivs-player__play-pause');
    const stop = player.querySelector('.ivs-player__stop');
    const progressWrapper = player.querySelector('.ivs-player__progress');
    const progress = player.querySelector('progress');
    const thumbnail = player.querySelector('.ivs-player__thumbnail');
    const timer = player.querySelector('.ivs-player__time');
    const thumbStart = 4;
    const thumbEnd = 60;

    // Check if player is ready
    if(isNaN(video.duration)) {
      setTimeout(() => {
        this.buttonActions(player);
      }, 500);
      return;
    }

    const changeButtonState = function(type) {
      if (type == 'playpause') {
         if (video.paused || video.ended) {
            playPause.textContent = 'Play';
            playPause.setAttribute('data-state', 'play');
         }
         else {
            playPause.textContent = 'Pause';
            playPause.setAttribute('data-state', 'pause');
         }
      }
   }

    // Play / Pause
    video.addEventListener('play', function() {
      changeButtonState('playpause');
    }, false);
    video.addEventListener('pause', function() {
      changeButtonState('playpause');
    }, false);

    playPause.addEventListener('click', function(e) {
      if (video.paused || video.ended) video.play();
      else video.pause();
    });

    // Stop
    stop.addEventListener('click', function(e) {
      video.pause();
      video.currentTime = 0;
      progress.value = 0;
      changeButtonState('playpause');
    });

    // Progress
    const supportsProgress = (document.createElement('progress').max !== undefined);
    if (!supportsProgress) progress.setAttribute('data-state', 'fake');

    // Trackbar Click habdler
    progress.addEventListener('click', function(e) {
      let pos = (e.offsetX / this.offsetWidth) * 100;
      pos = (pos / 100) * video.duration;
      video.currentTime = pos;
    });

    video.addEventListener('timeupdate', (event) => {
      progress.value = ( video.currentTime / video.duration );
    });

    // Add thumbnail
    if(thumbnail) {
      const thumbIndicator = document.createElement("div");
      thumbIndicator.classList.add('ivs-player__thumbnail-indicator');

      thumbIndicator.style.left = ((thumbStart / video.duration) * 100) + '%';
      progressWrapper.appendChild(thumbIndicator);

      timer.querySelector('.duration').textContent = this.formatTime(video.duration);

      video.addEventListener('timeupdate', (event) => {
        timer.querySelector('.current').textContent = this.formatTime(video.currentTime);
        if(video.currentTime >= thumbStart && video.currentTime <= thumbEnd) {
          thumbnail.classList.add('ivs-player__thumbnail--active');
        } else {
          thumbnail.classList.remove('ivs-player__thumbnail--active');
        }
      });
    }
  },

  formatTime(s) {
    let m = Math.floor(s / 60);
    m = (m >= 10) ? m : "0" + m;
    s = Math.floor(s % 60);
    s = (s >= 10) ? s : "0" + s;

    return m + ":" + s
  },

  generatePlayers() {
    const _this = this;
    const players = document.querySelectorAll('.ivs-player');

    players.forEach(player => {
      _this.buttonActions(player);
    });
  },

  init() {
    this.generatePlayers();
  }
};
  