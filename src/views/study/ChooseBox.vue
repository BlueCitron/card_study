<template lang="html">
  <v-container d-block fill-height>

    <v-flex d-flex align-center>
      <v-flex md1>
        <v-btn>뒤로가기</v-btn>
      </v-flex>
      <v-flex md1>
        <v-btn color="warning">카드묶음 생성</v-btn>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex md2>
        <h2>라이트너 > 토익</h2>
      </v-flex>
    </v-flex>

    <v-container class="pt-5" fill-height>
      <v-layout justify-start align-center>

        <v-flex md3 v-for="info in boxInfo">
          <v-card class="mx-3 pb-3">
            <v-responsive :aspect-ratio="16/9">

              <v-card-title primary-title>
                <p class="title">박스 {{ info.box }}</p>
                <v-spacer></v-spacer>
                <small class="px-3">복습주기: {{ info.remind }}</small>
              </v-card-title>

              <v-flex class="px-3" md12>
                <v-text-field
                  v-model="$store.getters.cardsInBox(info.box).length"
                  color="warning"
                  label="등록된 카드"
                  readonly
                ></v-text-field>
              </v-flex>
              <v-flex class="px-3" md12>
                <v-text-field
                  v-model="$store.getters.cardsInBox(info.box).filter(info.calcRemind).length"
                  color="warning"
                  label="오늘 학습해야할 카드"
                  placeholder="2,497"
                  readonly
                ></v-text-field>
              </v-flex>
              <v-flex class="px-3" md12>
                <v-text-field
                  color="warning"
                  label="마지막 학습일"
                  placeholder="2019-04-10 18:20:23"
                ></v-text-field>
              </v-flex>

              <v-flex class="px-3" md12>
                <v-btn
                color="warning"
                block
                outline
                >공부해야할 카드</v-btn>
              </v-flex>
              <v-flex class="px-3" md12>
                <v-btn
                color="warning"
                block
                outline
                >모든 카드</v-btn>
              </v-flex>

            </v-responsive>
          </v-card>
        </v-flex>

      </v-layout>

    </v-container>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      boxInfo: [
        {
          box: 1,
          remind: '아침/저녁(9시간)',
          calcRemind (card) {
            return (new Date() - card.lastStudiedAt) / (1000 * 60 * 60) > 9  // 1000 * 60 * 60 == 1시간
          }
        },
        {
          box: 2,
          remind: '1일(23시간)',
          calcRemind (card) {
            return (new Date() - card.lastStudiedAt) / (1000 * 60 * 60) > 23 // 1000 * 60 * 60 == 1시간
          }
        },
        {
          box: 3,
          remind: '3일(71시간)',
          calcRemind (card) {
            return (new Date() - card.lastStudiedAt) / (1000 * 60 * 60) > 71 // 1000 * 60 * 60 == 1시간
          }
        },
        {
          box: 4,
          remind: '7일(167시간)',
          calcRemind (card) {
            return (new Date() - card.lastStudiedAt) / (1000 * 60 * 60) > 167 // 1000 * 60 * 60 == 1시간
          }
        },
        {
          box: 5,
          remind: '14일(335시간)',
          calcRemind (card) {
            return (new Date() - card.lastStudiedAt) / (1000 * 60 * 60) > 335 // 1000 * 60 * 60 == 1시간
          }
        },
      ]
    }
  }
}
</script>

<style lang="css" scoped>
</style>
