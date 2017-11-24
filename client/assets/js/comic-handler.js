new Vue({
  el: '#app',
  data: {
    link: '#',
    linktweet: '',
    comics: []
  },
  methods: {
    downloadlink: function (payload) {
      this.link = payload.link
      this.linktweet = 'https://twitter.com/intent/tweet?text='+payload.link
    },
    
    Mywindow: function(){
      console.log('---------------');
      window.open(this.linktweet, 'windowname', 'location=0, status=0, resizable=1, scrollbars=1, width=600, height=400');;
      return false;
    },

    readDB: function () {
      axios.get('http://api.comic.ga/')
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
    this.downloadlink();
  },

  created() {
    this.readDB();
  }
})
