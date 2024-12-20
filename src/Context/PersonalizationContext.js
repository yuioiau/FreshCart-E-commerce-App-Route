export const PersonalizationContext = createContext({
  recentlyViewed: [],
  recommendations: [],
  userPreferences: {},
  addToRecentlyViewed: () => {},
  updatePreferences: () => {},
}); 