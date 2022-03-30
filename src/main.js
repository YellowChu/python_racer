import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import FontAwesomeIcon from "@/resources/fontawesome_icons.js";

import VueHighlightJS from "vue3-highlightjs";
import "highlight.js/styles/solarized-light.css"

import { createApp } from "vue"
import App from "./App.vue"


createApp(App)
    .use(VueHighlightJS)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app');
