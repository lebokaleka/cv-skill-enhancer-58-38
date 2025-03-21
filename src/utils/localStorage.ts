
// In-memory storage key for app state
export const APP_STATE_KEY = 'appState';

// Global state management (memory only, not persistent)
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
