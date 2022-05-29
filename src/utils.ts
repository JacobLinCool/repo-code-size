export function set_token(token: string) {
    return new Promise<void>((resolve) => {
        chrome.runtime.sendMessage({ action: "set", token }, () => {
            resolve();
        });
    });
}

export function get_token() {
    return new Promise<string>((resolve) => {
        chrome.runtime.sendMessage({ action: "get" }, (response) => {
            resolve(response.token || "");
        });
    });
}

export function log(...args: unknown[]) {
    if (location.search.includes("verbose") || !location.origin.includes("github.com")) {
        console.log("[repo code size]", ...args);
    }
}

export function size(bytes: number): string {
    const units = ["B", "KB", "MB", "GB"];
    let i = 0;
    while (bytes >= 1024) {
        bytes /= 1024;
        i++;
    }
    return `${bytes.toFixed(1)} ${units[i]}`;
}
