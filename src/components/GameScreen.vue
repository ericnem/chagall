<!-- HTML -->
<template>
  <div class="gamescreen">
    <img :src="state.imgUrl">
    <div id="guessingbox">
      <p id="guesstitle">GUESS</p>
      <div id="container">
        <input id="guess" type="number" minlength="1" maxlength="4" required>
        <select name="age" id="age" required>
          <option value="A.D">A.D</option>
          <option value="B.C">B.C</option>
        </select>
      </div>
    </div>
     <br>
     <br>
   <button id="confirms">Confirm</button>
  </div>
</template>
  
  <!-- JS -->
  <script setup>
  import { fetchArt } from '../fetch.js';
  import { reactive } from 'vue';

  const state = reactive({image: "", dateStart: 0, dateEnd: 0, artist: "", title: ""});

  fetchArt().then(data => {
    console.log(data);
        state.imgUrl = data.image;
        state.dateStart = data.dateStart;
        state.dateEnd = data.dateEnd;
        state.artist = data.artist;
        state.title = data.title;
    })
    .catch(err => console.log(err));

  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <!-- CSS -->
  <style scoped>
  #guesstitle{
    font-family:tahoma;
    margin-bottom:5px;
  }

  #guesslabel{
    font-family:Tahoma;
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