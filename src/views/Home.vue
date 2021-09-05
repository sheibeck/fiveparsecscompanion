<template>
  <div>
    <CrewList />      
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CrewList from '@/components/CrewList.vue';

export default Vue.extend({
  name: 'Home',  
  components: {
    CrewList
  },
  mounted() {    
  }, 
  data() {
    return {      
    }
  },
  computed : {   
  },
  methods: {   
  }
});
</script>

<style scoped>
</style>
