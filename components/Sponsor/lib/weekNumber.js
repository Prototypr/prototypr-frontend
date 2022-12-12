// https://github.com/datetime/current-week-number/blob/master/index.js
export const currentWeekNumber = (date)=> {
    var instance;
  
    if (typeof date === 'string' && date.length) {
      instance = new Date(date);
    } else if (date instanceof Date) {
      instance = date;
    } else {
      instance = new Date();
    }
  
    // Create a copy of this date object
    var target = new Date(instance.valueOf());
  
    // ISO week date weeks start on monday
    // so correct the day number
    var dayNr = (instance.getDay() + 6) % 7;
  
    // ISO 8601 states that week 1 is the week
    // with the first thursday of that year.
    // Set the target date to the thursday in the target week
    target.setDate(target.getDate() - dayNr + 3);
  
    // Store the millisecond value of the target date
    var firstThursday = target.valueOf();
  
    // Set the target to the first thursday of the year
    // First set the target to january first
    target.setMonth(0, 1);
    // Not a thursday? Correct the date to the next thursday
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
  
    // The weeknumber is the number of weeks between the
    // first thursday of the year and the thursday in the target week
    var weekNumber = 1 + Math.ceil((firstThursday - target) / 604800000);
    return weekNumber;
  };