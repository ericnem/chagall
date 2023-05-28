<!-- HTML -->
<template>
  <div class="bigscreen">
    <div class = "header">
      <div class="circles">
        <span
        class="circle"
        v-for="index in 5"
          :key="index"
          :class="{ filled: roundNum >= index }"
        ></span>
      </div>
      <div>
        <div class="score-box" style = "background-color:#B0BDC1" id = "current-score">
          Score <b>{{ currentScore }}</b>
        </div>
        <div class="score-box" style = "background-color:#B6CCD7" id = "hi-score">
          Hi <b>{{ highScore }}</b>
        </div>
      </div>
    </div>
    <div class="gamescreen">
      <div class="left">
        <img v-if="loadedImages[roundNum-1]" style="max-width: 100%; max-height: 90%; padding-left:5%" :src="state.images[roundNum-1]" :key="state.images[roundNum-1]">
            <div class="answer" v-if="showInfo && loadedImages[roundNum-1]">
              <h2><strong><p class="answer-text"> <em>{{state.titles[roundNum-1]}}</em> <span v-if="state.artists[roundNum - 1] && state.artists[roundNum - 1].length > 0">-</span> {{state.artists[roundNum-1]}}</p></strong></h2>
            </div>
       </div>
      <div class="right">
          <div class="guessingbox" v-if="!showInfo">
            <p class="boxtitle">GUESS</p>
          <div class="container">
            <input v-model= "guessabs" @input="guess= guessabs*age" style = "padding: 7px 0px 7px 0px" id="guess" type="number" min="1" max="9999" required>
            <select v-model="age" @change="guess = guessabs*age" name="age" id="age" required>
              <option value=1>A.D</option>
              <option value=-1>B.C</option>
            </select>
          </div>
        </div>
        <div class="sliderlabels" v-if="!showInfo">
          <b style="float:left">{{makeLabel(startEra)}}</b>
          <b style="float:right">{{makeLabel(endEra)}}</b>
        </div>
        <div class="slidecontainer" v-if="!showInfo">
          <input v-model="guess" @input="updateAge" type="range" v-bind:min= "startEra" v-bind:max="endEra" class="slider" id="myRange">
        </div>
        <i v-if="!showInfo" style = "color:#B0BDC1">Drag the slider or type your answer</i>
          <br>
          <br>
        <button id="confirms" @click="showAnswer" v-if="!showInfo">Confirm</button>
      <!-- Interlude Screen  -->
        <div class="interlude" v-if="showInfo">
          <div class="finalboxes" style="margin-bottom:5%;">
            <div class="guessingbox" style="float:left; width:40%; height:100%;margin-top:0%;">
              <p class="boxtitle"> GUESS</p>
              <p style="background-color:#F5F5F5; font-size:20px; 
              margin:5px 15% 0px 15%; width: 70%;
              padding:7px 0px 7px 0px">{{ makeLabel(guess) }}</p>
            </div>
            <div class="guessingbox" style="border-color:gold;float:right; width:40%; height:100%; margin-top:0%;">
              <p class="boxtitle"> ANSWER</p>
              <p style="background-color:#F5F5F5; font-size:20px; 
              margin:5px 15% 0px 15%; width: 70%;
              padding:7px 0px 7px 0px">{{ makeLabel(state.dates[roundNum-1]) }}</p>
            </div>
          </div>
          <br>
          <div class="finalboxes" style="width:40%;height:auto;margin-bottom:2%;">
            <p style="float:left;font-size:30px;font-weight: bold;margin-bottom:0px">Margin</p>
            <p style="float:right;background-color: #F2D7D7;font-size:20px; width:25%; padding:7px 0px 7px 0px; margin:25px 0px 0px 0px"> {{ Math.abs(state.dates[roundNum-1] - guess) }} </p>
          </div>   
          <br>
          <div class="finalboxes" style="width:40%;height:auto;">
            <p style="float:left;font-size:30px;font-weight: bold; margin-top:10px">Points</p>
            <p style="float:right;background-color: #B1D8B7;font-size:20px;width:25%; padding:7px 0px 7px 0px; margin:5px 0px 0px 0px"> {{ currentRoundPoints }} </p>
          </div> 
          <br>   
          <button id="next" @click="nextRound"  v-if="roundNum < 5">Next</button>
          <button id="restart" @click="restartGame" v-if="roundNum >= 5">Play Again</button>
          <button id="back" @click="$router.push('/')" v-if="roundNum >= 5">Menu</button>        
        </div>
      </div>
      </div>
    </div>
 </template>

