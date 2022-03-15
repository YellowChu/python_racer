import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import VueHighlightJS from "vue3-highlightjs";
import "highlight.js/styles/solarized-light.css"

import { createApp } from "vue"
import App from "./App.vue"


createApp(App)
    .use(VueHighlightJS)
    .mount('#app');
