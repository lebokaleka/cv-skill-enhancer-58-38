
import { APP_STATE_KEY, getAppState, setAppState } from './localStorage';

// Keys for cover letter data
const COVER_LETTER_DATA_KEY = 'coverLetterData';

export interface CoverLetterStorageData {
  cvText: string;
  jobDescription: string;
  coverLetter: string;
  selectedTemplate: string;
  step: 'input' | 'result';
}

// Save cover letter data to localStorage
export const saveCoverLetterData = (data: CoverLetterStorageData): void => {
  const appState = getAppState() || {};
  setAppState({
    ...appState,
    [COVER_LETTER_DATA_KEY]: data
  });
};

// Get cover letter data from localStorage
export const getCoverLetterData = (): CoverLetterStorageData | null => {
  const appState = getAppState();
  return appState ? appState[COVER_LETTER_DATA_KEY] : null;
};

// Clear cover letter data
export const clearCoverLetterData = (): void => {
  const appState = getAppState();
  if (appState && appState[COVER_LETTER_DATA_KEY]) {
    const { [COVER_LETTER_DATA_KEY]: _, ...remainingState } = appState;
    setAppState(remainingState);
  }
};
