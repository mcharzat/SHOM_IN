import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

function sum(a, b) {
    return a + b;
}
export { sum };
