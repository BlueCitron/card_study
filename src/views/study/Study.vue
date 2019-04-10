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

      <v-layout justify-center>
        <v-flex md8>
          <v-card class="mx-3 mb-4">
            <v-card-title primary-title>
              <span class="px-4">
                현재 선택된 카드: 7개
              </span>
              <span class="px-4">
                몰라요: 5개
              </span>
              <span class="px-4">
                알아요: 2개
              </span>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout justify-center align-center>
        <v-flex md8>
          <v-card class="mx-3 pb-3">
            <v-responsive :aspect-ratio="16/9">
              <v-layout column justify-center align-center fill-height v-if="false">

                <p class="headline">
                  5
                </p>

                <p class="display-4 my-5">
                  TOEIC WORD
                </p>

                <v-btn
                  class="my-4"
                  color="warning"
                  large
                  outline
                >정답확인(단축키: 스페이스)</v-btn>

              </v-layout>

              <v-layout column justify-center align-center fill-height v-if="false">

                <p class="display-2 my-5">
                  TOEIC WORD
                </p>

                <p class="title" style="width: 500px; min-height: 250px;">
                  <v-divider class="my-4"></v-divider>
                  n. 토익 단어
                </p>

                <v-layout class="my-4">
                  <v-btn
                    class="mx-4"
                    large
                    outline
                    depressed
                  >몰라요 :(</v-btn>
                  <v-btn
                    class="mx-4"
                    color="warning"
                    large
                    outline
                  >알아요 :)</v-btn>
                </v-layout>

              </v-layout>

              <v-layout column justify-center align-center fill-height>
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
                  >리필하기</v-btn>
                </v-layout>

              </v-layout>

            </v-responsive>
          </v-card>
        </v-flex>


      </v-layout>

    </v-container>
  </v-container>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
