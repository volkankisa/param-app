# Param Event - Payment System

Full-stack payment application with backend API and frontend interface.

## 🚀 Live Demo

- **Frontend:** https://param-app-e7qs.vercel.app
- **Backend API:** https://param-app.onrender.com

## 📋 Postman Collection

API endpoint'lerini test etmek için Postman collection'ı kullanabilirsiniz:

👉 [Postman Collection](./postman/param-app-collection.json)

### Nasıl Import Edilir?

1. Postman'i açın
2. Import → Upload Files
3. `postman/param-app-collection.json` dosyasını seçin

## 🛠️ Teknolojiler

**Backend:**
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

**Frontend:**
- HTML5
- Vanilla JavaScript
- CSS3

**Deployment:**
- Backend: Render
- Frontend: Vercel

**CI/CD:**
- GitHub Actions

## 📦 Kurulum

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend

VS Code'da `frontend/index.html` dosyasını Live Server ile açın.

## 📚 API Endpoints

### User
- `POST /v1/user/register` - Kayıt ol
- `POST /v1/user/login` - Giriş yap
- `GET /v1/user/profile` - Profil bilgisi
- `DELETE /v1/user/delete` - Hesap sil

### Wallet
- `GET /v1/wallet/balance` - Bakiye sorgula
- `POST /v1/wallet/load` - Bakiye yükle

### Event
- `POST /v1/event/pay` - Ödeme yap

## 🔐 Environment Variables

Backend için `.env` dosyası oluşturun:
```env
PORT=3000
JWT_SECRET=your_secret_key_here
```

## 👥 Geliştirici

[Volkan Kısa](https://github.com/volkankisa)

## 📄 License

MIT
