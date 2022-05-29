import { get_token, set_token } from "./utils";

const input = document.querySelector("#token") as HTMLInputElement;

input.addEventListener("input", async () => {
    input.disabled = true;
    await set_token(input.value);
    const token = await get_token();
    input.value = token;
    input.disabled = false;
});

(async () => {
    const token = await get_token();
    if (token !== input.value) {
        input.value = token;
    }
})();
