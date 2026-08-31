import type { DiaryEntry } from '../types.ts';
import diaries from '../../data/entries.ts';


const getEntries = (): DiaryEntry[] => {
  return diaries
}


const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary
}