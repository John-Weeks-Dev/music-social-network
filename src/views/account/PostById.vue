<template>
    <div v-if="post" class="container mx-auto max-w-4xl py-6 px-3">

        <div class="text-gray-900 text-xl">Post By ID / {{ post.id }}</div>
        <div class="bg-green-500 w-full h-1 mb-4"></div>

        <div class="mx-auto">
            <div class="my-4">
                <div class="flex items-center py-2">
                    <router-link :to="'/account/profile/' + post.user.id">
                        <img :src="userStore.userImage(post.user.image)" class="rounded-full" width="50">
                    </router-link>
                    <div class="ml-2 font-bold text-2xl">
                        <router-link :to="'/account/profile/' + post.user.id">
                            {{ post.user.first_name }} {{ post.user.last_name }}
                        </router-link>
                    </div>
                </div>
                <img class="w-full" :src="postStore.postImage(post.image)" alt="">
                <div class="p-4">
                    <p class="text-3xl font-bold hover:text-gray-700 pb-4">
                        {{ post.title }}
                    </p>
                    <p class="py-2 text-lg">Event Location: {{ post.location }}</p>
                    <p class="pb-6">
                        {{ post.description }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router'
    import { usePostStore } from '@/store/post-store';
    import { useUserStore } from '@/store/user-store';

    const route = useRoute()
    const postStore = usePostStore()
    const userStore = useUserStore()

    let post = ref(null)

    onMounted(async () => {
        await getPostById()
    })

    const getPostById = async () => {
        try {
            let res = await axios.get('api/posts/' + route.params.id)
            post.value = res.data
        } catch (err) {
            console.log(err)
        }
    }
</script>