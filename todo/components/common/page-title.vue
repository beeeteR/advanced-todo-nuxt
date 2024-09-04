<script setup lang="ts">

const props = defineProps(['title'])
const route = useRoute()
const lineWidth = ref(getStringRandomNumber())

function getStringRandomNumber() {
    return Math.floor(Math.random() * 50 + 25) + '%'
}

watch(route, () => {
    lineWidth.value = getStringRandomNumber()
})


</script>


<template>
    <div class="page-title-wrapper">
        <h1 class="page-title__text">{{ props.title }}</h1>
        <div class="page-title__line"></div>
    </div>
</template>

<style lang="scss">
.page-title {
    &-wrapper {
        width: fit-content;
        position: relative;
    }

    &__text {
        font-size: 1.3rem;
        font-weight: 600;
    }

    &__line {
        position: absolute;
        bottom: -4px;
        left: 0;
        width: v-bind(lineWidth);
        height: 2px;
        background-color: map-get($colors, 'orange');
        border-radius: 0.5rem;
    }
}
</style>