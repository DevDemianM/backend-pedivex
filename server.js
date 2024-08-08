const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { connectDb } = require('./src/models');
const suppliesRoutes = require('./src/routes/suppliesRoutes');
const devolutionsRoutes = require('./src/routes/devolutionRoutes');
const productCategoriesRoutes = require('./src/routes/productCategoriesRoutes');
const productRoutes = require('./src/routes/productRoutes');
const clientRoutes = require('./src/routes/clientRoutes');
const employeeRoutes = require('./src/routes/employeeRoutes');
const saleRoutes = require('./src/routes/saleRoutes');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/supplies', suppliesRoutes);
app.use('/devolutions', devolutionsRoutes);
app.use('/productCategories', productCategoriesRoutes);
app.use('/product', productRoutes);
app.use('/api', clientRoutes);
app.use('/api', employeeRoutes);
app.use('/api', saleRoutes);
app.use('/api', authRoutes);

const port = process.env.SERVER_PORT || 3000;

const startServer = async () => {
    try {
        await connectDb();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
};

startServer();
