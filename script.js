// script.js
const ts = new TomSelect("#oshi", {
    create: false,
    sortField: {
        field: "text",
        direction: "asc"
    },
    placeholder: "-- Pilih / Ketik Oshi Kamu --"
});

const form = document.getElementById("loveForm");
const progressBar = document.getElementById("progress");
const message = document.getElementById("message");
const percentDisplay = document.getElementById("percent");
const oshiSelect = document.getElementById("oshi");
const nameInput = document.getElementById("name");
const submitButton = document.getElementById("submitButton");
const inputSection = document.getElementById("inputSection");

const getMessage = (percent, oshi, name) => {
    if (percent === 100) 
        return `${oshi} juga sayang 100% ke kamu, ${name}! 💘`;
    if (percent >= 90) 
        return `Hampir sempurna, ${name}! ${oshi} pasti senyum-senyum tuh 😍✨`;
    if (percent >= 80) 
        return `Wah, ${name}! Kamu sayang banget sama ${oshi} 😍`;
    if (percent >= 70) 
        return `Cinta kamu ke ${oshi} luar biasa, ${name}! Tapi bisa lebih maksimal lagi 💖`;
    if (percent >= 60) 
        return `Kamu lumayan sayang sama ${oshi}, ${name} 💕`;
    if (percent >= 50) 
        return `Setengah hati aja nih, ${name}? Ayo semangat dukung ${oshi}! 💫`;
    if (percent >= 40) 
        return `Kamu masih bisa lebih sayang ke ${oshi}, ${name} 😊`;
    if (percent >= 30) 
        return `Masih kurang greget nih, ${name}! ${oshi} nunggu dukungan kamu 💭`;
    if (percent >= 20) 
        return `Duh, kayaknya kamu belum terlalu sayang ${oshi}, ${name} 😅`;
    if (percent >= 10) 
        return `Sayangnya masih tipis banget, ${name}. Tapi semua berawal dari kecil 😌`;
    return `Yahh... kamu sayangnya ke ${oshi} masih kecil banget, ${name} 😢`;
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const oshi = oshiSelect.value;

    if (!name || !oshi) {
        message.textContent = "Harap isi semua data terlebih dahulu.";
        return;
    }

    const normalizedName = name.toLowerCase().replace(/\s+/g, ' ');
    const isUnlimited = (oshi === "Intan" || oshi === "Erine") && (normalizedName === "ikhsan" || normalizedName === "ikhsan nandy");

    let percent = isUnlimited ? 100 : Math.floor(Math.random() * 101);
    let current = 0;
    progressBar.style.width = "0%";
    percentDisplay.textContent = "0%";
    message.textContent = "";

    const interval = setInterval(() => {
        if (current >= percent) {
            clearInterval(interval);

            if (isUnlimited) {
                progressBar.style.width = "100%";
                percentDisplay.textContent = "∞";
                message.textContent = `${oshi} sayang banget sama kamu ${name}, Tingkat sayangnya Tak Terhingga!💗`;
            } else {
                percentDisplay.textContent = percent + "%";
                message.textContent = getMessage(percent, oshi, name);
            }

            ts.disable();
            oshiSelect.disabled = true;
            nameInput.disabled = true;
            inputSection.style.display = "none";
            submitButton.innerHTML = '<i class="fas fa-redo"></i> Buat Lagi';
        } else {
            progressBar.style.width = current + "%";
            percentDisplay.textContent = current + "%";
            current++;
        }
    }, 15);
});

submitButton.addEventListener("click", (e) => {
    if (submitButton.innerText.includes("Buat Lagi")) {
        e.preventDefault();
        ts.enable();
        oshiSelect.disabled = false;
        nameInput.disabled = false;
        inputSection.style.display = "block";
        nameInput.value = "";
        oshiSelect.value = "";
        ts.clear();
        percentDisplay.textContent = "0%";
        progressBar.style.width = "0%";
        message.textContent = "";
        submitButton.innerHTML = 'Cek Sekarang';
    }
});
