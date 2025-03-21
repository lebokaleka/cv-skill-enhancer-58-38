
// In-memory storage key for app state
export const APP_STATE_KEY = 'appState';

// Keys for specific data
export const JOB_MATCHING_KEY = 'jobMatching';

// Global state management
export const getAppState = () => {
  const stateString = window.localStorage.getItem(APP_STATE_KEY);
  if (!stateString) return null;
  try {
    return JSON.parse(stateString);
  } catch (e) {
    console.error('Failed to parse app state', e);
    return null;
  }
};

export const setAppState = (state: any) => {
  window.localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
};

export const clearAppState = () => {
  window.localStorage.removeItem(APP_STATE_KEY);
};

// CV Data specific methods
export const clearCVData = () => {
  const appState = getAppState();
  if (appState) {
    // Remove only CV analysis data while preserving other app state
    const { cvAnalysis, ...remainingState } = appState;
    setAppState(remainingState);
  }
};

// Job Matching specific methods
export const getJobMatchingData = () => {
  const data = localStorage.getItem(JOB_MATCHING_KEY);
  if (!data) return null;
  
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse job matching data', e);
    return null;
  }
};

export const setJobMatchingData = (data: any) => {
  localStorage.setItem(JOB_MATCHING_KEY, JSON.stringify(data));
};

export const clearJobMatchingData = () => {
  localStorage.removeItem(JOB_MATCHING_KEY);
};
