<template>
    <div class="d-flex align-items-center justify-content-center h-100">
        <div class="container-fluid d-flex text-center align-items-center justify-content-center">
            <div v-if="Object.keys(current_race_code).length != 0" class="row align-items-center justify-content-center">
                <PyRacer
                    :code_text="current_race_code.code_block"
                    @finished="race_finished"
                ></PyRacer>
            </div>
            <div v-else>
                <button class="btn btn-primary" @click="get_race_codes">Next</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";

import PyRacer from "@/components/PyRacer.vue";
import python_codes from "@/resources/python_codes.js";

import { ref } from "@vue/reactivity";


const current_race_code = ref({});
let exclude_race_codes = [];


get_race_codes();

function get_race_codes() {
    let request_data = {
        exclude: exclude_race_codes
    };
    axios
        .get("/api/v1/code/", { params: request_data })
        .then(resp => {
            console.log(resp.data);
            current_race_code.value = resp.data[0];
            exclude_race_codes.push(current_race_code.value.id);
        })
}

function race_finished(time, wpm) {
    current_race_code.value = {};
    console.log(time);
    console.log(wpm);
}
</script>