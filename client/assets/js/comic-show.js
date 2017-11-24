Vue.component('comic-show', {
  template: `
  <div id="myCarousel" class="carousel slide show" data-ride="carousel" data-interval="false">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner" >
      <div v-if="index == 0" class="item active" v-for="(img, index) in images">
        <img :src="img" >
      </div>
      
      <div v-else class="item">
        <img :src="img" >
      </div>
      
    </div>

    <!-- Left and right controls -->
    <a class="left carousel-control" href="#myCarousel" data-slide="prev" @click="prevpos" >
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next" @click="nextpos" >
      <span class="glyphicon glyphicon-chevron-right"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
  `,
  data: function () {
    return {
      id: '',
      author: '',
      title: '',
      chapter: '',
      images: [],
      pos: 0
    }
  },
  methods: {
    getcomic: function () {
      var idcomic = localStorage.getItem("idcomic");
      axios.get('http://api.comic.ga/'+idcomic)
      .then(response => {
        this.id = response.data._id
        this.author = response.data.author
        this.title = response.data.title
        this.chapter = response.data.chapter
        this.images = response.data.images
        
        let link = this.images[this.pos]
        this.$emit('download-link', {
          link: link
        })
      })
      .catch((error)=>{
        console.log(error);
      });
    },
    nextpos: function () {
      this.pos += 1
      if(this.pos>this.images.length-1){
        this.pos=0;
      }
      let link = this.images[this.pos]
      this.$emit('download-link', {
        link: link
      })
    },
    prevpos: function () {
      this.pos -= 1
      if(this.pos<0){
        this.pos=this.images.length-1;
      }
      let link = this.images[this.pos]
      this.$emit('download-link', {
        link: link
      })
    }
  },
  created() {
    this.getcomic();
  }
})