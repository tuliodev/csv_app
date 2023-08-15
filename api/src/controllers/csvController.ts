import { Request, Response } from 'express';
import { handleError } from '../utils/errorHandler';
import csvService from '../services/csvService';
import { ReadStream, createReadStream } from 'fs';

const csvController = {
  async uploadCSV(req: Request, res: Response) {
   
    if (!req.file) {
      return handleError(res, 400, 'No CSV file uploaded.');
    }

    const fileStream: ReadStream = createReadStream(req.file.path);
    try {
      const insertedUsers = await csvService.saveCSVData(fileStream);
      res.status(200).json({
        message: 'CSV file uploaded and data stored successfully.',
        insertedUsers,
      });
    } catch (error) {
      handleError(res, 500, 'An error occurred while processing the CSV file.');
    }
  },

  async searchCSV(req: Request, res: Response) {
    const { q } = req.query;
    try {
      const users = await csvService.searchCSVData(q as string);
      res.status(200).json(users);
    } catch (error) {
      handleError(res, 500, 'An error occurred while searching the CSV data.');
    }
  },
};

export default csvController;
