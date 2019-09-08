import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {expand, map} from 'rxjs/operators';
import {Character, Film, Species, Starship} from '../../character-list/character-list.interfaces';


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

export interface StarshipsResponseApi {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Starship>;
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

  public getCharacter(id: string): Observable<Character> {
    return this.http.get(`${this.apiUrl}/people/${id}`).pipe(
      map(
        (character: Character) =>   this.mapPerson(character)
      )
    );
  }

  public getAllFilms(): Observable<any> {
    return this.getFilms('1').pipe(
      expand(films => films.next ? this.getFilms(this.getNumberPage(films.next)) : EMPTY)
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

  public getStarships(page: string): Observable<StarshipsResponseApi> {
    return this.http.get(`${this.apiUrl}/starships/?page=${page}`).pipe(
      map(
        (starships: StarshipsResponseApi) => ({...starships, results: starships.results.map(starship => this.mapStarship(starship))})
      )
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
  public getAllStarships(): Observable<StarshipsResponseApi> {
    return this.getStarships('1').pipe(
      expand(starships => starships.next ? this.getStarships(this.getNumberPage(starships.next)) : EMPTY)
    );
  }
  private mapPerson(character: Character): Character {
    return {
        ...character,
        id: this.getIdInUrl(character.url, 'people'),
        filmsIds: character.films.map(film => this.getIdInUrl(film, 'films')),
        speciesIds: character.species.map(film => this.getIdInUrl(film, 'species')),
        starshipsIds: character.starships.map(starship => this.getIdInUrl(starship, 'starships'))
    };
  }
  private mapFilm(film: Film): Film {
    return {
      ...film,
      id: this.getIdInUrl(film.url, 'films'),
      charactersIds: film.characters.map(character => this.getIdInUrl(character, 'people'))
    };
  }
  private mapStarship(starship: Starship): Starship {
    return {
      ...starship,
      id: this.getIdInUrl(starship.url, 'starships')
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
