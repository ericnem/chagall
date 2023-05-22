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
      <img id="coverImg" alt="chagall cover" :src="require('@/assets/cover_frame.png')" width="225" height="295">
        <br> 
          <br>
            <button id="startbutton"  @click="$router.push('/game')">Start Game</button>
              <footer>
               <br>
                 <p id="footer"> 
                  made by <a href="https://www.linkedin.com/in/tal-cohen-kleinstein-515a12261/" target="_blank"> <strong>tcohenkl</strong></a>
                  <strong> and </strong><a href="https://www.linkedin.com/in/eric-nemrodov-44738b241/" target="_blank"><strong>ericnem</strong></a>
                </p>
              <br>
           </footer>
    </div>
</template>

<!-- JS -->
<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'CoverPage',
  setup() {
    const audioRef = ref(null); //initially points to nothing
    const isMuted = ref(true);

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
  margin-top: 175px;
  position: relative;
  top: -200px;
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
