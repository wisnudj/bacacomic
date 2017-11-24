new Vue({
  el: '#app',
  data: {
    link: '#',
    comics: []
  },
  methods: {
    downloadlink: function (payload) {
      this.link = payload.link
    },

    readDB: function () {
      axios.get('http://localhost:3000/allcomic')
        .then((response) => {
          this.comics = response.data
          console.log(this.comics);
        })
        .catch(function (error) {
          console.log(error);
        })
    },

    sendid: function(id) {
      localStorage.setItem("idcomic", id)
      console.log(localStorage.getItem("idcomic")) 
    }
  },
  ready() {
    console.log('-----------mounted')
    this.downloadlink();
  },

  created() {
    this.readDB();
  }
})