<!-- JS -->
<script>
import { fetchPaintings } from '../fetch.js';
import { reactive, ref, onMounted, nextTick} from 'vue';
import { pointDeduction } from '../score.js';
import anime from 'animejs/lib/anime.es.js';

export default {
  name: 'GameScreen',
  props: {
    msg: String
  },

  setup() {
    const mode = JSON.parse(localStorage.getItem('mode'));
    const loadedImages = reactive([false, false, false, false, false]);
    const roundNum = ref(1);
    const currentScore = ref(0);
    const highScore = ref(0);
    const age = ref(1);
    const startEra = ref(mode.startDate);
    const endEra = ref(mode.endDate);
    const guess = ref(Math.floor((endEra.value+startEra.value)/2));
    const guessabs = ref(Math.abs(guess.value));
    const showInfo = ref(false);
    const currentRoundPoints = ref(0);
    
    let tempScore = 0;

    const state = reactive({images:[], titles:[], artists:[], dates:[]});

    onMounted(() => {
      highScore.value = getHighScore() || 0; 
    });

    
    function makeLabel(year) {
      let label = (Math.abs(year)).toString();
      if (year < 0) {
        label += " B.C."
      } else {
        label += " A.D."
      }
      return label
    }

    function updateAge() {
      guessabs.value = Math.abs(guess.value);
      if (guess.value < 0) {
        age.value = -1;
      } else if (guess.value > 0) {
        age.value = 1;
      } else if (guess.value == 0){
        guess.value = 1;
      }
    }

    function getHighScore(){
      return parseInt(localStorage.getItem('highScore'), 10);
    }

    function setHighScore(){
       localStorage.setItem('highScore', highScore.value);
    }

    function endOfGame(){
      if(currentScore.value > highScore.value){
        highScore.value = currentScore.value; 
        setHighScore(highScore.value)
      }
    } 

    function showAnswer() {
      showInfo.value = true;

      tempScore = currentScore.value;
      const answer = state.dates[roundNum.value - 1];
      const points = pointDeduction(guess.value, answer, startEra.value, endEra.value);
      currentRoundPoints.value = points;
      currentScore.value += points;

    
      anime({
      targets: currentScore,
      value: [tempScore, currentScore.value],
      round: 1,
      easing: 'easeInOutExpo',
      duration: 1000,
      update: async function() {
        await nextTick();
      }
    }); 
    
  }


    function nextRound() {

      if (roundNum.value < 5) {
        roundNum.value++;
      } else {
        endOfGame();
        roundNum.value++; 
      }
  
      showInfo.value = false;
   }


    fetchPaintings(startEra.value, endEra.value).then(data => {
    for (let i = 0; i < 5; i++) {
      state.images.push(data[i].image);
      state.titles.push(data[i].title);
      state.artists.push(data[i].artist);
      state.dates.push(data[i].dateEnd);
      
      const img = new Image(); 
      img.onload = () => { loadedImages[i] = true }; // when the image has loaded, set the loadedImages index to true
      img.src = data[i].image; // set the source of the image
    
    }
    })
  .catch(err => console.log(err));


  function restartGame() {
    roundNum.value = 1;
    currentScore.value = 0;
    highScore.value = getHighScore() || 0;
    age.value = 1;
    startEra.value = mode.startDate;
    endEra.value = mode.endDate;
    guess.value = Math.floor((endEra.value+startEra.value)/2);
    guessabs.value = Math.abs(guess.value);
    showInfo.value = false;
    currentRoundPoints.value = 0;
    state.images = [];
    state.titles = [];
    state.artists = [];
    state.dates = [];

    fetchPaintings(startEra.value, endEra.value)
    .then(data => {
        for (let i = 0; i < 5; i++) {
            state.images.push(data[i].image);
            state.titles.push(data[i].title);
            state.artists.push(data[i].artist);
            state.dates.push(data[i].dateEnd);
            
            const img = new Image(); 
            img.onload = () => { loadedImages[i] = true }; 
            img.src = data[i].image; 
        }
    })
    .catch(err => console.log(err));
}


    return {
      state,
      guess,
      guessabs,
      age,
      startEra,
      endEra,
      nextRound,
      makeLabel,
      endOfGame,
      updateAge,
      roundNum,
      currentScore,
      highScore,
      loadedImages,
      showInfo,
      showAnswer,
      currentRoundPoints,
      restartGame,
    }
  }
}

