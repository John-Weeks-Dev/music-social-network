import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    token: null,
    firstName: null,
    lastName: null,
    email: null,
    location: null,
    image: null,
    description: null,
  }),
  actions: {
    setUserDetails(res) {
        console.log('setUserDetails', res.data)
        this.$state.id = res.data.user.id
        this.$state.token = res.data.token
        this.$state.firstName = res.data.user.first_name
        this.$state.lastName = res.data.user.last_name
        this.$state.email = res.data.user.email
        this.$state.location = res.data.user.location
        this.$state.description = res.data.user.description
    },

    async fetchUser() {
        let res = await axios.get('api/users/' + this.$state.id)

        this.$state.id = res.data.user.id
        this.$state.firstName = res.data.user.first_name
        this.$state.lastName = res.data.user.last_name
        this.$state.location = res.data.user.location
        this.$state.description = res.data.user.description
        if (res.data.user.image) {
          this.$state.image = process.env.VUE_APP_API_URL + 'images/users/' + res.data.user.image
        } else {
          this.$state.image = process.env.VUE_APP_URL + 'DefaultUserAvatar.png'
        }
    },

    userImage(image) {
      return process.env.VUE_APP_API_URL + 'images/users/' + image
    },

    clearUser() {
        this.$state.id = null
        this.$state.token = null
        this.$state.firstName = null
        this.$state.lastName = null
        this.$state.email = null
        this.$state.location = null
        this.$state.image = null
        this.$state.description = null
    }
  },
  persist: true
})