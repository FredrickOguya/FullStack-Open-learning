import express, { type NextFunction, type Response, type Request } from 'express'
import diaryService from '../services/diaryService.ts';
import { NewEntrySchema, type DiaryEntry, type NewDiaryEntry, type NonSensitiveDiaryEntry } from '../types.ts';
import z from 'zod';

const router = express.Router();

const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown){
    next(error);
  }
}

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if(error instanceof z.ZodError){
    res.status(400).send({ error: error.issues })
  } else {
    next(error);
  }
}

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries())
});





router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {  
  const addedEntry = diaryService.addDiary(req.body);  
  res.json(addedEntry);
});


router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if(diary){
    res.send(diary)
  } else {
    res.sendStatus(404)
  }
})

router.use(errorMiddleware)

export default router;