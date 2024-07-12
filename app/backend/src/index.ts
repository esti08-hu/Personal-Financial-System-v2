import express from 'express';
import cors from 'cors';
import usersRouter from './routes/usersRoutes';
import { config } from 'dotenv';
import transactionsRoutes from './routes/transactionsRoutes';
import budgetsRoutes from "./routes/budgetsRoutes";
import accountRoutes from './routes/accountRoutes';
import reportsRoutes from './routes/reportsRoutes';
config(); // Load environment variables

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', usersRouter);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/budgets', budgetsRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/reports', reportsRoutes);



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
