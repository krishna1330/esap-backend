const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

require('dotenv').config();

const { sequelize } = require('./database/models');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// health
app.get('/health', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({ status: 'ok' });
    } catch (e) {
        res.status(500).json({ status: 'db-error', error: e.message });
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/admins', usersRoutes);

// 404
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Internal Error' });
});

module.exports = app;
