import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ApiService} from '../shared/sevices/api.service';

@Component({
  selector: 'app-list-character',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private allPeople: Array<any> = [];
  private allResults = 0;
  private displayedColumns: string[] = ['name', 'birth_year', 'gender', 'height', 'mass'];
  private dataSource;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getAllPeople();
  }
  ngAfterViewInit() {
  }
  private getAllPeople() {
    this.apiService.getAllPeople().subscribe(
      response => {
        this.allResults = response.count;
        this.allPeople = this.allPeople.concat(response.results);
      },
      error => {
        console.log('Error while getting people from API');
      },
      () => {
        this.dataSource = new MatTableDataSource<any>(this.allPeople);
        this.dataSource.paginator = this.paginator;
        console.log('Complete loading people');
      }
    );

  }

}
