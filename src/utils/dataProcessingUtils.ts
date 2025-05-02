import { FrequencyTableRow, ProcessedData, StatisticalResults } from '../types/dataTypes';

// Process the user input and return all necessary data for analysis
export const processDataInput = (input: string): ProcessedData => {
  // Parse input string into numbers
  const dataPoints = input
    .trim()
    .split(/[\s,;]+/)
    .filter(value => value !== '')
    .map(Number)
    .filter(num => !isNaN(num));

  // Sort the data in ascending order
  const sortedData = [...dataPoints].sort((a, b) => a - b);
  
  // Calculate the range
  const min = sortedData[0];
  const max = sortedData[sortedData.length - 1];
  const range = max - min;
  
  // Calculate number of classes using Sturges' Rule
  // k = 1 + 3.322 * log10(n)
  const classCount = Math.ceil(1 + 3.322 * Math.log10(sortedData.length));
  
  // Calculate class width
  const classWidth = Math.ceil(range / classCount);
  
  // Generate frequency distribution table
  const frequencyTable = createFrequencyDistributionTable(
    sortedData, 
    min, 
    classCount, 
    classWidth
  );
  
  // Calculate total frequency, total fx, and total fx^2
  const totalFrequency = frequencyTable.reduce((sum, row) => sum + row.frequency, 0);
  const totalFx = frequencyTable.reduce((sum, row) => sum + row.fx, 0);
  const totalFx2 = frequencyTable.reduce((sum, row) => sum + row.fx2, 0);
  
  // Calculate statistical measures
  const statistics = calculateStatistics(frequencyTable, totalFrequency, totalFx, totalFx2);
  
  return {
    sortedData,
    range,
    classCount,
    classWidth,
    frequencyTable,
    totalFrequency,
    totalFx,
    totalFx2,
    statistics
  };
};

// Create frequency distribution table
const createFrequencyDistributionTable = (
  sortedData: number[], 
  min: number, 
  classCount: number, 
  classWidth: number
): FrequencyTableRow[] => {
  const table: FrequencyTableRow[] = [];
  let cumulativeFrequency = 0;
  
  for (let i = 0; i < classCount; i++) {
    const lowerBound = min + (i * classWidth);
    const upperBound = lowerBound + classWidth;
    const midpoint = (lowerBound + upperBound) / 2;
    
    // Count frequencies
    const frequency = sortedData.filter(
      value => value >= lowerBound && (
        i === classCount - 1 ? value <= upperBound : value < upperBound
      )
    ).length;
    
    if (frequency > 0 || i < classCount - 1) {
      cumulativeFrequency += frequency;
      const fx = midpoint * frequency;
      const x2 = Math.pow(midpoint, 2);
      const fx2 = x2 * frequency;
      
      table.push({
        classInterval: `${lowerBound.toFixed(1)} - ${upperBound.toFixed(1)}`,
        frequency,
        cumulativeFrequency,
        midpoint,
        fx,
        x2,
        fx2
      });
    }
  }
  
  return table;
};

// Calculate statistical measures
const calculateStatistics = (
  frequencyTable: FrequencyTableRow[],
  totalFrequency: number,
  totalFx: number,
  totalFx2: number
): StatisticalResults => {
  // Mean
  const mean = totalFx / totalFrequency;
  
  // Median - find the class containing the median position
  const medianPosition = totalFrequency / 2;
  let medianClass = 0;
  let cumulativeBefore = 0;
  
  while (
    medianClass < frequencyTable.length && 
    frequencyTable[medianClass].cumulativeFrequency < medianPosition
  ) {
    cumulativeBefore = frequencyTable[medianClass].cumulativeFrequency;
    medianClass++;
  }
  
  // Extract values for the median class
  const medianClassRow = frequencyTable[medianClass];
  const [lowerBound, upperBound] = medianClassRow.classInterval
    .split(' - ')
    .map(parseFloat);
  
  // Calculate median using interpolation formula
  const classWidth = upperBound - lowerBound;
  const median = lowerBound + (
    (medianPosition - cumulativeBefore) / medianClassRow.frequency
  ) * classWidth;
  
  // Mode - find the class with the highest frequency
  let modeClass = 0;
  let maxFrequency = frequencyTable[0].frequency;
  
  for (let i = 1; i < frequencyTable.length; i++) {
    if (frequencyTable[i].frequency > maxFrequency) {
      maxFrequency = frequencyTable[i].frequency;
      modeClass = i;
    }
  }
  
  // Modal class
  const modeClassRow = frequencyTable[modeClass];
  const [modeLower, modeUpper] = modeClassRow.classInterval
    .split(' - ')
    .map(parseFloat);
  
  const modeClassWidth = modeUpper - modeLower;
  
  // Calculate mode using the formula
  let freqBefore = 0;
  let freqAfter = 0;
  
  if (modeClass > 0) {
    freqBefore = frequencyTable[modeClass - 1].frequency;
  }
  
  if (modeClass < frequencyTable.length - 1) {
    freqAfter = frequencyTable[modeClass + 1].frequency;
  }
  
  const d1 = maxFrequency - freqBefore;
  const d2 = maxFrequency - freqAfter;
  
  let mode: number[] | null;
  
  if (d1 <= 0 && d2 <= 0) {
    // No clear mode, use midpoint
    mode = [modeClassRow.midpoint];
  } else {
    // Calculate mode using the formula
    const modeValue = modeLower + (d1 / (d1 + d2)) * modeClassWidth;
    mode = [modeValue];
  }
  
  // Variance and standard deviation
  const variance = (totalFx2 / totalFrequency) - Math.pow(mean, 2);
  const standardDeviation = Math.sqrt(variance);
  
  return {
    mean,
    median,
    mode,
    variance,
    standardDeviation
  };
};