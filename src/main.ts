import "@/style.css";
import { createApp } from "vue";
import theme from "@incutonez/core-ui/dist/theme";
import App from "./App.vue";

const app = createApp(App);
app.use(theme);
app.mount("#app");
