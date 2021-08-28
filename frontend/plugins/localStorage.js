import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
const ls = new SecureLS({
  encodingType: 'aes',
  encryptionSecret: process.env.LOCALSTORAGE_KEY,
  isCompression: false
})

export default ({ store }) => {
  createPersistedState({
    key: 'spell-glossar',
    paths: [],
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key)
    }
  })(store)
}
