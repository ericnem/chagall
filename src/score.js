
// pointDeduction(guessed,startDate,endDate,startEra,endEra) 
// requires: guessed >= startEra && guessed <= endEra 
// *         startEra <= endEra
// *         startDate <= endDate

function pointDeduction(guess, startDate, endDate, startEra, endEra) {

  const maxScore = 1000; 
  // Error is raw difference between guess and correct range
  var error = 0;

  //  Target is the end of the range closest to the guess
  var target = 0;

  //  If guess is within correct range
  if (guess >= startDate && guess <= endDate){
    return maxScore; 
  }
  
  if (guess < startDate) {
    error = startDate - guess;
    target = startDate;
  } else {
    error = guess - endDate;
    target = endDate;
  }
  
  const range = endEra - startEra;

  // INITIAL STDEV IS THE ONLY THING THAT NEEDS TO BE MODIFIED ##
  // CAN BE DIVIDED BY A HIGHER NUMBER TO MAKE IT MORE SENSITIVE ##
  //OR DIVIDED BY A LOWER NUMBER TO MAKE IT LESS SENSITIVE ##
  
  var stdev = range/10;

  // Modifier is 1, i.e. has no effect, if the year is 2000
  //         is 2, i.e. doubles leniency, if the year is 1000 B.C.
  
  const ageModifier = 2 - (target + maxScore)/ 3000;

 // Standard deviation gets scaled by modifier
  
  stdev *= ageModifier;

  var score = Math.round(1000 * Math.exp(-((guess-target)**2)/(2*(stdev**2))));
  
  return score;
}
