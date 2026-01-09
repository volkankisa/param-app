const BASE_URL = "http://localhost:3000/v1";

/* =====================
   YARDIMCI
===================== */
function showResult(baslik, veri) {
  document.getElementById("result").textContent =
    `${baslik}\n\n${JSON.stringify(veri, null, 2)}`;
}

/* =====================
   KAYIT OL
===================== */
function register() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;

  if (!username || !password) {
    showResult("KAYIT HATASI ❌", { hata: "Kullanıcı adı ve şifre gerekli" });
    return;
  }

  fetch(`${BASE_URL}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
  .then(async res => {
    const data = await res.json();
    if (!res.ok) throw data;
    localStorage.setItem("token", data.data.token);
    showResult("KAYIT BAŞARILI ✅", data);
  })
  .catch(err => showResult("KAYIT HATASI ❌", err));
}

/* =====================
   GİRİŞ
===================== */
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    showResult("GİRİŞ HATASI ❌", { hata: "Kullanıcı adı ve şifre gerekli" });
    return;
  }

  fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
  .then(async res => {
    const data = await res.json();
    if (!res.ok) throw data;
    localStorage.setItem("token", data.data.token);
    showResult("GİRİŞ BAŞARILI ✅", data);
  })
  .catch(err => showResult("GİRİŞ HATASI ❌", err));
}

/* =====================
   PROFİL
===================== */
function getProfile() {
  const token = localStorage.getItem("token");
  if (!token) { 
    showResult("PROFİL GÖRÜNTÜLEME HATASI ❌", { hata: "Önce giriş yapmalısınız" }); 
    return; 
  }

  fetch(`${BASE_URL}/user/profile`, {
    headers: { "Authorization": `Bearer ${token}` }
  })
  .then(async res => { 
    const data = await res.json(); 
    if(!res.ok) throw data; 
    return data; 
  })
  .then(data => showResult("KULLANICI BİLGİLERİ ✅", data))
  .catch(err => showResult("PROFİL GÖRÜNTÜLEME HATASI ❌", err));
}

/* =====================
   BAKİYE
===================== */
function getBalance() {
  const token = localStorage.getItem("token");
  if (!token) { 
    showResult("BAKİYE GÖRÜNTÜLEME HATASI ❌", { hata: "Önce giriş yapmalısınız" }); 
    return; 
  }

  fetch(`${BASE_URL}/wallet/balance`, {
    headers: { "Authorization": `Bearer ${token}` }
  })
  .then(async res => { 
    const data = await res.json(); 
    if(!res.ok) throw data; 
    return data; 
  })
  .then(data => showResult("BAKİYE ✅", data))
  .catch(err => showResult("BAKİYE HATASI ❌", err));
}

/* =====================
   CÜZDANA PARA YÜKLE
===================== */
function loadWallet() {
  const token = localStorage.getItem("token");
  const amount = Number(document.getElementById("loadAmount").value);

  if (!token) { 
    showResult("PARA YÜKLEME HATASI ❌", { hata: "Önce giriş yapmalısınız" }); 
    return; 
  }
  if (!amount || amount <= 0) { 
    showResult("PARA YÜKLEME HATASI ❌", { hata: "Geçersiz tutar" }); 
    return; 
  }

  fetch(`${BASE_URL}/wallet/load`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify({ amount })
  })
  .then(async res => { 
    const data = await res.json(); 
    if(!res.ok) throw data; 
    return data; 
  })
  .then(data => showResult("PARA YÜKLEME BAŞARILI ✅", data))
  .catch(err => showResult("PARA YÜKLEME HATASI ❌", err));
}

/* =====================
   ÖDEME YAP
===================== */
function payEvent() {
  const token = localStorage.getItem("token");
  const eventId = document.getElementById("eventId").value;
  const eventName = document.getElementById("eventName").value;
  const amount = Number(document.getElementById("payAmount").value);

  if (!token) { 
    showResult("ÖDEME HATASI ❌", { hata: "Önce giriş yapmalısınız" }); 
    return; 
  }
  if (!eventId || !eventName) { 
    showResult("ÖDEME HATASI ❌", { hata: "Event ID ve Event Adı gerekli" }); 
    return; 
  }
  if (!amount || amount <= 0) { 
    showResult("ÖDEME HATASI ❌", { hata: "Geçersiz tutar" }); 
    return; 
  }

  fetch(`${BASE_URL}/event/pay`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify({ eventId, eventName, amount })
  })
  .then(async res => { 
    const data = await res.json(); 
    if(!res.ok) throw data; 
    return data; 
  })
  .then(data => showResult("ÖDEME BAŞARILI ✅", data))
  .catch(err => showResult("ÖDEME HATASI ❌", err));
}

/* =====================
   HESABI SİL
===================== */
function deleteAccount() {
  const token = localStorage.getItem("token");
  if (!token) { 
    showResult("HESAP SİLME HATASI ❌", { hata: "Önce giriş yapmalısınız" }); 
    return; 
  }

  if (!confirm("Hesabınızı kalıcı olarak silmek istediğinize emin misiniz?")) {
    return;
  }

  fetch(`${BASE_URL}/user/delete`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  })
  .then(async res => { 
    const data = await res.json(); 
    if(!res.ok) throw data; 
    return data; 
  })
  .then(data => {
    showResult("HESAP SİLİNDİ ✅", data);
    localStorage.removeItem("token");
  })
  .catch(err => showResult("HESAP SİLME HATASI ❌", err));
}

/* =====================
   ÇIKIŞ
===================== */
function logout() {
  localStorage.removeItem("token");
  showResult("ÇIKIŞ YAPILDI ✅", { mesaj: "Token silindi" });
}

/* =====================
   ŞİFRE GÖSTER
===================== */
function togglePassword() {
  const pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}

function toggleRegPassword() {
  const pass = document.getElementById("regPassword");
  pass.type = pass.type === "password" ? "text" : "password";
}