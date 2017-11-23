Vue.component('comic-show', {
  template: `
  <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="false">
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
    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next">
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
      images: []
    }
  },
  methods: {
    getcomic: function () {
      axios.get('http://localhost:3000/comic')
      .then(response => {
        this.id = response.data._id
        this.author = response.data.author
        this.title = response.data.title
        this.chapter = response.data.chapter
        this.images = response.data.images
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  created() {
    this.getcomic();
  }
})