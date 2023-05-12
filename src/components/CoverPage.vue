<!-- HTML -->
<template>
  <div class="coverpage">
    <img id="coverImg" alt="chagall cover" :src="require('@/assets/cover_frame.png')" width="225" height="295">
      <br> 
        <br>
          <button id="startbutton"  @click="$router.push('/game')">Start Game</button>
            <footer>
              <br>
                <p id="footer"> 
                  made by <a href="https://www.linkedin.com/in/tal-cohen-kleinstein-515a12261/" target="_blank"> <strong>tcohenkl</strong></a>
                  and <a href="https://www.linkedin.com/in/eric-nemrodov-44738b241/" target="_blank"><strong>ericnem</strong></a>
                </p>
              <br>
           </footer>
    </div>
</template>

<!-- JS -->
<script>
export default {
  name: 'CoverPage',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- CSS -->
<style scoped>

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
  background-color: #eeba2b;
  border: #eeba2b;
  font-family: Tahoma;
  font-weight: bold;
  font-size: 20px;
  width: 160px;
  height: 30px;
  border-radius: 20px;
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
