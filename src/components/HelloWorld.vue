<template>
  <div>
    <input @change="selectedFile" type="file" id="file" name="file">
    <br />
    {{ datas }}
    <br />
    <button @click="upload" type="submit">upload</button>
  </div>
</template>

<script>
import axiosBase from 'axios';
export default {
  data: function(){
    return {
      info: null,
      datas: null,
      uploadFile: null
    };
  },
  methods: {
    selectedFile: function(e) {
      const file = e.target.files[0];
      if (!file) { return false}
      this.uploadFile = file;
      this.datas = [];
      const reader = new FileReader();

      const loadFunc = () => {
        const lines = reader.result.split("\n");
        lines.forEach(element => {
          const data = element.split(",");
          this.datas.push(data);
        });
      };
      reader.onload = loadFunc;
      reader.readAsBinaryString(file);
    },
    upload: function() {
      const axios = axiosBase.create({
        baseURL: 'hogehoge',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        responseType: 'json'
      });
      axios
          .get('/hogehoge')
          .then(function(response){
            console.log(response);
          }
          .catch(function(error){
            console.log(error);
          })
    }
  }
};
</script>

