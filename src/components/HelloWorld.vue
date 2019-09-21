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
        baseURL: 'http://localhost:3000',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const params = new FormData();
      params.append('csv', this.uploadFile)
      axios.post('/shift-scheduler', params).catch((err) => {
        return err.response;
      });
    },
  }
};
</script>

