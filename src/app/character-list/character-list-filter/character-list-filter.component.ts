import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Film} from '../character-list.interfaces';
import {ApiService} from '../../shared/sevices/api.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-character-list-filter',
  templateUrl: './character-list-filter.component.html',
  styleUrls: ['./character-list-filter.component.scss']
})
export class CharacterListFilterComponent implements OnInit, OnDestroy {
  private filterChangeSubscription: Subscription;
  private filterForm: FormGroup;
  private films: Film[] = [];
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
    this.setFilmsSelect();
    this.filterChangeSubscription = this.filterForm.valueChanges.subscribe(
      next => {
        console.log(next);
      }
    );
  }
  private setFilmsSelect() {
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

  ngOnDestroy() {
    this.filterChangeSubscription.unsubscribe();
  }
}
