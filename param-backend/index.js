const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [];
let payments = [];

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token gerekli' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Geçersiz token' });
    }
    req.user = user;
    next();
  });
};

app.get('/', (req, res) => {
  res.json({
    message: 'Backend API Çalışıyor! 🚀',
    version: '1.0.0',
    endpoints: {
      user: [
        'POST /v1/user/register',
        'POST /v1/user/login',
        'GET /v1/user/profile',
        'DELETE /v1/user/delete'
      ],
      wallet: [
        'GET /v1/wallet/balance',
        'POST /v1/wallet/load'
      ],
      event: [
        'POST /v1/event/pay'
      ]
    }
  });
});

app.post('/v1/user/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Kullanıcı adı ve şifre gerekli'
      });
    }
    // Username uzunluk kontrolü
    if (username.length > 20) {
      return res.status(400).json({
        success: false,
        message: 'Kullanıcı adı maksimum 20 karakter olabilir'
      });
    }

    // Username minimum kontrolü (opsiyonel)
    if (username.length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Kullanıcı adı minimum 3 karakter olmalıdır'
      });
    }

    const userExists = users.find(u => u.username === username);
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Bu kullanıcı adı zaten kayıtlı'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
      balance: 0,
      createdAt: new Date()
    };

    users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'Kullanıcı başarıyla oluşturuldu',
      data: {
        id: newUser.id,
        username: newUser.username,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Kayıt işlemi başarısız',
      error: error.message
    });
  }
});

app.post('/v1/user/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Kullanıcı adı ve şifre gerekli'
      });
    }

    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Kullanıcı adı veya şifre hatalı'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Kullanıcı adı veya şifre hatalı'
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Giriş başarılı',
      data: {
        id: user.id,
        username: user.username,
        balance: user.balance,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Giriş işlemi başarısız',
      error: error.message
    });
  }
});

app.get('/v1/user/profile', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      });
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        balance: user.balance,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Profil bilgileri alınamadı',
      error: error.message
    });
  }
});

app.delete('/v1/user/delete', authenticateToken, (req, res) => {
  try {
    const userIndex = users.findIndex(u => u.id === req.user.id);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      });
    }

    users.splice(userIndex, 1);

    res.json({
      success: true,
      message: 'Hesap başarıyla silindi'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Hesap silinemedi',
      error: error.message
    });
  }
});

app.get('/v1/wallet/balance', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      });
    }

    res.json({
      success: true,
      data: {
        balance: user.balance || 0,
        currency: 'TRY'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Bakiye sorgulanamadı',
      error: error.message
    });
  }
});

app.put('/v1/wallet/load', authenticateToken, (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Geçerli bir miktar giriniz'
      });
    }
    
    // Maksimum yükleme limiti kontrolü
    if (amount > 100000) {
      return res.status(400).json({
        success: false,
        message: 'Maksimum yükleme limiti 100,000 TL'
      });
    }

    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      });
    }

    user.balance = (user.balance || 0) + parseFloat(amount);

    res.json({
      success: true,
      message: 'Bakiye yükleme başarılı',
      data: {
        addedAmount: parseFloat(amount),
        newBalance: user.balance,
        currency: 'TRY'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Bakiye yüklenemedi',
      error: error.message
    });
  }
});

app.post('/v1/event/pay', authenticateToken, (req, res) => {
  try {
    const { eventId, eventName, amount } = req.body;

    if (!eventId || !amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Event ID ve geçerli miktar gerekli'
      });
    }

    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      });
    }

    if ((user.balance || 0) < parseFloat(amount)) {
      return res.status(400).json({
        success: false,
        message: 'Yetersiz bakiye',
        data: {
          currentBalance: user.balance || 0,
          requiredAmount: parseFloat(amount)
        }
      });
    }

    user.balance -= parseFloat(amount);

    const payment = {
      id: payments.length + 1,
      userId: user.id,
      eventId,
      eventName: eventName || `Event #${eventId}`,
      amount: parseFloat(amount),
      timestamp: new Date()
    };

    payments.push(payment);

    res.json({
      success: true,
      message: 'Ödeme başarılı',
      data: {
        paymentId: payment.id,
        eventName: payment.eventName,
        paidAmount: payment.amount,
        remainingBalance: user.balance,
        currency: 'TRY'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ödeme işlemi başarısız',
      error: error.message
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint bulunamadı',
    path: req.originalUrl
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server http://localhost:${PORT} adresinde çalışıyor`);
  console.log(`📋 Tüm endpoint'ler kullanıma hazır!`);
});