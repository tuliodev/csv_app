import { Router } from 'express';
import multer from 'multer';
import csvController from '../controllers/csvController';

const csvRoutes = Router();
const upload = multer({dest: './uploads'});

csvRoutes.post('/files', upload.single('file'), csvController.uploadCSV);
csvRoutes.get('/users', csvController.searchCSV);

export default csvRoutes;
