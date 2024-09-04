<script setup lang="ts">

const route = ref(useRoute())

</script>

<template>
    <div class="side-nav">
        <div class="nav__links">
            <NuxtLink to="/" class="nav__link" :class="{'--link-active': route.name === 'index'}">
                <img class="nav__link-img" src="../assets/img/side-nav/dashboard.svg"></img>
                <p class="nav__link-title">Главная</p>
            </NuxtLink>
            <NuxtLink to="/create-task" class="nav__link" :class="{'--link-active': route.name === 'create-task'}">
                <img class="nav__link-img" src="../assets/img/side-nav/add-task.svg"></img>
                <p class="nav__link-title">Создать задачу</p>
            </NuxtLink>
            <NuxtLink to="/my-tasks" class="nav__link" :class="{'--link-active': route.name === 'my-tasks'}">
                <img class="nav__link-img" src="../assets/img/side-nav/my-task.svg"></img>
                <p class="nav__link-title">Мои задачи</p>
            </NuxtLink>
            <NuxtLink to="/vital-tasks" class="nav__link" :class="{'--link-active': route.name === 'vital-tasks'}">
                <img class="nav__link-img" src="../assets/img/side-nav/vital.svg"></img>
                <p class="nav__link-title">Важные задачи</p>
            </NuxtLink>
            <NuxtLink to="/params" class="nav__link" :class="{'--link-active': route.name === 'params'}">
                <img class="nav__link-img" src="../assets/img/side-nav/settings.svg"></img>
                <p class="nav__link-title">Настройки</p>
            </NuxtLink>
        </div>
    </div>
</template>

<style>
:root {
    --filter-pink: brightness(0) saturate(100%) invert(56%) sepia(23%) saturate(5305%) hue-rotate(322deg) brightness(106%) contrast(103%);
    --filter-white: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
}

@keyframes rotating {
    from {
        transform: rotateY(0deg);
    }

    to {
        transform: rotateY(360deg);
    }
}

@keyframes rotating-reverse {
    from {
        transform: rotateY(360deg);
    }

    to {
        transform: rotateY(0deg);
    }
}

.side-nav {
    width: var(--width-side-nav);
    height: 100vh;
    position: fixed;
    top: 144px;
    left: 0;
    padding: 32px var(--padding-right-side-nav);
    border-top-right-radius: 0.5rem;
    background-color: var(--pink);
}

.nav__links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.nav__link {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    transition: all 400ms;
}

.--link-active {
    background-color: white;
}

.--link-active .nav__link-img {
    filter: var(--filter-pink);
    transform: rotateY(360deg);
    animation-name: rotating;
    animation-duration: 400ms;
}

.--link-active .nav__link-title {
    color: var(--pink);
}

.nav__link-img {
    width: 24px;
    aspect-ratio: 1;
    filter: var(--filter-white);
    transform: rotateY(0deg);
    animation-name: rotating-reverse;
    animation-duration: 400ms;
}

.nav__link-title {
    font-weight: 500;
    color: white;
}
</style>