// src\js\index.js
let timer;
let isRunning = false;
let totalMinute = 0;
let totalSecond = 0;
let isPlay = false; // Variabel untuk kontrol suara

const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
const stopwatch = document.getElementById('window');

// Fungsi untuk memperbarui tampilan
function updateDisplay() {
    const hours = Math.floor(totalMinute / 60);
    const minutes = totalMinute % 60;
    const seconds = totalSecond;

    // Menampilkan jam:menit:detik
    stopwatch.textContent = `
        ${String(hours).padStart(2, "0")}
        :
        ${String(minutes).padStart(2, "0")}
        :
        ${String(seconds).padStart(2, "0")}
    `;
}

// Fungsi untuk memulai stopwatch
function startStopwatch() {
    if (isRunning) return; // Jika sudah berjalan, tidak perlu memulai lagi
    isRunning = true;
    const audioPlayer = document.getElementById('audioPlayer'); // Pastikan ada elemen audio dengan id "audioPlayer"

    // Mengatur variabel isPlay agar audio bisa diputar
    isPlay = true;

    function playAudio() {
        if (isPlay) {
            audioPlayer.play(); // Memutar suara saat stopwatch mulai
        }
    }
    function pauseAudio() {
        audioPlayer.pause(); // Menjeda suara (tidak perlu digunakan dalam logika ini)
    }

    // Mengambil nilai jam dan menit dari input
    const inputHours = parseInt(document.getElementById('hours').value);
    const inputMinutes = parseInt(document.getElementById('minutes').value);

    // Menghitung total menit dan detik
    totalMinute = inputHours * 60 + inputMinutes;
    totalSecond = 0;
    updateDisplay();

    timer = setInterval(() => {
        // Mengurangi detik setiap interval
        if (totalMinute === 0 && totalSecond === 0) {
            clearInterval(timer);
            isRunning = false;
            Swal.fire({
                title: "Very Focused!",
                text: "congratulations, you have focused, as a prize you get 0.5₿ fK#Quv{IhOZ$$5sRuuvX-;2a8p(RUW9aghkX#rU~YWC0&f",
                imageUrl: "./src/img/plant.png",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image"
              });
            pauseAudio(); // Menghentikan suara saat waktu habis
            return;
        }

        if (totalSecond === 0) {
            if (totalMinute > 0) {
                totalMinute--;
                totalSecond = 59; // reset detik ke 59 saat menit berkurang
            }
        } else {
            totalSecond--;
        }

        playAudio(); // Memutar suara setiap detik
        updateDisplay();
    }, 1000); // Interval per detik
}

// Fungsi untuk menghentikan stopwatch
function stopStopwatch() {
    clearInterval(timer);
    isRunning = false;
    pauseAudio(); // Menghentikan suara jika stopwatch dihentikan
}

// Fungsi untuk mereset stopwatch
function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    totalMinute = 0;
    totalSecond = 0;

    // Reset input fields
    document.getElementById('hours').value = 0;
    document.getElementById('minutes').value = 0;

    updateDisplay();
    pauseAudio(); // Menghentikan suara saat reset
}

// Menambahkan event listener untuk tombol
start.addEventListener('click', startStopwatch);
stop.addEventListener('click', stopStopwatch);
reset.addEventListener('click', resetStopwatch);
