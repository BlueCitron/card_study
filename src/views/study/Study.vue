<template lang="html">
  <v-container d-block fill-height>

    <v-flex d-flex align-center>
      <v-flex md1>
        <v-btn>뒤로가기</v-btn>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex md2>
        <h2>라이트너 > 토익 > 박스 1</h2>
      </v-flex>
    </v-flex>

    <v-container class="pt-5" d-block>

      <v-layout justify-center v-if="$store.state.card.bucket.length != 0">
        <v-flex md8>
          <v-card class="mx-3 mb-4">
            <v-card-title primary-title>
              <span class="px-4">
                현재 선택된 카드: {{ $store.state.card.bucketSize }}개
              </span>
              <span class="px-4">
                몰라요: {{ $store.state.card.failCount }}개
              </span>
              <span class="px-4">
                알아요: {{ $store.state.card.passCount }}개
              </span>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout justify-center align-center>
        <v-flex md8>
          <v-card class="mx-3 pb-3">
            <v-responsive :aspect-ratio="16/9">
              <v-layout column justify-center align-center fill-height v-if="$store.state.card.bucket.length != 0 && time != 0">

                <p class="headline">
                  {{ time }}
                </p>

                <p class="display-3 my-5">
                  {{ NOW_CARD.front }}
                </p>

                <v-btn
                  class="my-4"
                  color="warning"
                  large
                  outline
                >정답확인(단축키: 스페이스)</v-btn>

              </v-layout>

              <v-layout column justify-center align-center fill-height v-if="$store.state.card.bucket.length != 0 && time == 0">

                <p class="display-2 my-5">
                  {{ NOW_CARD.front }}
                </p>

                <p class="title" style="width: 500px; min-height: 250px;">
                  <v-divider class="my-4"></v-divider>
                  {{ NOW_CARD.back}}
                </p>

                <v-layout class="my-4">
                  <v-btn
                    class="mx-4"
                    large
                    outline
                    depressed
                    @click="processCard(false)"
                  >몰라요 :(</v-btn>
                  <v-btn
                    class="mx-4"
                    color="warning"
                    large
                    outline
                    @click="processCard(true)"
                  >알아요 :)</v-btn>
                </v-layout>

              </v-layout>

              <v-layout column justify-center align-center fill-height v-if="$store.state.card.bucket.length == 0">
                <v-flex md6>
                  <p class="display-2 my-5 pt-5">
                    남은 카드가 없어요 :(
                  </p>
                </v-flex>

                <v-layout class="my-4">
                  <v-btn
                    class="mx-4"
                    large
                    outline
                    depressed
                  >그만하기</v-btn>
                  <v-btn
                    class="mx-4"
                    color="warning"
                    large
                    outline
                    @click="refill()"
                  >리필하기</v-btn>
                </v-layout>
              </v-layout>

            </v-responsive>
          </v-card>

          <!-- <small>{{ $store.getters.cardsInBox(1).map(el => el.front) }}</small><br/>
          <small>{{ $store.state.card.bucket.map(el => el.front) }}</small><br/>
          <small>{{ $store.state.card.fails.map(el => el.front) }}</small><br/>
          <small>{{ 'Timer : ', this.timer }}</small> -->

        </v-flex>


      </v-layout>

    </v-container>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      time: 0,
      timer: null,
      initialTime: 3
    }
  },
  computed: {
    NOW_CARD () {
      return this.$store.state.card.now
    }
  },
  methods: {
    async refill () {
      const { state, commit, dispatch } = this.$store
      await dispatch('REFILL')
      // 맨 앞의 카드를 NOW_CARD로 등록
      commit('SET_NOW_CARD', state.card.bucket[0])
      await this.startTimer(this.initialTime)
    },
    async startTimer (initTime) {
      this.time = initTime
      const timer = setInterval(() => {
        if (this.time > 0) {
          this.time -= 1
        } else {
          clearInterval(timer)
        }
      }, 995)
      this.timer = timer
    },
    async processCard (result) {
      const study = { type: 'leitner', result }
      await this.$store.dispatch('STUDY_CARD', { study, card: this.NOW_CARD })
      await this.setNextCard(result)
      await this.startTimer(this.initialTime)
    },
    async setNextCard (result) {
      // 현재 카드 위치 확인
      // 마지막 카드였을 경우 -> 맨처음카드
      // 그 외에 -> 다음 카드
      const { state, commit } = this.$store
      const index = state.card.bucket.findIndex(el => el.id === this.NOW_CARD.id)
      commit('SET_NOW_CARD', state.card.bucket[index + 1 == state.card.bucket.length ? 0 : index + 1])
      if (result) commit('REMOVE_CARD_FROM_BUCKET', index)
    }
  },
}
</script>

<style lang="css" scoped>
</style>
