import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import {ApiService} from '../shared/sevices/api.service';

import {Character, FilmSelect, FilterValues, PeopleData, SpeciesSelect} from './character-list.interfaces';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-character',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private allPeople: Array<any> = [];
  private allResults = 0;
  private displayedColumns: string[] = ['name', 'birth_year', 'gender', 'height', 'mass'];
  private dataSource;
  private showTableData = false;
  private species: SpeciesSelect[] = [];
  private films: FilmSelect[] = [];
  private peopleData: PeopleData;
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllPeople();
    this.getFilms();
    this.getSpecies();
  }
  private getAllPeople() {
    this.apiService.getAllPeople().subscribe(
      response => {
        this.allResults = response.count;
        this.allPeople = this.allPeople.concat(response.results);
      },
      error => {
        console.error('Error while getting people from API');
      },
      () => {
        this.showTableData = this.allPeople.length && this.allPeople.length === this.allResults;
        this.dataSource = new MatTableDataSource<any>(this.allPeople);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.filterLogic.bind(this);
        console.log('Complete loading people');
      }
    );
  }

  private getFilms() {
    this.apiService.getFilms('1').subscribe(
      response => {
        this.films = this.films
          .concat(response.results
            .map(film => ({value: film.id, viewValue: `Episode ${film.episode_id}: ${film.title}`}))
          );
      },
      error => {
        console.error('Error while getting films from API');
      },
      () => {
        console.log('Complete loading films');
      }
    );
  }

  private getSpecies() {
    this.apiService.getAllSpecies().subscribe(
      response => {
        this.species = this.species
          .concat(response.results
            .map(species => ({value: species.id, viewValue: species.name}))
          );
      },
      error => {
        console.error('Error while getting species from API');
      },
      () => {
        console.log('Complete loading species');
      }
    );

  }

  private filterPeople(filterValues: FilterValues) {
    this.dataSource.filter = filterValues;
  }

  private filterLogic(data: Character, filter: FilterValues) {
    const filmsFilter = filter.films ? data.filmsIds.some(id => id === filter.films) : true;
    const speciesFilter = filter.species ? data.speciesIds.some(id => id === filter.species) : true;
    let birthdayFilter;
    if (data.birth_year !== 'unknown') {
      const year = this.convertStringToNumber(data.birth_year);
      const before = filter.birthYear.beforeNumber && filter.birthYear.beforeDay === 'BBY'
        ? -1 * filter.birthYear.beforeNumber : filter.birthYear.beforeNumber;
      const after = filter.birthYear.afterNumber && filter.birthYear.afterDay === 'BBY'
        ? -1 * filter.birthYear.afterNumber : filter.birthYear.afterNumber;
      birthdayFilter = (before && after && year < before && year > after)
        || (!before && after && year > after)
        || (before && !after && year < before) || (!before && !after);
    } else {
      birthdayFilter = false;
    }
    return filmsFilter && speciesFilter && birthdayFilter;
  }
  private openPersonCard(id: string) {
    this.router.navigate(['characters', id]);
  }
  convertStringToNumber(date: string): number {
    const day = date.substr(date.length - 3);
    const year = parseInt(date.slice(0, -3), 10);
    return day === 'BBY' ? -1 * year : year;
  }
}
