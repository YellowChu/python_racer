<template>
    <div class="d-flex align-items-center justify-content-center h-100">
        <div class="container-fluid d-flex text-center align-items-center justify-content-center">
            <div v-if="!show_code" class="row align-items-center justify-content-center">
                <button class="btn btn-primary w-25" @click="show_code=true">Generate Python code</button>
            </div>

            <div v-if="show_code" class="mt-4">
                <div class="container-fluid">
                    <div class="row">
                        <div class="code-block text-start" style="font-size: 2rem;">
                            <pre v-html="code_block.join('')"></pre>
                        </div>
                    </div>
    
                    <div class="row text-start mt-2">
                        <input
                            type="text"
                            id="user-input"
                            class="form-control"
                            placeholder="Type here"
                            @keydown="keyboard_pressed"
                            v-model="user_input"
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

import python_codes from "../resources/python_codes.js";


let code_n = 0;

let code_text = python_codes[code_n];
const show_code = ref(true);
const code_block = ref(code_text.split("").concat([""]));

let user_code_block = "";
const user_input = ref("");
const user_idx = ref(0);


onMounted(() => {
    code_block.value[user_idx.value] = "<u>" + code_block.value[user_idx.value] + "</u>";
})


function update_mark() {
    let i = user_idx.value;

    code_block.value = code_block.value.replace("<u>", "").replace("</u>", "").replace("<mark>", "").replace("</mark>", "");
    code_block.value = [code_block.value.slice(0, i-1), "<mark>", code_block.value.slice(i-1, i), "</mark>",code_block.value.slice(i)].join("")
    update_underline()
}

function is_key_printable(keycode) {
    let printable = 
        (keycode > 47 && keycode < 58) || // number keys
        keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223);   // [\]' (in order)
    
    return printable
}

function keyboard_pressed(e) {
    switch (e.key) {
        case "Backspace":
            if (user_idx.value - 1 >= 0) {
                user_idx.value--;

                user_code_block = user_code_block.slice(0, -1);

                code_block.value[user_idx.value+1] = code_block.value[user_idx.value+1].replace("<u>", "").replace("</u>", "");
                code_block.value[user_idx.value] = "<u>" + code_block.value[user_idx.value] + "</u>";

                code_block.value[user_idx.value] = code_block.value[user_idx.value].replace("<mark class='correct'>", "").replace("<mark class='incorrect'>", "").replace("</mark>", "");
            }
            break;
        default:
            if (is_key_printable(e.keyCode) && user_idx.value + 1 < code_block.value.length) {
                user_idx.value++;

                if (e.key == "Enter") {
                    let spaces = " ";
                    while (code_block.value[user_idx.value+1] == " ") {
                        spaces = spaces + " ";
                        user_idx.value++;
                        code_block.value[user_idx.value-1] = "<mark class='correct'>" + code_block.value[user_idx.value-1] + "</mark>";
                    }
                    user_idx.value++;
                    user_code_block = user_code_block + "\n" + spaces;
                } else {
                    user_code_block = user_code_block + e.key;
                }

                code_block.value[user_idx.value-1] = code_block.value[user_idx.value-1].replace("<u>", "").replace("</u>", "");
                code_block.value[user_idx.value] = "<u>" + code_block.value[user_idx.value] + "</u>";

                if (user_code_block.charAt(user_idx.value-1) == code_text.charAt(user_idx.value-1)) {
                    code_block.value[user_idx.value-1] = "<mark class='correct'>" + code_block.value[user_idx.value-1] + "</mark>";
                } else {
                    code_block.value[user_idx.value-1] = "<mark class='incorrect'>" + code_block.value[user_idx.value-1] + "</mark>";
                }

                if (e.keyCode == 32 || e.keyCode == 13) {
                    user_input.value = "";
                }

                if (user_code_block.length == code_text.length && user_code_block == code_text) {
                    code_n++;
                    code_text = python_codes[code_n];
                    code_block.value = code_text.split("").concat([""]);
                    user_code_block = "";
                    user_input.value = "";
                    user_idx.value = 0;
                }
            }
            break;
    }
}
</script>

<style>
mark {
    padding: 0;
}

mark.correct {
    background-color: green !important;
}

mark.incorrect {
    background-color: red !important;
}

.code-block {
    padding: 1rem;
    width: fit-content;
    border-radius: 0.5rem;
    background-color: rgba(223, 193, 154, 0.434);
}
</style>