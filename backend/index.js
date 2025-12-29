import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'
import cors from 'cors'

const app = express()
const httpServer = createServer(app)

// Настройка CORS
app.use(cors())
app.use(express.json())

// Создание Socket.IO сервера
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

// ========================================
// ДАННЫЕ (База данных в памяти)
// ========================================

let products = [
    {
        id: 1,
        serialNumber: 1234,
        isNew: 1,
        photo: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Monitor+1',
        title: 'Samsung Monitor 24"',
        type: 'Monitors',
        specification: 'Full HD, IPS, 60Hz',
        guarantee: {
            start: '2017-06-29 12:09:33',
            end: '2018-06-29 12:09:33',
        },
        price: [
            {value: 100, symbol: 'USD', isDefault: 0},
            {value: 2600, symbol: 'UAH', isDefault: 1},
        ],
        order: 1,
        date: '2017-06-29 12:09:33',
    },
    {
        id: 2,
        serialNumber: 1235,
        isNew: 1,
        photo: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Monitor+2',
        title: 'LG Monitor 27"',
        type: 'Monitors',
        specification: '4K, IPS, 144Hz',
        guarantee: {
            start: '2017-06-29 12:09:33',
            end: '2018-06-29 12:09:33',
        },
        price: [
            {value: 150, symbol: 'USD', isDefault: 0},
            {value: 3900, symbol: 'UAH', isDefault: 1},
        ],
        order: 2,
        date: '2017-06-29 12:09:33',
    },
    {
        id: 3,
        serialNumber: 1236,
        isNew: 0,
        photo: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Tablet+1',
        title: 'iPad Pro 12.9"',
        type: 'Tablets',
        specification: '256GB, WiFi',
        guarantee: {
            start: '2017-06-29 12:09:33',
            end: '2018-06-29 12:09:33',
        },
        price: [
            {value: 200, symbol: 'USD', isDefault: 0},
            {value: 5200, symbol: 'UAH', isDefault: 1},
        ],
        order: 3,
        date: '2017-06-29 12:09:33',
    },
    {
        id: 4,
        serialNumber: 1237,
        isNew: 1,
        photo: 'https://via.placeholder.com/150/FFFF00/000000?text=Phone+1',
        title: 'iPhone 14 Pro',
        type: 'Smartphones',
        specification: '128GB, Black',
        guarantee: {
            start: '2017-06-29 12:09:33',
            end: '2018-06-29 12:09:33',
        },
        price: [
            {value: 300, symbol: 'USD', isDefault: 0},
            {value: 7800, symbol: 'UAH', isDefault: 1},
        ],
        order: 1,
        date: '2017-06-29 12:09:33',
    },
    {
        id: 5,
        serialNumber: 1238,
        isNew: 0,
        photo: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Tablet+2',
        title: 'Samsung Galaxy Tab S8',
        type: 'Tablets',
        specification: '128GB, WiFi+LTE',
        guarantee: {
            start: '2017-06-29 12:09:33',
            end: '2018-06-29 12:09:33',
        },
        price: [
            {value: 250, symbol: 'USD', isDefault: 0},
            {value: 6500, symbol: 'UAH', isDefault: 1},
        ],
        order: 2,
        date: '2017-06-29 12:09:33',
    },
]

let orders = [
    {
        id: 1,
        title: 'Приход 1',
        date: '2017-06-29 12:09:33',
        description: 'Первая поставка мониторов и смартфонов',
    },
    {
        id: 2,
        title: 'Приход 2',
        date: '2017-07-15 10:30:00',
        description: 'Вторая поставка мониторов и планшетов',
    },
    {
        id: 3,
        title: 'Приход 3',
        date: '2017-08-20 14:45:00',
        description: 'Третья поставка планшетов',
    },
]

// ========================================
// REST API ENDPOINTS
// ========================================

app.get('/api/orders', (req, res) => {
    const ordersWithProducts = orders.map(order => ({
        ...order,
        products: products.filter(p => p.order === order.id),
    }))

    console.log(
        '📦 GET /api/orders - отправлено заказов:',
        ordersWithProducts.length
    )
    res.json(ordersWithProducts)
})

