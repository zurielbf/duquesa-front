<template>
    <v-overlay
      :opacity="1"
      :value="overlay"
      color="#e58abe"
    >
      <v-progress-circular indeterminate size="64">
        Loading...
      </v-progress-circular>
    </v-overlay>
</template>

<script>
  export default {
    data: () => ({
      overlay: true,
    }),

    methods: {
        LoadingAnimation: function() {
            setTimeout(() => (this.overlay = false), 1500)
        }
    },
    mounted() {
      // hide the overlay when everything has loaded
      // you could choose some other event, e.g. if you're loading
      // data asynchronously, you could wait until that process returns
      this.LoadingAnimation()
      console.log(this.overlay)
    }, 
  }
</script>