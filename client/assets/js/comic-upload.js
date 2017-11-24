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
          <input class="form-control-file" id="inputfile" aria-describedby="fileHelp" type="file" @change="onFileChange" multiple>
          <small id="fileHelp" class="form-text text-muted">maximum file size: 10MB</small>
        </div>
        <div v-if="images">
            <span @click="removeImage"><img v-for="(img, index) in images" :src="img" /></span>
          <!-- <button class="btn btn-primary" @click="removeImage">Remove image</button> -->
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
      images: [],
      active: 'item active'
    }
  },
  methods: {
    onFileChange: function (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      else {
        this.createImage(files[0]);
        this.tobinary(files[0]);
      }
      this.image = ''
    },
    tobinary: function(file){
      var read = new FileReader();
      read.onload = function(e) {
        console.log(e)
        this.bfile = e.target.result 
      }
      read.readAsText(file);
    },
    createImage: function(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
        this.images.push(vm.image)
      };
      reader.readAsDataURL(file);
      this.image = file
    },
    postform: function() {
      console.log('============');
      var formData = new FormData();
      formData.append('author', this.author);
      formData.append('desc', this.desc);
      formData.append('volume', this.volume);
      formData.append('chapter', this.chapter);
      formData.append('images', this.images);

      axios.post('http://localhost:3000/posts', formData)
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
    }
  }
})