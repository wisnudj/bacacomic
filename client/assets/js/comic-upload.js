Vue.component('comic-upload', {
  template: `
  <div class="uploader container col-md-6 col-md-offset-3">
    <form enctype="multipart/form-data" method="post">
      <fieldset>
        <legend>Upload your comic</legend>
        <div class="form-group row">
          <div class="col-md-12">
            <label for="author">Author</label>
            <input v-model="author" class="form-control" id="author" placeholder="Author" type="text">
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-12">
            <label for="title">Title</label>
            <input v-model="title" class="form-control" id="description" placeholder="Enter Title" type="text">
            <small id="titleHelp" class="form-text text-muted">Descriptive title</small>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-12">
            <label for="volume">Volume</label>
            <input v-model="volume" class="form-control" id="volume" placeholder="volume" type="text">
          </div>
        </div>
        <div class="form-group">
          <label for="exampleInputFile">File input</label>
          <input class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" type="file" @change="onFileChange">
          <small id="fileHelp" class="form-text text-muted">  maximum file size: 10MB</small>
        </div>
        <div v-if="images">
            <span @click="removeImage"><img v-for="(img, index) in imageurl" :src="img" /></span>
          <!-- <button class="btn btn-primary" @click="removeImage(index)">Remove image</button> -->
        </div>
        <button v-on:click="postform" type="submit" value="Submit" class="btn btn-primary">Submit</button>
      </fieldset>
    </form>
  </div>  
  `,
  data: function () {
    return {
      author: '',
      title: '',
      volume: '',
      chapter: '',
      image: '',
      images : [],
      imageurl: [],
      active: 'item active',
      noactive: 'item'
    }
  },
  methods: {
    onFileChange: function (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      else {
        this.createImage(files[0]);
      }
      this.image = ''
    },
    createImage: function(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.image = e.target.result;
        this.imageurl.push(this.image)
      };
      reader.readAsDataURL(file)
      this.images.push(file)
    },
    postform: function() {
      console.log('============');
      var formData = new FormData();
      formData.append('author', this.author);
      formData.append('title', this.title);
      formData.append('chapter', this.chapter);

      for (let i = 0 ; i<this.images.length ; i++){
      formData.append('images[]', this.images[i]);
      }

      axios.post('http://localhost:3000/upload', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    },
    removeImage: function (e) {
      this.image = '';
      this.images = [];
      this.imageurl = [];
    }
  }
})