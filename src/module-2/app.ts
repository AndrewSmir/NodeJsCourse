import express, { json, urlencoded } from 'express';
import { userRouter } from './controllers/user-controller';
import { groupRouter } from './controllers/group-controller';

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(userRouter);
app.use(groupRouter);

app.listen(3000, () => console.log(`Process has been started on port 3000`));
