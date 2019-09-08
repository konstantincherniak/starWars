export interface Film {
  value: string;
  viewValue: string;
}

export interface Species {
  value: string;
  viewValue: string;
}

export interface FilterValues {
  films: string | null;
  birthYear: string | null;
  species: string | null;
}
