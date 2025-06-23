import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct path to root-level .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('MONGO_URI from server.js:', process.env.MONGODB_URI); // Should now print your URI

connectDB();

const app = express();
const port = process.env.API_PORT || 3001;

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
