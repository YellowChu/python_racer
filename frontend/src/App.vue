<template>
    <div class="base">
        <TypeRacer></TypeRacer>
    </div>
</template>


<script setup>
    import TypeRacer from "./components/PythonRacer.vue";
</script>


<style>
    @font-face {
        font-family: "main_font";
        src: url("./assets/Viga-Regular.ttf") format("truetype");
    }

    .base {
        font-family: Helvetica;
        overflow: hidden;
        height: 100vh;
    }
</style>
