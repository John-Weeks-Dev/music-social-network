<template>
    <div id="DeleteYoutubeVideo" class="container mx-auto max-w-4xl pt-20 px-6">
        
        <div class="text-gray-900 text-xl">Delete Youtube Video</div>
        <div class="bg-red-500 w-full h-1 mb-4"></div>

        <div class="bg-white rounded px-8 pt-6 pb-8">
            <div v-for="(video, index) in videoStore.videos" :key="video" class="flex flex-wrap items-center">

                <div class="w-1/4 mr-auto mt-2 text-lg p-1 text-gray-900">
                    {{ ++index }}. {{ video.title }}
                    <iframe class="w-full h-20" :src="video.url"></iframe>
                </div>

                <div class="w-1/4 ml-auto p-1">
                    <button
                        @click="deleteVideo(video)"
                        class="
                            float-right
                            bg-transparent
                            hover:bg-red-500
                            text-gray-900
                            font-semibold
                            hover:text-white
                            py-2
                            px-4
                            border
                            border-red-500
                            hover:border-transparent
                            rounded
                        "
                    >
                        Delete
                    </button>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
    import axios from 'axios'
    import Swal from '../../sweetalert2'
    import { useVideoStore } from '../../store/video-store'
    import { useUserStore } from '../../store/user-store'

    const userStore = useUserStore()
    const videoStore = useVideoStore()

    const deleteVideo = async (video) => {

        Swal.fire({
            title: 'Are you sure you want to delete this?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete('api/youtube/' + video.id)

                    videoStore.fetchVideosByUserId(userStore.id)

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
