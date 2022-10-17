<template>
  <span>{{ msg }}</span>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      default: 'Hello Wms',
      type: String
    }
  }
}
</script>

<style></style>
