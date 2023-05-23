<!-- HTML -->
<template>
  <div class="coverpage">
    <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></head>
    <audio ref="audioRef" autoplay muted>
      <source :src="require('@/assets/cover_audio.mp3')" type="audio/mpeg">
    </audio>
    <button class="sound-button" @click="toggleMute">
      <i class="fas fa-volume-up" v-if="!isMuted"></i>
      <i class="fas fa-volume-mute" v-else></i>
    </button>
    <img id="coverImg" alt="chagall cover" :src="require('@/assets/cover_frame.png')" height="350">
    <br> 
    <br>
    <p id="modeheader">Mode</p>
    <div class="modeselection">
      <button id="leftbutton" @click="changeMode(-1)"><i class="arrow left"></i></button>
      <p id="mode"> {{ modes[currentMode].name }} </p>
      <button id="rightbutton" @click="changeMode(1)"><i class="arrow right"></i></button>
    </div>
    <button id="startbutton"  @click="$router.push({name: 'game'})">Start Game</button>
    <footer>
      <br>
        <p style="margin:10px" id="footer"> 
          made by <a href="https://www.linkedin.com/in/tal-cohen-kleinstein-515a12261/" target="_blank"> <strong>tcohenkl</strong></a>
          <strong> and </strong><a href="https://www.linkedin.com/in/eric-nemrodov-44738b241/" target="_blank"><strong>ericnem</strong></a>
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

    function setMode(){
      if (localStorage.getItem('mode') == false) {
        localStorage.setItem('mode', JSON.stringify(modes[0]));
      }
    }
    
    setMode();
    function makeModes(){
      const all = new Mode("All",-500,2000,0);
      const ancient = new Mode("Classical",-500,500,0);
      const medieval = new Mode("Medieval",500,1300,0);
      const renaissance = new Mode("Renaissance",1300,1600,0);
      const emodern = new Mode("Early Modern",1600,1800,0);
      const lmodern = new Mode("Late Modern",1800,1950,0);
      const contemp = new Mode("Contemporary",1950, 2000, 0)

      return [all, ancient, medieval, renaissance, emodern, lmodern, contemp];
    }

    const modes = reactive(makeModes())

    const currentMode = ref(0)

    function changeMode(direction) {
      if (this.currentMode > 0) {
        this.currentMode += direction;
        this.currentMode = this.currentMode % 7;
      } else if (this.currentMode == 0 && direction == 1) {
        this.currentMode = 1;
      } else {
        this.currentMode = 6;
      }
      // localStorage.setItem('mode', JSON.stringify(this.modes[currentMode]));
      localStorage.setItem('mode', JSON.stringify(modes[this.currentMode]))
      console.log(localStorage.getItem('mode'));
    }

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


<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  margin-left: 1250px;
  transition: all 0.5s ease;
  
}

.sound-button .fas {
  transition: all 0.5s ease;
  font-size: 24px; /* To change size of Mute Icon*/
  color:black;
}

.sound-button:hover .fas {
  transform: rotate(45deg);
}

#coverImg {
  display:block;
  margin-left: auto;
  margin-right: auto;
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
  top: 30px;
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
  font-size: 20px;
  position: relative;
  animation: slideUp 1.55s ease-out forwards;
  margin: 0;
}

#mode{
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  font-weight: bold;
  position: relative;
  animation: slideUp 1.55s ease-out forwards;
  background-color: #B6CCD7;
  padding-left:1%;
  padding-right: 1%;
  padding-top:0.5%;
  padding-bottom:0.5%;
  border-radius: 50px;
  display: inline-block;

}

#startbutton {
  color: black;
  background-color:gold;
  border: gold;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  font-size: 20px;
  width: 160px;
  height: 30px;
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
