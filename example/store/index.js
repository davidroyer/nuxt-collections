import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0
      // posts
    }
    // getters: {
    //   allPosts: state => {
    //     return state.posts
    //   }
    // }
    // mutations
  })
}

export default createStore
