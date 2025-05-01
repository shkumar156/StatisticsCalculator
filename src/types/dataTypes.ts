export type DataType = 'ungrouped' | 'grouped';

export interface GroupedDataItem {
  lowerBound: number;
  upperBound: number;
  frequency: number;
}

export interface StatisticalResults {
  mean: number;
  median: number;
  mode: number[] | null;
  standardDeviation: number;
}

export interface FrequencyTableRow {
  class?: string;
  dataPoint?: number;
  classLimits?: string;
  frequency: number;
  cumulativeFrequency?: number;
  midpoint?: number;
  fx?: number;
  x2?: number;
  fx2?: number;
}