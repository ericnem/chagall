<!-- HTML -->
<template>
  <div class="gamescreen">
    <div id="circle">
      <span 
      class="circle" 
      v-for="index in 5" 
        :key="index"
        :class="{ filled: filledCircles >= index }"
       ></span>
    </div>
    <div id="guessingbox">
      <p id="guesstitle">GUESS</p>
      <div id="container">
        <input id="guess" type="number" min="1" max="4" required>
        <select name="age" id="age" required>
          <option value="A.D">A.D</option>
          <option value="B.C">B.C</option>
        </select>
      </div>
    </div>
     <br>
     <br>
     <img :src= "state.image">
     <br>
     <button id="confirms" @click="fillCircle">Confirm</button>
</div>
</template>

<!-- JS -->
<script>
/*import fetchPaintings from '../getArt.js'; // if it is default export
import { reactive } from 'vue';

export default {
name: 'GameScreen',

data() {
  return {
    filledCircles: 0,
    artObjects: [],
    currentIndex: 0,
  }
},

methods: {
  fillCircle() {
    if (this.filledCircles < 5) {
      this.filledCircles++;
      this.currentIndex++;
      this.state.image = this.artObjects[this.currentIndex].imageUrl;
      this.state.dateEnd = this.artObjects[this.currentIndex].dateEnd;
      this.state.artist = this.artObjects[this.currentIndex].artist;
      this.state.title = this.artObjects[this.currentIndex].title;
    }
  }
},

setup() {
  const state = reactive({image: "", dateEnd: 0, artist: "", title: ""});

  fetchPaintings().then(data => {
    console.log(data);
    this.artObjects = data;
    state.image = this.artObjects[this.currentIndex].imageUrl;
    state.dateEnd = this.artObjects[this.currentIndex].dateEnd;
    state.artist = this.artObjects[this.currentIndex].artist;
    state.title = this.artObjects[this.currentIndex].title;
  })
  .catch(err => console.log(err));
  
  return {
    state
  }
}
}*/

import { fetchPaintings } from '../getArt.js';
import { reactive } from 'vue';

export default {
name: 'GameScreen',
props: {
  msg: String
},

data() {
  return {
    filledCircles: 0
  }
},
methods: {
  fillCircle() {
    if (this.filledCircles < 5) {
      this.filledCircles++;
    }
  }
},

setup() {
  const state = reactive({image: "", dateEnd: 0, artist: "", title: ""});

  fetchPaintings().then(data => {
    console.log(data);
    this.artObjects = data;
    state.image = this.artObjects[this.currentIndex].imageUrl;
    state.dateEnd = this.artObjects[this.currentIndex].dateEnd;
    state.artist = this.artObjects[this.currentIndex].artist;
    state.title = this.artObjects[this.currentIndex].title;
  })
  .catch(err => console.log(err));
  
  return {
    state
  }
}
}

</script>

<!-- CSS -->
<style scoped>
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
background-color:orange; 
}

#guesstitle{
font-family:tahoma;
margin-bottom:5px;
}

#container{
align-items:center;
}

#guess{
width:50px;
height:10px;
background-color:#F5F5F5;
border-color:transparent;
font-family:Tahoma;
font-size:12px;
padding-top:10px;
}

#age{
padding-top:8.65px;
height:25px;
font-size:12px;
font-family:Tahoma;
font-weight:bold;
background-color: #F5F5F5;
border:transparent;
}

#guessingbox { 
margin-left:auto;
margin-right:auto;
width:140px;
height:80px;
border: 2.5px solid black;
border-radius:18px; 
}

#confirms {
color: black;
background-color: #eeba2b;
border: #eeba2b;
font-family: Tahoma;
font-weight:lighter;
font-size: 20px;
width: 120px;
height: 30px;
border-radius: 20px;
}

#confirms:hover{
background-color: #b99225;
border: #b99225;
}
</style>
