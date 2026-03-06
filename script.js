// Smooth scroll
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Toggle menu mobile
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");

if (navToggle && navMobile) {
  navToggle.addEventListener("click", function () {
    navMobile.classList.toggle("show");
  });
}

// ✅ Tutup menu saat tombol navigasi diklik (khusus navMobile)
document.querySelectorAll('#navMobile button').forEach(btn => {
  btn.addEventListener('click', function () {
    navMobile.classList.remove('show');
  });
});

// Booking form -> WhatsApp
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(bookingForm);
    const data = Object.fromEntries(fd.entries());
    const message = `*Assallamuallaikum, halo kak, saya ingin daftar:*%0A%0A*Nama:* ${data.name}%0A*Alamat Lengkap:* ${data.destination}%0A*Pilih dokter:* ${data.carType}%0A%0ATerima kasih!`;
    const wa = `https://wa.me/6289602337878?text=${message}`;
    window.open(wa, '_blank');
  });
}


// Data mobil 
const cars = [
  {
    name: "dr.A",
    images: [
      "assets/mobil/1.jpg",
      "assets/mobil/2.jpg",
      "assets/mobil/3.jpg"
    ],
    priceDaily: "Poli Umum",
    priceWeekly: "08.00 - 20.00",
    
  },
    {
    name: "dr.B",
    images: [
      "assets/mobil/4.jpg",
      "assets/mobil/5.jpg",
      "assets/mobil/6.jpg"
    ],
    priceDaily: "Poli BPJS",
    priceWeekly: "08.00 - 20.00",
    
  },
      {
    name: "dr.C",
    images: [
      "assets/mobil/7.jpg",
      "assets/mobil/8.jpg",
      "assets/mobil/9.jpg"
    ],
    priceDaily: "Poli Gigi",
    priceWeekly: "08.00 - 12.00",
    
  },
        {
    name: "dr.D",
    images: [
      "assets/mobil/10.JPG",
      "assets/mobil/11.jpg",
      "assets/mobil/12.jpg"
    ],
    priceDaily: "Poli Spesialis",
    priceWeekly: "08.00-12.00",
  },
        {
    name: "dr.E",
    images: [
      "assets/mobil/13.jpg",
      "assets/mobil/14.jpg",
      "assets/mobil/15.jpg"
    ],
    priceDaily: "UGD 24jam",
    priceWeekly: "24Jam",
  },

];

// Render katalog
const grid = document.getElementById("catalogGrid");
if (grid) {
  grid.innerHTML = cars.map((car, i) => `
    <div class="catalog-card">
      <div class="swiper car-swiper-${i}">
        <div class="swiper-wrapper">
          ${car.images.map(img => `<div class="swiper-slide"><img src="${img}" alt="${car.name}"></div>`).join("")}
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
      <div class="body">
        <h3>${car.name}</h3>
        <div class="price-row"><span>Dokter</span><span class="price">${car.priceDaily}</span></div>
        <div class="price-row"><span>Jam Praktik</span><span class="price">${car.priceWeekly}</span></div>
        <div class="card-actions"><button class="btn btn-primary btn-lg" onclick="selectCar('${car.name}')">Daftar Sekarang</button></div>
      </div>
    </div>
  `).join("");

  cars.forEach((_, i) => {
    new Swiper(`.car-swiper-${i}`, {
      loop: true,
      navigation: {
        nextEl: `.car-swiper-${i} .swiper-button-next`,
        prevEl: `.car-swiper-${i} .swiper-button-prev`,
      },
    });
  });

  // Tambahkan fungsi selectCar secara global. Fungsi ini akan mengisi select "Pilihan Mobil"
  // sesuai dengan nama mobil dari kartu yang diklik dan kemudian menggulir ke formulir pemesanan.
  window.selectCar = function(carName) {
    const select = document.getElementById('carType');
    if (select) {
      // Pastikan opsi mobil ada; jika belum, tambahkan.
      let optionExists = false;
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === carName || select.options[i].textContent === carName) {
          optionExists = true;
          break;
        }
      }
      if (!optionExists) {
        const opt = document.createElement('option');
        opt.value = carName;
        opt.textContent = carName;
        select.appendChild(opt);
      }
      // Set nilai select ke mobil yang dipilih
      select.value = carName;
    }
    // Scroll ke formulir booking
    scrollToId('booking');
  };

  document.getElementById("duration").addEventListener("change", function() {
    var timeSelect = document.getElementById("time");
    var durationValue = this.value;
    
    // Kosongkan opsi sebelumnya
    timeSelect.innerHTML = '<option value="">Pilih jumlah sewa</option>';
    
    // Tentukan jumlah pilihan berdasarkan lama sewa
    if (durationValue === "harian") {
      // Pilihan untuk harian (1-6 hari)
      for (var i = 1; i <= 6; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.textContent = i + " Hari";
        timeSelect.appendChild(option);
      }
    } else if (durationValue === "mingguan") {
      // Pilihan untuk mingguan (1-3 minggu)
      for (var i = 1; i <= 3; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.textContent = i + " Minggu";
        timeSelect.appendChild(option);
      }
    } else if (durationValue === "bulanan") {
      // Pilihan untuk bulanan (1-6 bulan)
      for (var i = 1; i <= 6; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.textContent = i + " Bulan";
        timeSelect.appendChild(option);
      }
    }
  });
  
  // Inisialisasi GLightbox setelah halaman termuat
  const lightbox = GLightbox({
    touchNavigation: true,   // memungkinkan navigasi sentuh (swipe) di mobile
    loop: true               // memungkinkan looping ke foto pertama setelah foto terakhir
  });
  // Secara default, GLightbox akan otomatis mencari elemen dengan class "glightbox" dan mengaktifkan lightbox pada elemen tersebut.

  
}
