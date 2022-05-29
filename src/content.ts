import { get_token, log, size } from "./utils";

(async () => {
    try {
        const header = document.querySelector("#repository-container-header");
        if (header && !header.querySelector("#repo-code-size")) {
            const path = location.pathname.split("/").filter(Boolean);
            log({ path });

            const data: Record<string, number> = await fetch(
                `https://api.github.com/repos/${path[0]}/${path[1]}/languages`,
                { headers: { Authorization: `token ${await get_token()}` } },
            ).then((res) => res.json());
            log({ data });

            const total = size(Object.values(data).reduce((acc, n) => acc + n, 0));
            log({ total });

            const details = Object.entries(data)
                .map(([language, bytes]) => `${language}: ${size(bytes)}`)
                .join("\n");
            log({ details });

            const parent = header.querySelector("h2");
            if (parent) {
                const span = document.createElement("span");
                span.id = "repo-code-size";
                span.innerText = total;
                span.title = details;
                span.style.fontSize = "12px";
                span.style.color = "#666";
                span.style.cursor = "help";
                parent.appendChild(span);
            }
            log("done");
        }
    } catch (err) {
        log("Error Happened :(", err);
    }
})();
