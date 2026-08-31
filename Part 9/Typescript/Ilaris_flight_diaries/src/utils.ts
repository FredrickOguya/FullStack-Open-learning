import type { NewDiaryEntry } from './types.ts';

const parseNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    console.log(object)
    const newEntry: NewDiaryEntry = {
      weather: 'cloudy',
      visibility: 'great',
      date: '2026-1-1',
      comment: 'fake news'
    };
  return newEntry;
}

export default parseNewDiaryEntry;