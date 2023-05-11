<!-- HTML -->
<template>
  <div class="coverpage">
    <button id="startbutton" type="button">Start Game</button>
  </div>
  <footer>
    <p id="footer"> 
       made by <a href="https://www.linkedin.com/in/tal-cohen-kleinstein-515a12261/" target="_blank"> <strong>tcohenkl</strong></a>
       and <a href="https://www.linkedin.com/in/eric-nemrodov-44738b241/" target="_blank"><strong>enemrodo</strong></a>
    </p>
    <br>
  </footer>
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

#footer {
  opacity: 0; 
  animation: fadeIn 4.75s ease-in forwards; /* Apply the fade-in animation */
}

@keyframes fadeIn {
  0% {
    opacity: 0; 
  }
  100% {
    opacity: 1; 
  }
}

#startbutton{
  color:black;
  background-color:#eeba2b;
  border:#eeba2b;
  font-family:Verdana;
  font-weight:bold;
  font-size:20px;
  margin-top:30px;
  width:160px;
  height:30px;
  border-radius:20px;
}

#startbutton {
  position: relative;
  bottom: -100px; 
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

#startbutton:hover{
  background-color:#b99225;
  border:#b99225;
}

</style>
