import { App } from "./components/App";

const app = new App();
app.init();

if (module.hot) {
    module.hot.accept();

    module.hot.addStatusHandler((status) => {
        if (status === "apply") {
            console.clear();
        }
    });
}
