
// pointDeduction(guessed,startDate,endDate,startEra,endEra) 
// requires: guessed >= startEra && guessed <= endEra 
// *         startEra <= endEra
// *         startDate <= endDate

export function pointDeduction(guess, answer, startEra, endEra) {

  const maxScore = 1000; 
  // Error is raw difference between guess and correct range
  var error = Math.abs(answer-guess);

  const range = endEra - startEra;

  // INITIAL STDEV IS THE ONLY THING THAT NEEDS TO BE MODIFIED ##
  // CAN BE DIVIDED BY A HIGHER NUMBER TO MAKE IT MORE SENSITIVE ##
  //OR DIVIDED BY A LOWER NUMBER TO MAKE IT LESS SENSITIVE ##
  
  var stdev = range/15;

  // Modifier is 1, i.e. has no effect, if the year is 2000
  //         is 2, i.e. doubles leniency, if the year is 1000 B.C.
  
  const ageModifier = 2 - (answer + maxScore)/ 3000;

 // Standard deviation gets scaled by modifier
  
  stdev *= ageModifier;

  var score = Math.round(1000 * Math.exp(-((error)**2)/(2*(stdev**2))));
  
  return score;
}