</script>

<!-- CSS -->
<style scoped>

.interlude{
  height:100%;
  justify-content: center;
  align-items: center;
}
#back{
font-size:25px;
color: black;
background-color:#B0BDC1;
border: gold;
font-family: Helvetica,sans-serif;
font-size: 30px;
width: 25%;
height: 10%;
border-radius: 8px;
margin: 5% 2% 0% 2%;
}
#back:hover{
background-color: #8f9a9d;
border: #8f9a9d;
}
#restart{
  font-size:25px;
color: black;
background-color: gold;
border: gold;
font-family: Helvetica,sans-serif;
font-size: 30px;
width: 25%;
height: 10%;
border-radius: 8px;
margin: 5% 2% 0% 2%;
}
#restart:hover{
background-color: #b99225;
border: #b99225;
}
#next {
font-size:25px;
color: black;
background-color: gold;
border: gold;
font-family: Helvetica,sans-serif;
font-size: 30px;
width: 25%;
height: 10%;
border-radius: 8px;
margin: 5%;
}
#next:hover{
background-color: #b99225;
border: #b99225;
}
.finalboxes {
  display: inline-block;
  position: relative;
  width:50%;
  height:23%;
  justify-content: center;
  align-items: center;
  margin:0px;
  animation: fadeIn 3s;
}
.finalguess {
  border-color:black;
}
.sliderlabels {
  width:90%;
  display: inline-block;
  position: relative;
  align-items: flex-end;
}
.slidecontainer {
  width: 90%; /* Width of the outside container */
  justify-content: center;
  align-items: center;
  margin-bottom: 5%;
}
.slider {
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 5px; /* Specified height */
  background:black; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;
  margin-left:6%;
  border-radius: 30%;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 20px; /* Set a specific slider handle width */
  height: 20px; /* Slider handle height */
  background: rgb(255, 218, 11); /* Green background */
  border-radius: 10px;
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: yellow; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.circles {
 width: 50%;
 padding-left:20%
}

.score-box {
 font-family: Helvetica, sans-serif;
 font-weight: bold;
 display: inline-block;
 padding-top: 4%;
 padding-bottom: 4%;
 padding-left:20px;
 padding-right:20px;
 background-color: #e6e6e6;
 margin-left: 30px;
 font-size:25px;
 border-radius:8px;
}
.header {
 padding-top: 2%;
 padding-bottom: 2%;
 position: relative;
 display: flex;
 align-items:center;
 justify-content: center;
}
.bigscreen {
 width: 99vw;
 height:95vh;
}
.gamescreen {
 height: 80%;
 margin: auto;
 padding: 10px;
 position: relative;
 display: flex;
 align-items: flex-end;
 bottom:0;
}
.left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 45%;
  float: left;
}
.right {
 height: 90%;
 width: 50%;
 float: left;
 justify-content: center;
 align-items: center;
}
.circle {
margin-left: 8px;
height: 25px;
width: 25px;
border:1px solid #F5F5F5;
background-color:#F5F5F5;
border-radius: 50%;
display: inline-block;
}

.filled{
background-color:gold;
}


.boxtitle{
font-family:Helvetica, sans-serif;
font-weight:bold; 
margin-bottom:8px;
font-size:25px;
}


.container{
align-items:center;
}


#guess{
text-align:center;
background-color:#F5F5F5;
border-color:transparent;
font-family: Helvetica, sans serif; 
font-size:20px;
}
#guess::-webkit-outer-spin-button,
#guess::-webkit-inner-spin-button {
 -webkit-appearance: none;
 margin: 0;
}


#age{
padding-top:8px;
height:100%;
font-size:20px;
font-family:Helvetica,sans-serif;
font-weight:bold;
background-color: #F5F5F5;
border:transparent;
padding-bottom:8px;
}


#age::-ms-expand {
   display: none;
}


.guessingbox {
font-family: Helvertica,sans-serif;
margin-left:auto;
margin-right:auto;
margin-top:10%;
width:20%;
height:25%;
border: 4px solid black;
border-radius:30px;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fadeIn2 {
  0% { opacity: 0; }
  100% { opacity: 1; }
}


#confirms {
color: black;
background-color: gold;
border: gold;
font-family: Helvetica,sans-serif;
font-size: 30px;
width: 25%;
height: 10%;
border-radius: 8px;
margin-top: 5%;
}


#confirms:hover{
background-color: #b99225;
border: #b99225;
}

</style>
