import express from 'express';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoute.js';
import postRoutes from './src/routes/postRoute.js';
import commentRoute from './src/routes/commentRoute.js';
import likeUnlikeRoute from './src/routes/likeUnlikeRoute.js';


dotenv.config();

//connection to database
connectDB();

const app = express();
app.use(express.json());

// test route
app.get('/', (req, res) => {
    res.send('Blog API is running fine!');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', postRoutes);
app.use('/api/v1', commentRoute);
app.use('/api/v1', likeUnlikeRoute);


//server starts
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running ✅ on port ${PORT}`);
});