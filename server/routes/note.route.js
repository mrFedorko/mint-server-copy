import { Router } from 'express';
import { handleGetNotes } from '../controllers/noteController.js';

const notesRouter = Router();

notesRouter.get(
    '/get/:id',
    handleGetNotes
);


export {notesRouter}