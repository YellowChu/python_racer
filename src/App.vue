<template>
    <div class="base">
        <PyRacerView></PyRacerView>

        <div class="link-corner">
            <div class="corner">
                <span>
                    <a href="https://github.com/YellowChu/python_racer" target="_blank"><i class="fa fa-github"></i></a>
                </span>
            </div>
        </div>
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

.link-corner {
    position: absolute;
    top: 0;
    right: 0;
    overflow: hidden;
}

.corner {
    width: 0; 
	height: 0; 
	border-top: 150px solid #937e7e;
	border-left: 150px solid transparent;
}

.corner span {
    position:absolute;
    top: 10px;
    width: 100px;
    left: 55px;
    text-align: center;
    font-size: 48px;
    font-family: arial;
    transform: rotate(45deg);
    display:block;
}

.corner span a {
    color: black;
}

.corner span a:hover {
    color: rgb(63, 63, 63);
}
</style>
