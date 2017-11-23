new Vue({
  el: '#app',
  data: {
    link: '#'
  },
  methods: {
    downloadlink: function (payload) {
      this.link = payload.link
    }
  },
  ready() {
    console.log('-----------mounted')
    this.downloadlink();
  }
})