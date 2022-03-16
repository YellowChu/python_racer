<template>
    <div class="base">
        <PyRacerView></PyRacerView>
    </div>
</template>


<script setup>
    import PyRacerView from "@/views/PyRacerView.vue";
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
