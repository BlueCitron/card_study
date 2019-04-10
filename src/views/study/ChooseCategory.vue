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
        <h2>라이트너</h2>
      </v-flex>
    </v-flex>

    <v-container class="pt-5" fill-height>
      <v-layout justify-start wrap>

        <v-flex md3 v-for="item in [1, 2, 3, 4, 5, 6]">
          <v-card class="mx-3 pb-3">
            <v-responsive :aspect-ratio="16/9">

              <v-card-title primary-title>
                <p class="title">토익</p>
              </v-card-title>

              <v-flex class="px-3" md12>
                <v-text-field
                  color="warning"
                  label="등록된 카드"
                  placeholder="2,497"
                ></v-text-field>
              </v-flex>
              <v-flex class="px-3" md12>
                <v-text-field
                  color="warning"
                  label="오늘 학습해야할 카드"
                  placeholder="2,497"
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
                >시작하기</v-btn>
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
}
</script>

<style lang="css" scoped>
</style>
