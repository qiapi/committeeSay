<template>
  <div>
    <slot></slot>
    <file-item />
  </div>
</template>

<script>
import FileItem from '../components/FileItem.vue'

export default {
  name: 'file',
  components: {
    'file-item': FileItem
  }
}
</script>