app.get('/api/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id)
    const order = orders.find(o => o.id === orderId)

    if (!order) {
        return res.status(404).json({error: 'Order not found'})
    }

    const orderWithProducts = {
        ...order,
        products: products.filter(p => p.order === orderId),
    }

    console.log('📦 GET /api/orders/:id - отправлен заказ:', orderId)
    res.json(orderWithProducts)
})

app.delete('/api/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id)
    const orderIndex = orders.findIndex(o => o.id === orderId)

    if (orderIndex === -1) {
        return res.status(404).json({error: 'Order not found'})
    }

    orders.splice(orderIndex, 1)

    products = products.filter(p => p.order !== orderId)

    console.log('🗑️  DELETE /api/orders/:id - удален заказ:', orderId)
    res.json({success: true, id: orderId})
})

app.post('/api/orders', (req, res) => {
    const newOrder = {
        id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
        title: req.body.title,
        date: req.body.date || new Date().toISOString(),
        description: req.body.description,
    }

    orders.push(newOrder)

    console.log('➕ POST /api/orders - создан заказ:', newOrder.id)
    res.status(201).json(newOrder)
})

app.get('/api/products', (req, res) => {
    const type = req.query.type

    let filteredProducts = products

    if (type && type !== 'all') {
        filteredProducts = products.filter(p => p.type === type)
    }

    const productsWithOrder = filteredProducts.map(product => {
        const order = orders.find(o => o.id === product.order)
        return {
            ...product,
            orderTitle: order ? order.title : 'Unknown',
        }
    })

    console.log(
        '🏷️  GET /api/products - отправлено продуктов:',
        productsWithOrder.length
    )
    res.json(productsWithOrder)
})

app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id)
    const product = products.find(p => p.id === productId)

    if (!product) {
        return res.status(404).json({error: 'Product not found'})
    }

    console.log('🏷️  GET /api/products/:id - отправлен продукт:', productId)
    res.json(product)
})

app.get('/api/product-types', (req, res) => {
    const types = [...new Set(products.map(p => p.type))]
    console.log('📋 GET /api/product-types - отправлено типов:', types.length)
    res.json(types)
})


app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        orders: orders.length,
        products: products.length,
    })
})

// ========================================
// WebSocket для счетчика активных сессий
// ========================================

let activeConnections = 0

io.on('connection', socket => {
    activeConnections++
    console.log(`✅ Новое подключение. Активных сессий: ${activeConnections}`)

    // Отправляем текущее количество сессий всем клиентам
    io.emit('activeSessions', activeConnections)

    socket.on('disconnect', () => {
        activeConnections--
        console.log(`❌ Отключение. Активных сессий: ${activeConnections}`)

        // Отправляем обновленное количество сессий
        io.emit('activeSessions', activeConnections)
    })

    // Обработка пинга для поддержания соединения
    socket.on('ping', () => {
        socket.emit('pong')
    })
})

// ========================================
// ЗАПУСК СЕРВЕРА
// ========================================

const PORT = 3000

httpServer.listen(PORT, () => {
    console.log('')
    console.log('=================================')
    console.log('🚀 Сервер запущен!')
    console.log('=================================')
    console.log(`📡 WebSocket: http://localhost:${PORT}`)
    console.log(`🌐 REST API:  http://localhost:${PORT}/api`)
    console.log('')
    console.log('📚 Доступные endpoints:')
    console.log('   GET    /api/orders')
    console.log('   GET    /api/orders/:id')
    console.log('   POST   /api/orders')
    console.log('   DELETE /api/orders/:id')
    console.log('   GET    /api/products')
    console.log('   GET    /api/products/:id')
    console.log('   GET    /api/product-types')
    console.log('   GET    /api/health')
    console.log('=================================')
    console.log('')
})

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM получен. Закрытие сервера...')
    httpServer.close(() => {
        console.log('Сервер закрыт')
        process.exit(0)
    })
})
