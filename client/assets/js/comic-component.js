Vue.component('comic-component', {
  template: `
  <div class="uploader container col-md-6 col-md-offset-3">
    <form>
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
            <label for="description">Desc</label>
            <input v-model="desc" class="form-control" id="description" placeholder="Enter description" type="text">
            <small id="descHelp" class="form-text text-muted">Descriptive title</small>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-6">
            <label for="volume">Volume</label>
            <input v-model="volume" class="form-control" id="volume" placeholder="volume" type="text">
          </div>
          <div class="col-md-6">
            <label for="chapter">Chapter</label>
            <input v-model="chapter" class="form-control" id="chapter" placeholder="chapter" type="text">
          </div>
        </div>
        <div class="form-group">
          <label for="exampleInputFile">File input</label>
          <input class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" type="file" @change="onFileChange">
          <small id="fileHelp" class="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
        </div>
        <div v-if="images">
          <div v-for="img in images">
            <img :src="img" />
          </div>
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
      desc: '',
      volume: '',
      chapter: '',
      image: '',
      images: []
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
        this.images.push(vm.image)
      };
      reader.readAsDataURL(file);
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