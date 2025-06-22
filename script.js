/* assets/js/script.js */
document.addEventListener("DOMContentLoaded", function () {
  // Ambil semua elemen yang berhubungan dengan musik
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');

  // Hapus "Layar Sambutan" jika ada
  const welcomeOverlay = document.getElementById('welcome-overlay');
  if (welcomeOverlay) {
    welcomeOverlay.classList.add('hidden');
  }
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.classList.remove('hidden');
  }

  // Fungsi untuk menyinkronkan ikon play/pause
  function syncMusicIcon() {
    if (!bgMusic) return;
    if (bgMusic.paused) {
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
    } else {
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      if (bgMusic.paused) { bgMusic.play(); } else { bgMusic.pause(); }
    });
  }

  if (bgMusic) {
    bgMusic.onplay = syncMusicIcon;
    bgMusic.onpause = syncMusicIcon;
    const musicTime = sessionStorage.getItem('musicTime');
    const wasPlaying = sessionStorage.getItem('musicPlaying') === 'true';
    if (musicTime && wasPlaying) {
      bgMusic.currentTime = parseFloat(musicTime);
      bgMusic.play().catch(e => console.error("Gagal melanjutkan musik:", e));
      syncMusicIcon(); // Pastikan ikon sinkron saat melanjutkan
    }
  }

  // Jalankan animasi judul di index.html
  const title = document.getElementById('title');
  if (title) {
    anime({
      targets: '#title',
      translateY: [-50, 0], opacity: [0, 1],
      duration: 1200, easing: 'easeOutExpo'
    });
    anime({
      targets: '#subtitle',
      translateY: [-30, 0], opacity: [0, 1],
      delay: 300, duration: 1000, easing: 'easeOutExpo'
    });
  }

  // Logika saat tombol amplop diklik
  const openLetterButton = document.getElementById('open-letter');
  if (openLetterButton) {
    openLetterButton.addEventListener('click', function (event) {
      event.preventDefault();

      // MULAI MUSIK SAAT AMPLOP DIKLIK
      if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(e => console.error("Gagal memulai musik:", e));
      }

      // Simpan status musik untuk halaman berikutnya
      sessionStorage.setItem('musicTime', bgMusic.currentTime);
      sessionStorage.setItem('musicPlaying', !bgMusic.paused);

      setTimeout(() => { window.location.href = this.href; }, 300);
    });
  }

  const letterTitle = document.getElementById('letter-title');
  if (letterTitle) {
    anime({
      targets: '#letter-title',
      opacity: [0, 1], translateY: [-20, 0],
      duration: 1200, easing: 'easeOutExpo'
    });
  }
});
