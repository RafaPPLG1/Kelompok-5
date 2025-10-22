let jadwal = [];

// Fungsi menambah pelajaran
function tambahPelajaran() {
  const hari = document.getElementById("hari").value.trim();
  const pelajaran = document.getElementById("pelajaran").value.trim();
  const jam = document.getElementById("jam").value.trim();

  if (!hari || !pelajaran || !jam) {
    alert("⚠️ Lengkapi semua kolom (hari, pelajaran, dan jam)!");
    return;
  }

  // Cari apakah hari sudah ada
  let dataHari = jadwal.find((item) => item.hari.toLowerCase() === hari.toLowerCase());

  if (dataHari) {
    dataHari.pelajaran.push({ nama: pelajaran, jam: jam });
  } else {
    jadwal.push({
      hari: hari,
      pelajaran: [{ nama: pelajaran, jam: jam }]
    });
  }

  document.getElementById("pelajaran").value = "";
  document.getElementById("jam").value = "";
  alert("✅ Pelajaran berhasil ditambahkan!");
}

// Bubble sort untuk urutkan hari
function bubbleSortHari() {
  for (let i = 0; i < jadwal.length - 1; i++) {
    for (let j = 0; j < jadwal.length - i - 1; j++) {
      if (jadwal[j].hari.toLowerCase() > jadwal[j + 1].hari.toLowerCase()) {
        let temp = jadwal[j];
        jadwal[j] = jadwal[j + 1];
        jadwal[j + 1] = temp;
      }
    }
  }
}

// Menampilkan jadwal
function tampilkanJadwal() {
  bubbleSortHari();
  let output = document.getElementById("output");
  output.innerHTML = "<h3>📆 Jadwal Pelajaran:</h3>";

  for (let i = 0; i < jadwal.length; i++) {
    output.innerHTML += `<div class='jadwal-item'><strong>${jadwal[i].hari}:</strong><br>`;

    let j = 0;
    while (j < jadwal[i].pelajaran.length) {
      output.innerHTML += `- ${jadwal[i].pelajaran[j].nama} (${jadwal[i].pelajaran[j].jam})
        <button class='hapus-btn' onclick="hapusPelajaran('${jadwal[i].hari}','${jadwal[i].pelajaran[j].nama}')">Hapus</button><br>`;
      j++;
    }

    output.innerHTML += "</div>";
  }
}

// Sequential search: mencari jadwal berdasarkan hari
function cariJadwal() {
  const namaHari = document.getElementById("cariHari").value.trim();
  const hasilCari = document.getElementById("hasilCari");

  if (!namaHari) {
    alert("Masukkan nama hari yang ingin dicari!");
    return;
  }

  let ditemukan = null;
  for (let i = 0; i < jadwal.length; i++) {
    if (jadwal[i].hari.toLowerCase() === namaHari.toLowerCase()) {
      ditemukan = jadwal[i];
      break;
    }
  }

  if (ditemukan) {
    let hasil = `<strong>${ditemukan.hari}:</strong><br>`;
    for (let j = 0; j < ditemukan.pelajaran.length; j++) {
      hasil += `- ${ditemukan.pelajaran[j].nama} (${ditemukan.pelajaran[j].jam})<br>`;
    }
    hasilCari.innerHTML = hasil;
  } else {
    hasilCari.innerHTML = `<span style='color:red;'>❌ Jadwal hari ${namaHari} tidak ditemukan!</span>`;
  }
}

// Fungsi hapus pelajaran
function hapusPelajaran(hari, namaPelajaran) {
  for (let i = 0; i < jadwal.length; i++) {
    if (jadwal[i].hari.toLowerCase() === hari.toLowerCase()) {
      jadwal[i].pelajaran = jadwal[i].pelajaran.filter(
        (p) => p.nama.toLowerCase() !== namaPelajaran.toLowerCase()
      );
      if (jadwal[i].pelajaran.length === 0) {
        jadwal.splice(i, 1);
      }
      tampilkanJadwal();
      return;
    }
  }
}
