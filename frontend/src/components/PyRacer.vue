<template>
    <div class="container-fluid">
        <div class="row d-flex text-center align-items-center justify-content-center">
            <div class="col">
                <h2>{{ countdown }}</h2>
            </div>
            <div class="col">
                <h2>{{ stopwatch }}</h2>
            </div>
        </div>
        <div class="row">
            <!-- <font-awesome-icon :icon="['fas', 'clock']" /> -->
            <div class="code-block text-start" style="font-size: 2rem;">
                <pre v-html="code_block.join('')"></pre>
            </div>
        </div>

        <div class="row text-start mt-2">
            <input
                type="text"
                class="form-control"
                placeholder="Type here"

                :disabled="input_disabled"
                @keydown="keyboard_pressed"
                @keydown.tab.prevent
                ref="template_txt_input"
                v-model="user_input"
            >
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
    
import { nextTick, onMounted, ref } from "vue";


const props = defineProps({
    code_text: String,
});
const emit = defineEmits(["finished"]);
const template_txt_input = ref(null);

let user_code_block = "";
const code_block = ref(props.code_text.split("").concat([""]));

const countdown = ref(null);
const stopwatch = ref(0);
let stopwatch_interval;

const input_disabled = ref(true);
const user_input = ref("");
const user_idx = ref(0);

code_block.value[user_idx.value] = "<u>" + code_block.value[user_idx.value] + "</u>";


onMounted(() => {
    console.log(props.code_text);
    countdown.value = 3;
    let countdown_interval = setInterval(() => {
        if (countdown.value === 1) {
            clearInterval(countdown_interval);
            start();
        } else {
            countdown.value--;
        }             
    }, 1000);
})

function start() {
    countdown.value = "Start";
    input_disabled.value = false;
    nextTick(() => {
        template_txt_input.value.focus();
    });

    stopwatch_interval = setInterval(() => {
        stopwatch.value++;
    }, 1000);
}

function end() {
    clearInterval(stopwatch_interval);
    let words = props.code_text.split(" ").filter(n => n);
    let wpm = (words.length / (stopwatch.value / 60));
    emit("finished", stopwatch.value, wpm);
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
        case "Tab":
            for (const x of Array(4).keys()) {
                user_idx.value++;
                if (props.code_text.charAt(user_idx.value-1) == "\n") {
                    user_code_block = user_code_block + "\n";
                } else {
                    user_code_block = user_code_block + " ";
                }
                if (user_code_block.charAt(user_idx.value-1) == props.code_text.charAt(user_idx.value-1)) {
                    code_block.value[user_idx.value-1] = "<mark class='correct'>" + code_block.value[user_idx.value-1] + "</mark>";
                } else {
                    code_block.value[user_idx.value-1] = "<mark class='incorrect'>" + code_block.value[user_idx.value-1] + "</mark>";
                }
            }   
            code_block.value.forEach((elem, index) => {
                code_block.value[index] = elem.replace("<u>", "").replace("</u>", "");
            })
            code_block.value[user_idx.value] = "<u>" + code_block.value[user_idx.value] + "</u>";
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
                } else if (e.code == "Space" && props.code_text.charAt(user_idx.value-1) == "\n") {
                    user_code_block = user_code_block + "\n";
                } else {
                    user_code_block = user_code_block + e.key;
                }

                code_block.value.forEach((elem, index) => {
                    code_block.value[index] = elem.replace("<u>", "").replace("</u>", "");
                })
                code_block.value[user_idx.value] = "<u>" + code_block.value[user_idx.value] + "</u>";

                if (user_code_block.charAt(user_idx.value-1) == props.code_text.charAt(user_idx.value-1)) {
                    code_block.value[user_idx.value-1] = "<mark class='correct'>" + code_block.value[user_idx.value-1] + "</mark>";
                } else {
                    code_block.value[user_idx.value-1] = "<mark class='incorrect'>" + code_block.value[user_idx.value-1] + "</mark>";
                }

                if (e.keyCode == 32 || e.keyCode == 13) {
                    user_input.value = "";
                }

                if (user_code_block.length == props.code_text.length && user_code_block == props.code_text) {
                    end();
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