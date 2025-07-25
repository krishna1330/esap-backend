const app = require('./app');
const { sequelize } = require('./database/models');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ DB connected');
    } catch (e) {
        console.error('❌ DB connection failed:', e.message);
    }

    app.listen(PORT, () => {
        console.log(`ESAP API listening on port ${PORT}`);
    });
})();
