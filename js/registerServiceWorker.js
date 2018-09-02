if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(reg => {
            console.log("registration successful: " + reg.scope);
        })
        .catch(error => {
            console.log("registration failed: " + error);
        })
}