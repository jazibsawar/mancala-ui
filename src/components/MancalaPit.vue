<template>
  <div class="bg-yellow-600 rounded-xl flex items-center justify-center">
    <h3 class="text-5xl font-bold">{{ score }}</h3>
  </div>
</template>

<script>
export default {
  name: "MancalaPit",
  props: {
    score: {
      type: Number,
      required: true
    }
  }
};
</script>
