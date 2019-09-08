import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {expand} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://swapi.co/api';
  constructor(
    private http: HttpClient
  ) {}
  public getPeople(page: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/people/?page=${page}`);
  }
  public getAllPeople(): Observable<any> {
    return this.getPeople('1').pipe(
      expand(people => people.next ? this.getPeople(this.getNumberPage(people.next)) : EMPTY)
    );
  }
  private getNumberPage(url: string): string {
    return new URL(url).searchParams.get('page');
  }
}
