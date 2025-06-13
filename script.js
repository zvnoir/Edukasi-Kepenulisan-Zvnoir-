// script.js

let artikelList = JSON.parse(localStorage.getItem("artikelList")) || [];

function tampilkanArtikel() {
  const list = document.getElementById("artikel-list");
  list.innerHTML = "";
  artikelList.forEach((a, index) => {
    const el = document.createElement("div");
    el.classList.add("artikel");
    el.innerHTML = `
      <h3>${a.judul}</h3>
      <button onclick="toggleIsi(${index})" id="btn-${index}">📖 Baca Selengkapnya</button>
      <div id="isi-${index}" style="display: none;">
        <p>${a.isi}</p>
        <div class="komentar-section">
          <strong>Komentar:</strong>
          <div id="komen-${index}">
            ${a.komentar.map(k => `<div class='komentar'>${k}</div>`).join("")}
          </div>
          <input type="text" id="inputKomen-${index}" placeholder="Tulis komentar...">
          <button onclick="tambahKomentar(${index})">Kirim</button>
        </div>
        <button onclick="hapusArtikel(${index})">🗑 Hapus Artikel</button>
      </div>
    `;
    list.appendChild(el);
  });
}

function toggleIsi(index) {
  const isi = document.getElementById(`isi-${index}`);
  const btn = document.getElementById(`btn-${index}`);
  if (isi.style.display === "none") {
    isi.style.display = "block";
    btn.textContent = "🔽 Sembunyikan";
  } else {
    isi.style.display = "none";
    btn.textContent = "📖 Baca Selengkapnya";
  }
}

function tambahKomentar(index) {
  const input = document.getElementById(`inputKomen-${index}`);
  const teks = input.value.trim();
  if (teks !== "") {
    artikelList[index].komentar.push(teks);
    localStorage.setItem("artikelList", JSON.stringify(artikelList));
    tampilkanArtikel();
  }
}

function hapusArtikel(index) { if (confirm("Yakin ingin menghapus artikel ini?")) { artikelList.splice(index, 1); localStorage.setItem("artikelList", JSON.stringify(artikelList)); tampilkanArtikel(); } }

function toggleFormArtikel() { const form = document.getElementById("formArtikel"); form.style.display = form.style.display === "none" ? "block" : "none"; }

document.getElementById("formArtikel").addEventListener("submit", function (e) { e.preventDefault(); const kunci = document.getElementById("kunciAdmin").value.trim(); const judul = document.getElementById("judulArtikel").value.trim(); const isi = document.getElementById("isiArtikel").value.trim();

if (kunci !== "12345") { alert("Kunci admin salah!"); return; }

artikelList.push({ judul, isi, komentar: [] }); localStorage.setItem("artikelList", JSON.stringify(artikelList)); document.getElementById("formArtikel").reset(); tampilkanArtikel(); });

tampilkanArtikel();

