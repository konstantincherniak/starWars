import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ApiService} from '../../shared/sevices/api.service';
import {FilmSelect, SpeciesSelect} from '../character-list.interfaces';

@Component({
  selector: 'app-character-list-filter',
  templateUrl: './character-list-filter.component.html',
  styleUrls: ['./character-list-filter.component.scss']
})
export class CharacterListFilterComponent implements OnInit, OnDestroy {
  @Input() species: SpeciesSelect[] = [];
  @Input() films: FilmSelect[] = [];
  @Output() filterChanged = new EventEmitter();
  private filterChangeSubscription: Subscription;
  private filterForm: FormGroup;
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      films: [],
      species: [],
      birthYear: []
    });
    /*this.setFilmsSelect();
    this.setSpeciesSelect();*/
    this.filterChangeSubscription = this.filterForm.valueChanges
      .subscribe(next => this.filterChanged.next(next));
  }
  /*private setFilmsSelect() {
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
  }*/

  /*private setSpeciesSelect() {
    this.apiService.getAllSpecies().subscribe(
      response => {
        this.species = this.species
          .concat(response.results
            .map(species => ({value: species.id, viewValue: species.name}))
          );
      },
      error => {
        console.error('Error while getting films from API');
      },
      () => {
        console.log('Complete loading films');
      }
    );

  }*/

  ngOnDestroy() {
    this.filterChangeSubscription.unsubscribe();
  }
}
