<template>
    <div>
        <div class="mx-auto py-4">
            <div class="flex flex-wrap font-bold text-gray-100">

                <div class="text-gray-900 text-xl">Posts</div>
                <div class="bg-green-500 w-full h-1"></div>

                <div class="w-full mt-4" v-if="userStore.id == route.params.id">
                    <RouterLinkButton
                        btnText="Create Post"
                        color="green"
                        url="/account/create-post"
                    />
                </div>
            </div>
        </div>

        <div class="flex flex-wrap mb-4">
            <div v-for="post in postStore.posts" :key="post" class="my-1 px-1 w-full md:w-1/2 lg:w-1/2">

                
                <div class="rounded-lg border">
                    <a href="#">
                        <img class="rounded-t-lg w-full" :src="postStore.postImage(post.image)" alt="">
                    </a>
                    <div class="p-2 md:p-4">
                        <div class="text-lg">
                            <router-link 
                                :to="'/account/post-by-id/' + post.id" 
                                class="
                                    underline 
                                    text-blue-500
                                    hover:text-blue-600
                                "
                            >
                                {{ post.title }}
                            </router-link>
                        </div>
                        <p class="py-2">Location: {{ post.location }}</p>
                        <p class="text-gray-darker text-md">
                            {{ post.description }}
                        </p>
                        <div v-if="userStore.id == route.params.id" class="mt-2 flex items-center justify-end">
                            <router-link 
                                :to="'/account/edit-post/' + post.id" 
                                class="
                                    mr-1
                                    bg-blue-500
                                    hover:bg-blue-700
                                    text-white
                                    text-sm
                                    font-bold
                                    py-1
                                    px-2
                                    rounded-full
                                "
                            >
                                Edit post
                            </router-link>
                            <button
                                @click="deletePost(post.title, post.id)"
                                class="
                                    bg-red-500
                                    hover:bg-red-700
                                    text-white
                                    text-sm
                                    font-bold
                                    py-1
                                    px-2
                                    rounded-full
                                "
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script setup>
    import RouterLinkButton from '../../global/RouterLinkButton.vue'
    import { usePostStore } from '../../../store/post-store'
    import { useUserStore } from '../../../store/user-store'
    import { useRoute } from 'vue-router'
    import Swal from '../../../sweetalert2'
    import axios from 'axios'
    import { onMounted } from 'vue'

    const route = useRoute()
    const postStore = usePostStore()
    const userStore = useUserStore()

    onMounted(async () => {
        await postStore.fetchPostsByUserId(route.params.id)
    })

    const deletePost = async (title, id) => {

        Swal.fire({
            title: 'Are you sure you want to delete the post "' + title + '"',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete('api/posts/' + id)

                    postStore.fetchPostsByUserId(userStore.id)

                    Swal.fire(
                        'Deleted!',
                        'Your video has been deleted.',
                        'success'
                    )
                } catch (err) {
                    console.log(err)
                }
            }
        })
    }
</script>