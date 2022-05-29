import { log } from "./utils";

type Action = "get" | "set";

chrome.runtime.onInstalled.addListener(load);

function load() {
    chrome.runtime.onMessage.addListener(function (request, sender, respond) {
        const action: Action = request.action;

        log({ action });

        if (action === "get" && (is_popup(sender) || is_github(sender))) {
            chrome.storage.sync.get("token", (result) => {
                respond({ token: result.token || "" });
            });
        } else if (action === "set" && is_popup(sender)) {
            chrome.storage.sync.set({ token: request.token || "" }).then(() => {
                respond({});
            });
        }

        return true;
    });

    log("service is running");
}

function is_popup(sender: chrome.runtime.MessageSender): boolean {
    return !sender.tab;
}

function is_github(sender: chrome.runtime.MessageSender): boolean {
    return sender.tab?.url?.startsWith("https://github.com/") || false;
}
