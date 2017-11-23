new Vue({
  el: '#app',
  data: {
    
  },
  methods: {
    getComic: function () {
      axios.get('http://localhost:3000/comic')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  created() {
    this.getComic();
  }
})