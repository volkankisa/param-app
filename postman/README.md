# Postman Collection

Bu klasörde API test collection'ı bulunmaktadır.

## Nasıl Kullanılır?

1. **Postman'i aç**
2. **Import** butonuna tıkla
3. `param-app-collection.json` dosyasını seç
4. Collection import edilecek

## Endpoint'ler

### 1. User Endpoints
- **POST** `/v1/user/register` - Kayıt ol
- **POST** `/v1/user/login` - Giriş yap
- **GET** `/v1/user/profile` - Profil bilgisi
- **DELETE** `/v1/user/delete` - Hesap sil

### 2. Wallet Endpoints
- **GET** `/v1/wallet/balance` - Bakiye sorgula
- **POST** `/v1/wallet/load` - Bakiye yükle

### 3. Event Endpoints
- **POST** `/v1/event/pay` - Ödeme yap

## Environment Variables

Local için:
- `BASE_URL`: `http://localhost:3000`

Production için:
- `BASE_URL`: `https://param-app.onrender.com`

## Kullanım Sırası

1. Register ile kullanıcı oluştur
2. Login ile token al
3. Token'i diğer isteklerde kullan (Authorization: Bearer {token})
4. Diğer endpoint'leri test et
