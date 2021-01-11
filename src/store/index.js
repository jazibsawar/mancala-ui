import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    game: {
      isMovePlayer1: true,
      player1: {
        name: "Jazib",
        pits: [4, 4, 4, 4, 4, 4],
        mancala: 0
      },
      player2: {
        name: "Merlin",
        pits: [4, 4, 4, 4, 4, 4],
        mancala: 0
      }
    }
  },
  getters: {
    game: state => state.game
  },
  mutations: {
    changePlayer(state) {
      state.game.isMovePlayer1 = !state.game.isMovePlayer1;
    },
    player1Pits(state, pits) {
      state.game.player1.pits = pits;
    },
    player2Pits(state, pits) {
      state.game.player2.pits = pits;
    },
    player1Mancala(state, mancala) {
      state.game.player1.mancala = mancala;
    },
    player2Mancala(state, mancala) {
      state.game.player2.mancala = mancala;
    }
  },
  actions: {
    playerMove({ commit, state }, { player, index }) {
      let isEndedInMancala = false;
      let isMoveInPlayer = player;
      let player1Data = [...state.game.player1.pits];
      let player1Mancala = state.game.player1.mancala;
      let player2Data = [...state.game.player2.pits];
      let player2Mancala = state.game.player2.mancala;
      let totalMoves =
        player === "player1" ? player1Data[index] : player2Data[index];
      if (totalMoves === 0) return;

      if (player === "player1") {
        player1Data[index] = 0;
      } else {
        player2Data[index] = 0;
      }

      index = index + 1;

      while (totalMoves !== 0) {
        if (index > 5) {
          if (isMoveInPlayer === player) {
            if (player === "player1") player1Mancala += 1;
            else player2Mancala += 1;
            if (totalMoves === 1) isEndedInMancala = true;
            totalMoves = totalMoves - 1;
          }
        } else {
          if (isMoveInPlayer === "player1") player1Data[index] += 1;
          else player2Data[index] += 1;
          totalMoves = totalMoves - 1;
        }
        if (index > 5) {
          index = 0;
          isMoveInPlayer = isMoveInPlayer === "player1" ? "player2" : "player1";
        } else {
          index = index + 1;
        }
      }
      commit("player1Pits", player1Data);
      commit("player2Pits", player2Data);

      commit("player1Mancala", player1Mancala);
      commit("player2Mancala", player2Mancala);

      if (!isEndedInMancala) commit("changePlayer");
    }
  }
});
