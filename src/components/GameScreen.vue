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
        <img style = "max-width: 100%; max-height: 100%; padding-left:5%" :src= "state.images[roundNum-1]">
      </div>
      <div class="right">
        <div id="guessingbox">
        <p style = "font-size:25px;" id="guesstitle">GUESS</p>
        <div id="container">
          <input v-model="guess" style = "padding: 7px 0px 7px 0px" id="guess" type="number" min="1" max="9999" required>
          <select v-model="age" name="age" id="age" required>
            <option value=1>A.D.</option>
            <option value=-1>B.C.</option>
          </select>
        </div>
      </div>
      <br>
      <br>
      <button id="confirms" @click="fillCircle">Confirm</button>
      </div>
    </div>
  </div>
 </template>

<!-- JS -->
<script>
import { fetchPaintings } from '../fetch.js';
import { reactive, ref, onMounted } from 'vue';
import { pointDeduction } from '../score.js';

export default {
  name: 'GameScreen',
  props: {
    msg: String
  },

  setup() {
    const roundNum = ref(1);
    const currentScore = ref(0);
    const highScore = ref(0);
    const guess = ref(0);
    const age = ref(1);

    const state = reactive({images:[], titles:[], artists:[], dates:[]});

    onMounted(() => {
      highScore.value = getHighScore() || 0; 
    });

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

    function fillCircle() {
      if (this.roundNum < 5) {
        const answer = this.state.dates[this.roundNum-1];
        this.roundNum++;
        this.currentScore += pointDeduction(this.guess * this.age,answer,-1000,2000);
      } else {
        const answer = this.state.dates[this.roundNum-1];
        this.roundNum++;
        this.currentScore += pointDeduction(this.guess * this.age,answer,-1000,2000);
        this.endOfGame(); 
      }
    }

    fetchPaintings().then(data => {
    for (let i = 0; i < 5; i++) {
      state.images.push(data[i].image);
      state.titles.push(data[i].title);
      state.artists.push(data[i].artist);
      state.dates.push(data[i].dateEnd);
      }
    })
  .catch(err => console.log(err));

    return {
      state,
      guess,
      age,
      fillCircle,
      endOfGame,
      roundNum,
      currentScore,
      highScore
    }
  }
}

</script>

<!-- CSS -->
<style scoped>
.circles {
 width: 50%;
 padding-left:20%
}
.score-box {
           display: inline-block;
           padding-top: 4%;
           padding-bottom: 4%;
           padding-left:20px;
           padding-right:20px;
           background-color: #e6e6e6;
           margin-left: 30px;
           font-size:25px;
}
.header {
 padding-top: 4%;
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
 justify-content: center;
 align-items: center;
 height: 100%;
 width: 45%;
 float: left;
}
.right {
 height: 90%;
 width: 55%;
 float: left;
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
background-color:#eeba2b;
}


#guesstitle{
font-family:tahoma;
margin-bottom:5px;
}


#container{
align-items:center;
}


#guess{
text-align:center;
background-color:#F5F5F5;
border-color:transparent;
font-family:Tahoma;
font-size:20px;
padding-top:5px;
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
font-family:Tahoma;
background-color: #F5F5F5;
border:transparent;
padding-bottom:8px;
}


#age::-ms-expand {
   display: none;
}


#guessingbox {
margin-left:auto;
margin-right:auto;
margin-top:10%;
width:20%;
height:22%;
border: 4px solid black;
border-radius:30px;
}


#confirms {
color: black;
background-color: #eeba2b;
border: #eeba2b;
font-family: Tahoma;
font-weight:lighter;
font-size: 30px;
width: 25%;
height: 10%;
border-radius: 30px;
}


#confirms:hover{
background-color: #b99225;
border: #b99225;
}
</style>
