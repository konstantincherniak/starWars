export interface FilmSelect {
  value: string;
  viewValue: string;
}

export interface SpeciesSelect {
  value: string;
  viewValue: string;
}

export interface FilterValues {
  films: string | null;
  birthYear: string | null;
  species: string | null;
}

export interface PeopleData {
  people: Array<Character>;
  films: Array<Film>;
  species: Array<Species>;
  starships: Array<Starship>;
}

export interface Species {
  id?: string;
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: Array<string>;
  peopleIds?: Array<string>;
  films: Array<string>;
  created: string;
  edited: string;
  url: string;
}

export interface Character {
  birth_year: string;
  id?: string;
  created: string;
  edited: string;
  eye_color: string;
  films: Array<string>;
  filmsIds?: Array<string>;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: Array<string>;
  speciesIds?: Array<string>;
  starships: Array<string>;
  starshipsIds?: Array<string>;
  url: string;
  vehicles: Array<string>;
}

export interface CharacterCard {
  id: string;
  name: string;
  speciesNames?: Array<string>;
  starshipsNames?: Array<string>;
  filmsNames?: Array<string>;
}

export interface Film {
  id?: string;
  title: string;
  episode_id: string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: Array<string>;
  charactersIds: Array<string>;
  planets: Array<string>;
  starships: Array<string>;
  vehicles: Array<string>;
  species: Array<string>;
  created: string;
  edited: string;
  url: string;
}

export interface Starship {
  id?: string;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string;
  films: Array<string>;
  created: string;
  edited: string;
  url: string;
}
