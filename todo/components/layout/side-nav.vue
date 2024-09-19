<script setup lang="ts">

const route = ref(useRoute())

</script>

<template>
    <div class="side-nav">
        <div class="nav__links">
            <nuxt-link to="/" class="nav__link" :class="{ '--link-active': route.name === 'index' }">
                <img class="nav__link-img" src="~/assets/img/side-nav/dashboard.svg"></img>
                <p class="nav__link-title">Главная</p>
            </nuxt-link>
            <nuxt-link to="/create-task" class="nav__link" :class="{ '--link-active': route.name === 'create-task' }">
                <img class="nav__link-img" src="~/assets/img/side-nav/add-task.svg"></img>
                <p class="nav__link-title">Создать задачу</p>
            </nuxt-link>
            <nuxt-link to="/my-tasks" class="nav__link" :class="{ '--link-active': route.name === 'my-tasks' && !route.query['isVital'] }">
                <img class="nav__link-img" src="~/assets/img/side-nav/my-task.svg"></img>
                <p class="nav__link-title">Мои задачи</p>
            </nuxt-link>
            <nuxt-link to="/my-tasks?isVital=true" class="nav__link" :class="{ '--link-active': route.query['isVital'] }">
                <img class="nav__link-img" src="~/assets/img/side-nav/vital.svg"></img>
                <p class="nav__link-title">Важные задачи</p>
            </nuxt-link>
            <nuxt-link to="/params" class="nav__link" :class="{ '--link-active': route.name === 'params' }">
                <img class="nav__link-img" src="~/assets/img/side-nav/settings.svg"></img>
                <p class="nav__link-title">Настройки</p>
            </nuxt-link>
        </div>
    </div>
</template>

<style lang="scss">
$filter-pink: brightness(0) saturate(100%) invert(56%) sepia(23%) saturate(5305%) hue-rotate(322deg) brightness(106%) contrast(103%);
$filter-white: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);

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
    width: $width-side-nav;
    height: 100vh;
    position: fixed;
    top: 144px;
    left: 0;
    padding: 32px $padding-right-side-nav;
    border-top-right-radius: 0.5rem;
    background-color: map-get($colors, 'pink');

    .nav {
        &__links {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            .--link-active {
                background-color: white;

                .nav__link-img {
                    filter: $filter-pink;
                    transform: rotateY(360deg);
                    animation-name: rotating;
                    animation-duration: 400ms;
                }

                .nav__link-title {
                    color: map-get($colors, 'pink');
                }
            }
        }

        &__link {
            display: flex;
            gap: 1rem;
            padding: 1rem;
            border-radius: 0.5rem;
            transition: all 400ms;

            &-img {
                width: 24px;
                aspect-ratio: 1;
                filter: $filter-white;
                transform: rotateY(0deg);
                animation-name: rotating-reverse;
                animation-duration: 400ms;
            }

            &-title {
                font-weight: 500;
                color: white;
            }
        }
    }
}
</style>