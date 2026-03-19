//Express App
const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middlewares/auth.middleware');
const authRoutes = require('./modules/auth/auth.routes');
const projectRoutes = require('./modules/project/project.routes');
const orgRateLimiter = require('./middlewares/rateLimit.middleware');
const app = express();

app.use(cors());
app.use(express.json());


app.get('/health', (req,res)=>{
    res.json({status: 'ok'});
})


// 1. Auth first (sets req.user)
app.use('/api', authMiddleware);

// Apply Organization-Level Rate Limiting
app.use('/api', orgRateLimiter);
// Connect Routes to App
app.use('/api/auth', authRoutes);
// Connect Project Routes
app.use('/api/projects', projectRoutes);


module.exports = app;