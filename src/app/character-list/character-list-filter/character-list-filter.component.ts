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
      birthYear: this.formBuilder.group({
        beforeDay: ['BBY'],
        beforeNumber: [],
        afterDay: ['BBY'],
        afterNumber: []
      })
    });
    this.filterChangeSubscription = this.filterForm.valueChanges
      .subscribe(next => this.filterChanged.next(next));
  }
  ngOnDestroy() {
    this.filterChangeSubscription.unsubscribe();
  }
}
