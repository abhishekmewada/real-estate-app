import express from 'express';
import { shouldBeAdmin } from '../controllers/test.controllers.js';
import { shouldBeLoggedIn } from '../controllers/test.controllers.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get("/should-be-logged-in", verifyToken,  shouldBeLoggedIn );

router.get("/should-be-admin", shouldBeAdmin );

 


export default router;