<template>
  <div>
    <button
      @click="counter++"
      @contextmenu="counter--"
      :class="{positive:counter>0,negative:counter<0}"
    >{{counter}}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.positive {
  color: green;
}
.negative {
  color: red;
}
</style>