import axios from 'axios'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    location: null,
    image: null,
    description: null,
  }),
  actions: {
    async fetchProfileById(id) {
        let res = await axios.get('api/users/' + id)

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

    profileImage(image) {
      return process.env.VUE_APP_API_URL + 'images/users/' + image
    },

    clearProfile() {
        this.$state.id = null
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