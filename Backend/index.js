const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const kpiRoutes = require("./routes/kpi.js");
const productRoutes = require("./routes/product.js");
const transactionRoutes = require("./routes/transaction.js");
const login = require('./routes/login');
const register = require('./routes/register');
const dashboard = require('./routes/dashboard.js')
const mongoose = require('mongoose')
const KPI = require("./models/KPI.js");
const Product = require("./models/Product.js");
const Transaction = require("./models/Transaction.js");
const { kpis, products, transactions } = require("./data/data.js");
const verifyUser = require("./auth/auth.js");

//CONFIG
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
})) 

//ROUTES
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);
app.use('/register', register);
app.use('/login', login);
app.use('/', dashboard)

//MONGOOSE
const PORT = process.env.PORT || 9000;
mongoose.connect('mongodb+srv://FaizBerserk:3XWPmJempuRJxKLO@cluster0.zsps936.mongodb.net/?retryWrites=true&w=majority')
    .then(async () => {
        app.listen(3001, () => console.log(`Server running on port: ${PORT}`));

        // await mongoose.connection.db.dropDatabase();
        // KPI.insertMany(kpis);
        // Product.insertMany(products);
        // Transaction.insertMany(transactions);
    })
    .catch((error) => console.log(`OOPS: ran into an issue - ${error}`));