import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {expand, map} from 'rxjs/operators';


export interface PeopleResponseApi {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Character>;
}

export interface FilmsResponseApi {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Film>;
}

export interface SpeciesResponseApi {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Species>;
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
  url: string;
  vehicles: Array<string>;
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

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://swapi.co/api';
  constructor(
    private http: HttpClient
  ) {}
  public getPeople(page: string): Observable<PeopleResponseApi> {
    return this.http.get(`${this.apiUrl}/people/?page=${page}`).pipe(
      map(
        (characters: PeopleResponseApi) => ({...characters, results: characters.results.map(character => this.mapPerson(character))})
      )
    );
  }

  public getFilms(page: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/films/?page=${page}`).pipe(
      map(
        (films: FilmsResponseApi) => ({...films, results: films.results.map(film => this.mapFilm(film))})
      )
    );
  }

  public getAllSpecies(): Observable<SpeciesResponseApi> {
    return this.getSpecies('1').pipe(
      expand(species => species.next ? this.getSpecies(this.getNumberPage(species.next)) : EMPTY)
    );
  }
  public getSpecies(page: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/species/?page=${page}`).pipe(
      map(
        (species: SpeciesResponseApi) => ({...species, results: species.results.map(specie => this.mapSpecies(specie))})
      )
    );
  }
  public getAllPeople(): Observable<PeopleResponseApi> {
    return this.getPeople('1').pipe(
      expand(people => people.next ? this.getPeople(this.getNumberPage(people.next)) : EMPTY)
    );
  }
  private mapPerson(character: Character): Character {
    return {
        ...character,
        id: this.getIdInUrl(character.url, 'people'),
        filmsIds: character.films.map(film => this.getIdInUrl(film, 'films')),
        speciesIds: character.species.map(film => this.getIdInUrl(film, 'species'))
    };
  }
  private mapFilm(film: Film): Film {
    return {
      ...film,
      id: this.getIdInUrl(film.url, 'films'),
      charactersIds: film.characters.map(character => this.getIdInUrl(character, 'people'))
    };
  }
  private mapSpecies(species: Species): Species {
    return {
      ...species,
      id: this.getIdInUrl(species.url, 'species'),
      peopleIds: species.people.map(character => this.getIdInUrl(character, 'people'))
    };
  }
  private getNumberPage(url: string): string {
    return new URL(url).searchParams.get('page');
  }
  private getIdInUrl(url: string, name: string): string {
    const segments = url.split('/');
    const index = segments.indexOf(name);
    return segments[index + 1];
  }
}
