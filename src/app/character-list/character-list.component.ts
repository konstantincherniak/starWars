import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import {ApiService, Character} from '../shared/sevices/api.service';
import {FilterValues} from './character-list.interfaces';

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

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getAllPeople();
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
        this.dataSource.filterPredicate = this.filterLogic;
        console.log('Complete loading people');
      }
    );
  }

  private filterPeople(filterValues: FilterValues) {
    this.dataSource.filter = filterValues;
  }

  private filterLogic(data: Character, filter: FilterValues) {
    const filmsFilter = filter.films ? data.filmsIds.some(id => id === filter.films) : true;
    const speciesFilter = filter.species ? data.speciesIds.some(id => id === filter.species) : true;
    return filmsFilter && speciesFilter;
  }
}
