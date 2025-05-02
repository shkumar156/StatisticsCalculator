export interface FrequencyTableRow {
  classInterval: string;
  frequency: number;
  cumulativeFrequency: number;
  midpoint: number;
  fx: number;
  x2: number;
  fx2: number;
}

export interface StatisticalResults {
  mean: number;
  median: number;
  mode: number[] | null;
  variance: number;
  standardDeviation: number;
}

export interface ProcessedData {
  sortedData: number[];
  range: number;
  classCount: number;
  classWidth: number;
  frequencyTable: FrequencyTableRow[];
  totalFrequency: number;
  totalFx: number;
  totalFx2: number;
  statistics: StatisticalResults;
}