const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.'))); // Serve frontend files

// API: Save Order & User
app.post('/api/order', (req, res) => {
    const { user, items, total } = req.body;

    if (!user || !user.name || !user.contact) {
        return res.status(400).json({ error: 'Datos de usuario incompletos' });
    }

    // 1. Insert or Update User
    const userStmt = db.prepare(`
        INSERT INTO users (name, contact) VALUES (?, ?)
        ON CONFLICT(contact) DO UPDATE SET name = excluded.name
        RETURNING id
    `);

    userStmt.get([user.name, user.contact], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error guardando usuario' });
        }

        const userId = row.id;

        // 2. Create Order
        const orderStmt = db.prepare(`
            INSERT INTO orders (user_id, items, total) VALUES (?, ?, ?)
        `);

        orderStmt.run([userId, JSON.stringify(items), total], function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error creando pedido' });
            }

            console.log(`Pedido #${this.lastID} creado para ${user.name}`);
            res.json({ success: true, orderId: this.lastID });
        });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Base de datos lista en tienda.db`);
});
