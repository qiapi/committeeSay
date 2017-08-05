<template>
    <div>
      <slot></slot>
      <div class="personal">
        <img :src="this.$store.state.currentUser.headPicUrl"/>
        <p>{{this.$store.state.currentUser.fullName}}</p>
        <p>{{this.$store.state.currentUser.username}}</p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'personal'
}
</script>

<style scoped>
.personal {
  text-align: center;
}
img {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}
p {
  font-size: 0.47rem;
  font-weight: bold;
  margin: 0.8rem 0;
}
</style>
