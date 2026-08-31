import type { DiaryEntry, NonSensitiveDiaryEntry } from '../types.ts';
import diaries from '../../data/entries.ts';


const getEntries = (): DiaryEntry[] => {
  return diaries
}


const addDiary = () => {
  return null;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {

  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }))
}

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries
}