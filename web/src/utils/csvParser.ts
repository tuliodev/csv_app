import Papa from 'papaparse';

export const parseCSV = (file: File, onDataLoaded: (data: any[]) => void) => {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (result) => {
      onDataLoaded(result.data);
    },
    error: (error) => {
      console.error('Error parsing CSV:', error);
      onDataLoaded([]);
    },
  });
};
