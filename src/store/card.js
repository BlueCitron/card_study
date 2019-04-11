export const state = {
  box: 3,
  bucketSize: 7,
  now: {},
  list: [
  {
    id: 1,
    front: 'capable',
    back: 'a. 능력있는',
    box: 1,
    lastStudiedAt: new Date(),
  },
  {
    id: 2,
    front: 'suspect',
    back: 'v. 의심하다',
    box: 1,
    lastStudiedAt: new Date(),
  },
  {
    id: 3,
    front: 'blame',
    back: 'v. 비난하다',
    box: 1,
    lastStudiedAt: new Date(),
  },
  {
    id: 4,
    front: 'patient',
    back: 'a. 인내력 있는\n n. 환자',
    box: 1,
    lastStudiedAt: new Date(),
  },
  {
    id: 5,
    front: 'passenger',
    back: 'n. 승객',
    box: 1,
    lastStudiedAt: new Date(),
  },
  {
    id: 6,
    front: 'demand',
    back: 'v. 요구하다\nv.주장하다',
    box: 1,
    lastStudiedAt: new Date(),
  },
  {
    id: 7,
    front: 'negatively',
    back: 'ad. 부정적으로',
    box: 3,
    lastStudiedAt: new Date(),
  },
  {
    id: 8,
    front: 'positively',
    back: 'ad. 긍정적으로',
    box: 3,
    lastStudiedAt: new Date(),
  },
  {
    id: 9,
    front: 'tap',
    back: 'v. 툭툭치다',
    box: 1,
    lastStudiedAt: new Date(),
  },
  {
    id: 10,
    front: 'remind',
    back: 'v. 생각나게 하다',
    box: 1,
    lastStudiedAt: new Date(),
  },
  {
    id: 11,
    front: 'endow',
    back: 'v. 부여하다\nv. 기부하다',
    box: 1,
    lastStudiedAt: new Date(),
  },
  {
    id: 12,
    front: 'universal',
    back: 'a. 우주의',
    box: 2,
    lastStudiedAt: new Date(),
  },
  {
    id: 13,
    front: 'enlighten',
    back: 'v. 계몽시키다 / 개화시키다',
    box: 2,
    lastStudiedAt: new Date(),
  },
  {
    id: 14,
    front: 'intelligent',
    back: 'a. 지적인',
    box: 2,
    lastStudiedAt: new Date(),
  },
  {
    id: 15,
    front: 'invent',
    back: 'v. 발명하다 / 만들다',
    box: 2,
    lastStudiedAt: new Date(),
  },
  ],
  bucket: [],
  fails: [],
}

export const getters = {
  cardsInBox: state => box => state.list.filter(card => card.box === box)
}

export const actions = {
  async REFILL ({ state, getters, commit, dispatch }) {
    // 박스로 부터 랜덤 카드 Pick
    // Bucket에 Push
    // 7번 반복

    // 7~
    // 1-6
    // 0개
  },
  STUDY_CARD ({ commit }, { study, card }) {
    // Bucket에서 index의 card 처리
    // * 레이트너 기준
    // 1. 알아요
    // Bucket에서 Index의 card 제거
    // 틀렸던 카드? 박스1로 보냄 : 다음 박스로 보냄
    // 2. 몰라요
    // Bucket에서 index의 card 제거하지 않음
    // 틀렸던 카드에 등록
    const { type, result } = study
    type == 'leitner' ?
      dispatch('PROCESS_WITH_LEITNER', { result, card })
      : null

  },
  PICK_RANDOM_CARD_FROM_BOX ({ state, getters }) {
    const { box } = state
    const cards = getters.cardsInBox(box)
    const randomPosition = Math.floor(Math.random() * cards.length)
    return cards[randomPosition]
  },
  PROCESS_WITH_LEITNER ({ state, commit }, { result, card }) {
    // result = true / false
    if (result) {
      // 알아요
      // 카드 제거
      const position = state.bucket.findIndex(el => el.id === card.id)
      commit('REMOVE_CARD_FROM_BUCKET', position)
      // 다음 박스로 보냄
      if (card.box < 5) {
        card.box++
      }
      // 한 번 틀렸던 카드이면?
      // 1로 보내고 틀렸던 카드 등록 삭제
      if (state.fails.find(el => el.id === card.id)) {
        card.box = 1
        const index = state.fails.findIndex(el => el.id === card.id)
        commit('REMOVE_CARD_FROM_FAILS', index)
      }
      card.lastStudiedAt = new Date()
      commit('REPLACE_CARD_WITH_INDEX_FROM_LIST', { item: card, index })
    } else {
      // Fails로 보냄 등록이 안됐을 경우
      const index = state.fails.findIndex(el => el.id === card.id)
      if (index >= 0) {
        commit('PUSH_CARD_TO_FAILS', card)
      }
    }
  },

}

export const mutations = {
  SET_NOW_CARD (state, data) {
    state.now = data
  },
  SET_LIST (state, data) {
    state.list = data
  },
  SET_BUCKET (state, data) {
    state.bucket = data
  },
  SET_FAILS (state, data) {
    state.fails = data
  },

  PUSH_CARD_TO_BUCKET (state, card) {
    state.bucket.push(card)
  },
  REMOVE_CARD_FROM_BUCKET (state, index) {
    state.bucket.splice(index, 1)
  },
  PUSH_CARD_TO_FAILS (state, card) {
    state.fails.push(card)
  },
  REMOVE_CARD_FROM_FAILS (state, index) {
    state.fails.splice(index, 1)
  },

  REPLACE_CARD_WITH_INDEX_FROM_LIST (state, { item, index }) {
    state.list.splice(index, 1)
    state.list.splice(index, 0, item)
  },
  REPLACE_CARD_WITH_INDEX_FROM_BUCKET (state, { item, index }) {
    state.bucket.splice(index, 1)
    state.bucket.splice(index, 0, item)
  },
}
