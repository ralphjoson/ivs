# IVS Take Home Test

## Description
Create a video player using HTML5. Use any video formats such as mp4, MPEG4, or Ogg. Maximum duration video 3 minutes. Add indicator red dot on seek bar.

## Solution
For this exam, I created a video module that contains a video tag, button controls, thumbnail, and an indicator tag. To position the red dot indicator, I computed it using this formula:

    ((thumbStart / video.duration) * 100)

With this, I can set the indicator's position by updating its CSS' `left` attribute.
    
    thumbIndicator.style.left = ((thumbStart / video.duration) * 100) + '%';

Now that the indicator is in position, I added an event listener to the video that will check if the thumbnail should display.

    video.addEventListener('timeupdate', (event) => {
        if(video.currentTime >= thumbStart && video.currentTime <= thumbEnd) {
          thumbnail.classList.add('ivs-player__thumbnail--active');
        } else {
          thumbnail.classList.remove('ivs-player__thumbnail--active');
        }
    });
      
Where `thumbStart` is set to 4 and `thumbEnd` is set to 60. If the `currentTime` meets the condition, I then added a class for the thumbnail (defaults to be hidden) for it to be visible.