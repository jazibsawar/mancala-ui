<template>
  <button
    :class="
      `bg-yellow-500 rounded-xl h-24 flex items-center justify-center focus:outline-none ${
        !isMoveAllowed ? 'cursor-not-allowed' : 'hover:bg-yellow-600'
      }`
    "
    :disabled="!isMoveAllowed"
    @click.prevent="click"
  >
    <h3 class="text-3xl font-bold hover:cursor-pointer">{{ score }}</h3>
  </button>
</template>

<script>
export default {
  name: "Pit",
  props: {
    score: {
      type: Number,
      required: true
    },
    isPlayerTurn: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isMoveAllowed() {
      return this.score > 0 && this.isPlayerTurn;
    }
  },
  methods: {
    click() {
      this.$emit("move");
    }
  }
};
</script>
