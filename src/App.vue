<!-- HTML -->
<template>
  <img id="coverImg" alt="chagall cover" src="./assets/cover_frame.png" width="225" height="295">
  <CoverPage msg="Welcome to the Cover Page"/>
</template>

<!-- JS -->
<script>
import CoverPage from './components/CoverPage.vue'

export default {
  name: 'App',
  components: {
    CoverPage
  }
}
</script>

<!-- CSS -->
<style>

#coverImg {
  margin-left:auto;
  margin-right:auto;
  margin-top:175px;
}

#coverImg {
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

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
