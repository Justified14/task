require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 1001
const mongoose = require('mongoose');
const taskRouter = require('./routes/taskRouter');
const notFound = require('./middleware/notFoundRoute')
const errorHandler = require('./middleware/errorHandler')
mongoose.set('strictQuery', true);





app.use(express.json());


app.use('/api/v1/tasks/', taskRouter)
app.use(errorHandler)



app.use(notFound)

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`server established on ${PORT} database connection is established also`);
        });
    } catch (error) {
        console.log(error);
    }
};
startServer();
