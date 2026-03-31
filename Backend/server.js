const express = require('express');
const mysql   = require('mysql2');
const cors    = require('cors');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// ✅ CORS
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ════════════════════════════════
// ✅ MySQL Connection (Railway FIXED)
// ════════════════════════════════
const url = new URL(process.env.DATABASE_URL);

const db = mysql.createConnection({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.replace("/", ""),
  port: url.port,
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
    process.exit(1);
  }
  console.log('✅ Connected to Railway MySQL');
});

// ════════════════════════════════
// ✅ Test Route
// ════════════════════════════════
app.get('/', (req, res) => {
  res.json({ message: '🚀 AI LearnX Backend is running!' });
});

// ════════════════════════════════
// ✅ REGISTER
// ════════════════════════════════
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.query(
    'SELECT id FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length > 0) {
        return res.status(409).json({ error: 'Email already registered' });
      }

      const hashed = await bcrypt.hash(password, 10);

      db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashed],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });

          res.json({
            success: true,
            message: 'Account created successfully!',
          });
        }
      );
    }
  );
});

// ════════════════════════════════
// ✅ LOGIN
// ════════════════════════════════
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = results[0];

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.JWT_SECRET || 'fallback_secret_key',
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        token,
        user: {
          id:    user.id,
          name:  user.name,
          email: user.email,
        },
      });
    }
  );
});

// ════════════════════════════════
// ✅ ENROLL
// ════════════════════════════════
app.post('/api/enroll', (req, res) => {
  const { userId, courseId, courseTitle, amount, cardHolder } = req.body;

  if (!userId || !courseId || !courseTitle) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.query(
    'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
    [userId, courseId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length > 0) {
        return res.status(409).json({ error: 'Already enrolled in this course' });
      }

      db.query(
        `INSERT INTO enrollments
         (user_id, course_id, course_title, amount, card_holder, progress)
         VALUES (?, ?, ?, ?, ?, 0)`,
        [userId, courseId, courseTitle, amount, cardHolder],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });

          res.json({
            success: true,
            message: 'Enrolled successfully!',
          });
        }
      );
    }
  );
});

// ════════════════════════════════
// ✅ DASHBOARD
// ════════════════════════════════
app.get('/api/dashboard/:userId', (req, res) => {
  db.query(
    'SELECT * FROM enrollments WHERE user_id = ? ORDER BY enrolled_at DESC',
    [req.params.userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// ════════════════════════════════
// ✅ UPDATE PROGRESS
// ════════════════════════════════
app.put('/api/progress', (req, res) => {
  const { userId, courseId, progress } = req.body;

  if (!userId || !courseId || progress === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.query(
    'UPDATE enrollments SET progress = ? WHERE user_id = ? AND course_id = ?',
    [progress, userId, courseId],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ success: true, message: 'Progress updated!' });
    }
  );
});

// ════════════════════════════════
// ✅ GET USER PROFILE
// ════════════════════════════════
app.get('/api/user/:userId', (req, res) => {
  db.query(
    'SELECT id, name, email, created_at FROM users WHERE id = ?',
    [req.params.userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(results[0]);
    }
  );
});

// ════════════════════════════════
// ✅ START SERVER
// ════════════════════════════════
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});