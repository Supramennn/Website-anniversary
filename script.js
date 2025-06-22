document.addEventListener('DOMContentLoaded', () => {
    const envelopeIcon = document.getElementById('envelope-icon');
    const backgroundMusic = document.getElementById('background-music');
    const heartsContainer = document.querySelector('.hearts-container');

    envelopeIcon.addEventListener('click', () => {
        // Tambahkan kelas 'open' ke body untuk memicu semua animasi CSS
        document.body.classList.add('open');

        // Mainkan musik latar
        backgroundMusic.play().catch(error => {
            console.log("Pemutaran musik otomatis gagal:", error);
        });

        // Buat dan animasikan hati secara dinamis
        createHearts();

    }, { once: true }); // Event ini hanya bisa dijalankan sekali

    function createHearts() {
        const heartCount = 15; // Jumlah hati yang akan muncul
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');

                // Atur posisi horizontal dan durasi animasi secara acak
                heart.style.left = `${Math.random() * 100}%`;
                heart.style.animationDuration = `${(Math.random() * 2) + 3}s`; // durasi 3-5 detik

                heartsContainer.appendChild(heart);

                // Hapus elemen hati setelah animasi selesai agar tidak menumpuk
                heart.addEventListener('animationend', () => {
                    heart.remove();
                });
            }, i * 200); // Munculkan hati satu per satu setiap 200ms
        }
    }
});
