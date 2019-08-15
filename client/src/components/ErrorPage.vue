<template>
  <div class="error-message">
    <alert-icon class="icon-large" />
    <!-- display message based on error type got from manual redirection -->
    <div 
      v-if="errorType === 'questInfoError'"
      key="questInfoError"
    >
      <h1>Quest info not found</h1>
      <p>For more information, please contact the developers.</p>
    </div>
    <div 
      v-else-if="errorType === 'serverConnectionError'"
      key="serverConnectionError"
    >
      <h1>Server connection error</h1>
      <p>Check your internet connection or try again later.</p>
    </div>
    <h1 
      v-else
      key="notFoundError"
    >
      Page not found
    </h1>
    <router-link :to="{ name: 'MainPage' }">Go back to starting page</router-link>
  </div>
</template>

<script>
// using svg icons library
import { AlertIcon } from 'vue-bytesize-icons';

export default {
  name: 'ErrorPage',
  components: {
    AlertIcon,
  },
  data () {
    return {
      //  param is passed via programmatic router navigation
      errorType: this.$route.params.type,
    }
  }
};
</script>

