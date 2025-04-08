import {Router} from 'express';
import SessionController from '../controller/sessionController';
import  {sessionSchema}  from '../schema/sessinoSchema';

const sessionRouter = Router();
const sessionControler = new SessionController();

sessionRouter.post('/', sessionSchema, sessionControler.create);

export default sessionRouter;
