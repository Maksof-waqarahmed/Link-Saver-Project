import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors()); 
// Routes file
import routes from './src/routes/index'
app.use(express.json());
app.use(routes);

app.listen(3000, ()=> {
    console.log(`Our Server running on 3000 Port.`)
})