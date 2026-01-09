const { Builder, By } = require("selenium-webdriver");
const axios = require("axios");

const BASE_URL = "http://localhost:3000";

(async function testAll() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1️⃣ Frontend sayfasını aç
    await driver.get("http://127.0.0.1:5500/index.html"); // Live Server URL

    // 2️⃣ Kullanıcı adı ve şifreyi inputlara yaz
    await driver.findElement(By.id("username")).sendKeys("param_user");
    await driver.findElement(By.id("password")).sendKeys("1234");

    // 3️⃣ Login butonuna tıkla
    await driver.findElement(By.xpath("//button[text()='Giriş Yap']")).click();

    // 4️⃣ Backend login API testi (token al)
    const loginResponse = await axios.post(`${BASE_URL}/v1/auth/login`, {
      username: "param_user",
      password: "1234"
    });
    const token = loginResponse.data.token;
    console.log("✅ Token alındı:", token);

    // 5️⃣ Balance testi
    const balanceRes = await axios.get(`${BASE_URL}/v1/wallet/balance`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("💰 Mevcut bakiye:", balanceRes.data.balance);

    // 6️⃣ Ödeme yapma testi
    const paymentRes = await axios.post(
      `${BASE_URL}/v1/event/pay`,
      { amount: 5 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("💳 Ödeme sonucu:", paymentRes.data);

    // 7️⃣ Ekrandaki sonucu oku (UI testi)
    const uiResult = await driver.findElement(By.id("result")).getText();
    console.log("🖥️ UI sonucu:", uiResult);

  } catch (err) {
    console.error("❌ Hata:", err);
  } finally {
    // Tarayıcıyı kapat
    await driver.quit();
  }
})();

