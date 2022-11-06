<template>
    <div>
        <label 
            class="
                block 
                uppercase 
                tracking-wide 
                text-xs 
                font-bold 
                mb-2 
                text-gray-900
            "
        >
            {{ label }}
        </label>

        <img
            class="
                rounded
                w-full
                border-solid
                border-4
                border-green-500
            "
            :src="image"
        >
    </div>
                    
</template>

<script setup>
    import { defineProps, toRefs } from 'vue'

    const props = defineProps({ label: String, image: String })
    const { label, image } = toRefs(props)
</script>