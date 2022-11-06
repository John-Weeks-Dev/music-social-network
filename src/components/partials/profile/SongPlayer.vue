<template>
    <div class="bg-green-500 rounded">
        <div id="aplayer"></div>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue'
    import APlayer from 'aplayer'
    import 'aplayer/dist/APlayer.min.css';
    import { useSongStore } from '../../../store/song-store'

    const songStore = useSongStore()

    let songsList = []

    onMounted(() => { 
        setTimeout(() => { mapSongs() }, 500)
    })

    const mapSongs = () => {
        let newSongs = songStore.songs.map(function (song) {
            return {
                name: song.title,
                artist: songStore.artistName,
                url: process.env.VUE_APP_API_URL + 'songs/' + songStore.artistId + '/' + song.song
            }
        })

        for (let i = 0; i < newSongs.length; i++) {
            songsList.push(newSongs[i])
        }

        thePlayer()
    }

    const thePlayer = () => {
        new APlayer({
            container: document.getElementById('aplayer'),
            audio: songsList
        });
    }
</script>