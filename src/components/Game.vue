<template>
  <section
    class="h-screen bg-yellow-600 flex items-center justify-center flex-col"
  >
    <h2 class="text-2xl mb-10">
      <strong>Player 1: </strong>{{ game.player1.name }}
      <small v-if="game.isMovePlayer1">&nbsp;(Your Turn)</small>
    </h2>
    <div class="bg-yellow-800 w-full max-w-6xl rounded-2xl p-6 flex gap-3">
      <MancalaPit :score="game.player1.mancala" class="w-1/5" />
      <div class="w-3/5 flex flex-col gap-y-3">
        <div class="flex gap-3 flex-row-reverse">
          <Pit
            v-for="(pit, index) in game.player1.pits"
            :key="`player1_${index}`"
            :score="pit"
            :is-player-turn="game.isMovePlayer1"
            class="w-1/6"
            @move="playerMove('player1', index)"
          />
        </div>
        <div class="flex gap-3">
          <Pit
            v-for="(pit, index) in game.player2.pits"
            :key="`player2_${index}`"
            :score="pit"
            :is-player-turn="!game.isMovePlayer1"
            class="w-1/6"
            @move="playerMove('player2', index)"
          />
        </div>
      </div>
      <MancalaPit :score="game.player2.mancala" class="w-1/5" />
    </div>
    <h2 class="text-2xl mt-10">
      <strong>Player 2: </strong>{{ game.player2.name }}
      <small v-if="!game.isMovePlayer1">&nbsp;(Your Turn)</small>
    </h2>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import MancalaPit from "./MancalaPit";
import Pit from "./Pit";

export default {
  name: "Game",
  components: {
    MancalaPit,
    Pit
  },
  computed: {
    ...mapGetters(["game"])
  },
  methods: {
    playerMove(player, index) {
      this.$store.dispatch("playerMove", {
        player,
        index
      });
    }
  }
};
</script>
