<template>
    <div class="d-flex align-items-center justify-content-center h-100">
        <div class="container-fluid d-flex text-center align-items-center justify-content-center">
            <div v-if="Object.keys(current_race_code).length != 0" class="row align-items-center justify-content-center">
                <PyRacer
                    :code_text="current_race_code.code_block"
                    @finished="get_race_codes"
                ></PyRacer>
            </div>
            <div v-if="end" class="alert alert-info">
                No more available races. More will be added.
                <button class="btn btn-primary" @click="reset">Reset</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";

import PyRacer from "@/components/PyRacer.vue";

import { ref } from "@vue/reactivity";


const current_race_code = ref({});
let exclude_race_codes = [];

const end = ref(false);

get_race_codes();

function get_race_codes() {
    current_race_code.value = {};
    let request_data = {
        exclude: exclude_race_codes
    };
    axios
        .get("/api/v1/code/", { params: request_data })
        .then(resp => {
            if (resp.data.length) {
                current_race_code.value = resp.data[0];
                exclude_race_codes.push(current_race_code.value.id);
            } else {
                current_race_code.value = {};
                end.value = true;
            }
        })
}

function reset() {
    current_race_code.value = ref({});
    exclude_race_codes = [];
    end.value = false;
    get_race_codes();
}
</script>