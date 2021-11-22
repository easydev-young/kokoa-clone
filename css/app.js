const statusOnline = document.querySelector(".status-bar__online");
const statusClock = document.querySelector(".status-bar__clock");
const statusBattery = document.querySelector(".status-bar__battery");

function handleWindowOffline() {
    statusOnline.innerText = "No Service";
}

function handleWindowOnline() {
    statusOnline.innerText = "On Service";
}

function getClock() {
    const date = new Date();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    statusClock.innerText = `${hours}:${minutes}:${seconds}`;
}

window.addEventListener("offline", handleWindowOffline);
window.addEventListener("online", handleWindowOnline);

getClock();
setInterval(getClock, 1000);

let battery = navigator.battery || navigator.mozBattery || navigator.webkitBattery;

function updateBatteryStatus() {
    statusBattery.innerText = `{battery.level * 100}%`;

    if (battery.charging) {
        statusBattery.innerText = "charging";
    }
}

if (battery != undefined) {
    battery.addEventListener("chargingchange", updateBatteryStatus);
    battery.addEventListener("levelchange", updateBatteryStatus);
    updateBatteryStatus();
}