import "@/style.css";
import { createApp } from "vue";
import theme from "@incutonez/core-ui/theme";
import App from "@/App.vue";
import { router } from "@/router.ts";

const app = createApp(App);
app.use(theme);
app.use(router);
app.mount("#app");
