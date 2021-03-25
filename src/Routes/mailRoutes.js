import express from 'express';
import MailController from './../Controllers/mailController';

const router = express.Router();

router.post('/sendmail',MailController.contactUs);

export default router;