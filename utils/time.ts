/**
 * Returns the current date in Hong Kong Time Zone.
 * We use this to determine which doors are lockable.
 */
export const getHKDate = (): Date => {
  const now = new Date();
  const hkTimeString = now.toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" });
  return new Date(hkTimeString);
};

/**
 * Returns the current day of the month in HK time.
 * If it's not December yet, returns 0.
 * If it's past Dec 25, returns 26 (or keeps 25 depending on logic).
 */
export const getCurrentDayHK = (): number => {
  const hkDate = getHKDate();
  const month = hkDate.getMonth(); // 0-indexed, Dec is 11
  
  if (month !== 11) {
    // For testing purposes, if it's NOT December, we might want to simulate a date
    // or return 0 to lock everything.
    // Uncomment the line below to simulate being on Dec 15th for development:
    // return 15; 
    return 0; // Not December
  }
  
  return hkDate.getDate();
};

export const isFutureDay = (day: number): boolean => {
  const currentDay = getCurrentDayHK();
  // If currentDay is 0 (Nov or earlier), all Dec days are future
  if (currentDay === 0) return true;
  return day > currentDay;
};
