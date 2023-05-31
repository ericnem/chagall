<!-- HTML -->
<template>
  <html lang="en-us"> </html>
  <div class="coverpage">

    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    </head>

    <body>
      <audio ref="audioRef" autoplay muted>
        <source :src="require('@/assets/cover_audio.mp3')" type="audio/mpeg">
      </audio>

      <button class="sound-button" @click="toggleMute">
        <i class="fas fa-volume-up" v-if="!isMuted"></i>
        <i class="fas fa-volume-mute" v-else></i>
      </button>

      <img src="@/assets/cover_frame.png" id="coverImg" alt="chagall cover" height="350">
      <br> 
      <br>
      <i id="modeheader">Select era</i>

      <div class="modeselection">
        <button id="leftbutton" @click="changeMode(-1)"><i class="arrow left"></i></button>
        <p id="mode"> {{ modes[currentMode].name }} </p>
        <button id="rightbutton" @click="changeMode(1)"><i class="arrow right"></i></button>
      </div>

      <button id="startbutton"  @click="$router.push({name: 'game'})">Start Game</button>
    </body>

    <footer>
      <br>
      <p style="margin:50px" id="footer"> 
        made by <a href="https://github.com/tcohenkl" target="_blank"> <strong>tcohenkl</strong></a>
        <strong> and </strong><a href="https://github.com/ericnem" target="_blank"><strong>ericnem</strong></a>
      </p>
      <br>
    </footer>

  </div>

</template>

<!-- JS -->
<script>
import { ref, reactive, onMounted } from 'vue';
import Mode from '../mode.js'

export default {
  name: 'CoverPage',
  setup() {
    const audioRef = ref(null); //initially points to nothing
    const isMuted = ref(true);

    // makeModes() returns a list of Mode objects
    function makeModes() {
      const all = new Mode("All",-500,2000,0);
      const ancient = new Mode("Classical",-500,500,0);
      const medieval = new Mode("Medieval",500,1300,0);
      const renaissance = new Mode("Renaissance",1300,1600,0);
      const emodern = new Mode("Early Modern",1600,1800,0);
      const lmodern = new Mode("Late Modern",1800,1950,0);

      return [all, ancient, medieval, renaissance, emodern, lmodern];
    }

    const modes = reactive(makeModes())
    const currentMode = ref(0);

    localStorage.setItem('mode', JSON.stringify(modes[0]));

    // changeMode(direction) cycles through modes depending on direction
    // requires: direction == 1 || direciton == -1 
    function changeMode(direction) {
      
      if (this.currentMode > 0) {
        this.currentMode += direction;
        this.currentMode = this.currentMode % 6;
      } else if (this.currentMode == 0 && direction == 1) {
        this.currentMode = 1;
      } else {
        this.currentMode = 5;
      }
      localStorage.setItem('mode', JSON.stringify(modes[this.currentMode]))
    }

    // restartAudio() restarts the cover page audio when it finishes
    const restartAudio = () => {
      audioRef.value.currentTime = 0;
      audioRef.value.play().catch(e => {
        console.error('Playback failed.', e);
      });
    };

    onMounted(() => {
      audioRef.value = document.querySelector('audio');
      audioRef.value.addEventListener('ended', restartAudio);
    });

    // toggleMute() turns the cover audio on/off 
    const toggleMute = () => {
      isMuted.value = !isMuted.value;
      audioRef.value.muted = isMuted.value;
      if (!isMuted.value && audioRef.value.paused) {
        audioRef.value.play().catch(e => {
          console.error('Playback failed.', e);
        });
      }
    };

    return {
      audioRef,
      modes,
      currentMode,
      changeMode,
      isMuted,
      toggleMute,
      restartAudio  
    };
  },
};
</script>

<!-- CSS -->
<style scoped>

#rightbutton {
  background-color: transparent;
  border: none;
  outline: none;
}

#leftbutton {
  background-color: transparent;
  border: none;
  outline: none;
}

.arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  position: relative;
  animation: slideUp 1.55s ease-out forwards;
  
}

.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
.left{
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}

.sound-button {
  background-color:transparent;
  border-color:transparent;
  margin-left: 97%;
  transition: all 0.5s ease;
  
}

.sound-button .fas {
  transition: all 0.5s ease;
  font-size: 24px; /* To change size of Mute Icon*/
  color:black;
}

.sound-button:hover .fas {
  transform: rotate(-30deg);
}

#coverImg {
  display:block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2%;
  margin-top: 5%;
  position: relative;
  animation: flyIn 2.5s ease-out forwards;
}

 @keyframes flyIn {
  0% {
    top: -600px; 
  }
  100% {
    top: 0;
  }
}

#footer {
  opacity: 0;
  animation: fadeIn 4.75s ease-in forwards; 
}

@keyframes fadeIn {
  0% {
    opacity: 0; 
  }
  100% {
    opacity: 1; 
  }
}

.modeselection{
  height:5%;
  justify-content: center;
  align-items: center;
}

#modeheader{
  font-family: Helvetica, sans-serif;
  color:#B0BDC1;
  font-size: 14px;
  position: relative;
  animation: slideUp 1.55s ease-out forwards;
  margin: 0;
}

#mode{
  color:black;
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  font-weight: bold;
  position: relative;
  animation: slideUp 1.55s ease-out forwards;
  background-color: #B6CCD7;
  border-radius: 7px;
  display: inline-block;
  margin: 3px 0px 10px 0px;
  padding: 8px 0 2px 0;
  width: 170px;
  height: 30px;
}

#startbutton {
  color: black;
  background-color:gold;
  border: gold;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  font-size: 20px;
  width: 170px;
  height: 37px;
  border-radius: 7px;
  position: relative;
  animation: slideUp 1.55s ease-out forwards;
  
}

@keyframes slideUp {
  0% {
    bottom: -100px; 
  }
  100% {
    bottom: 15px; 
  }
}

#startbutton:hover {
  background-color: #b99225;
  border: #b99225;
}


</style>
