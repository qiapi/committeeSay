<template>
  <div class="file">
    <div class="file-list">
      <img :src="filesrc">
      <span>{{filename}}</span>
      <p>{{filetext}}</p>
    </div>
  </div>
</template>

<script>
const responseData = {
  filesrc: '../../static/userlogo.jpg',
  filename: 'DSP',
  filetext: '数字信号处理课程课件，包含理论课件和实验课件，请同学们注意查看'
}
export default {
  name: 'fileItem',
  data: function () {
    return {
      filesrc: responseData.filesrc,
      filename: responseData.filename,
      filetext: responseData.filetext
    }
  }
}
</script>

<style scoped>
  .file{
    padding:0.1rem 0.2rem;
  }
  .file-list{
    width:100%;
    height:3.3rem;
    border-top:0.01rem solid #ccc;
    border-bottom:0.01rem solid #ccc; 
    margin:0.1rem 0;
    background-color: white;
    
  }
  .file-list img{
    width:35%;
    height:100%;
    float:left;
  }
  .file-list span{
    width:60%;
    display:block;
    float:right;
    font-size:0.6rem;
    font-weight:bold;
    margin:0.2rem 0;
  }
  .file-list p{
    width:60%;
    float:right;
    font-size:0.45rem;
    color:#999;
    margin:0.1rem 0;
  }
</style>
