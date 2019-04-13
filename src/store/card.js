export const state = {
  box: 1,
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
  failCount: 0,
  passCount: 0,
}

export const getters = {
  cardsInBox: state => box => state.list.filter(card => card.box === box)
}

export const actions = {
  async REFILL ({ state, getters, commit, dispatch }) {
    // 박스로 부터 랜덤 카드 Pick
    // Bucket에 Push
    // 7번 반복
    commit('SET_BUCKET', [])
    const { box } = state
    const cardLength = getters.cardsInBox(box).length

    if (cardLength > 7) {
      const idSet = new Set()
      while (idSet.size < state.bucketSize) {
        const randomPickedCard = await dispatch('PICK_RANDOM_CARD_FROM_BOX')
        idSet.add(randomPickedCard.id)
      }
      const values = Array.from(idSet.values())
      const cards = getters.cardsInBox(box).filter(el => values.some(id => id == el.id))
      for (const card of cards) {
        commit('PUSH_CARD_TO_BUCKET', card)
      }
    } else if (cardLength > 0) {
      for (const card of getters.cardsInBox(box)) {
        commit('PUSH_CARD_TO_BUCKET', card)
      }
    } else {
      alert('리필할 카드가 없어요! :)')
    }
    // 7~
    // 1-6
    // 0개
  },
  STUDY_CARD ({ commit, dispatch }, { study, card }) {
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
    if (result) {
      // 알아요
      if (card.box < 5) {
        // 다음 박스로 보냄
        card.box++
      }

      commit('SET_PASS_COUNT', state.passCount + 1)

      if (state.fails.find(el => el.id === card.id)) {
        // 한 번 틀렸던 카드이면?
        // 1로 보내고 틀렸던 카드 등록 삭제
        card.box = 1
        const index = state.fails.findIndex(el => el.id === card.id)
        commit('REMOVE_CARD_FROM_FAILS', index)
        commit('SET_PASS_COUNT', state.passCount - 1)
      }

      card.lastStudiedAt = new Date()
      const indexInList = state.list.findIndex(el => el.id === card.id)
      commit('REPLACE_CARD_WITH_INDEX_FROM_LIST', { item: card, index: indexInList })
    } else {
      // Fails로 보냄 등록이 안됐을 경우
      const index = state.fails.findIndex(el => el.id === card.id)
      if (index < 0) {
        commit('PUSH_CARD_TO_FAILS', card)
        commit('SET_FAIL_COUNT', state.failCount + 1)
      }
    }
    // 서버로 카드정보 전송
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
  SET_PASS_COUNT (state, data) {
    state.passCount = data
  },
  SET_FAIL_COUNT (state, data) {
    state.failCount = data
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
