import { createApp } from '@/libs/vue-export.js';
import createPinia from '@/libs/pinia.js';
import App from '@/App.vue';
import router from '@/router/index.js';
import '@/styles/main.css';
import { provideApollo } from '@/libs/apollo-client.js';
import { useAuth } from '@/libs/use-auth.js';

const { initAuth } = useAuth();
const app = createApp(App);

app.use(createPinia());
app.use(router);

provideApollo(app);
initAuth();

app.mount('#app');
