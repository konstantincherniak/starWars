import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, zip} from 'rxjs';

import {ApiService} from '../shared/sevices/api.service';

import {Character, Film, Species, Starship, CharacterCard} from '../character-list/character-list.interfaces';
import {switchMap, concatMap, reduce} from 'rxjs/operators';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  private characterId: string;
  private characterCard: CharacterCard;
  private showCard = false;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    this.characterId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    const getCharacter$ = this.apiService.getCharacter(this.characterId);
    const getFilms$ = this.apiService.getAllFilms();
    const getSpecies$ = this.apiService.getAllSpecies();
    const getStarships$ = this.apiService.getAllStarships();
    const allSpecies$ = getSpecies$.pipe(reduce((acc, val) => this.reducerForStreams(acc, val)));
    const allFilms$ = getFilms$.pipe(reduce((acc, val) => this.reducerForStreams(acc, val)));
    const allStarships$ = getStarships$.pipe(reduce((acc, val) => this.reducerForStreams(acc, val)));

    combineLatest(getCharacter$, allSpecies$, allFilms$, allStarships$).subscribe(
      ([character, species, films, starships]) => {
        this.showCard = true;
        this.characterCard = {
          id: character.id,
          name: character.name,
          starshipsNames: starships.results
            .filter(starshipsItem => character.starshipsIds.includes(starshipsItem.id))
            .map(starship => starship.name),
          speciesNames: species.results
            .filter(speciesItem => character.speciesIds.includes(speciesItem.id))
            .map(specie => specie.name),
          filmsNames: films.results.filter(filmsItem => character.filmsIds.includes(filmsItem.id))
            .map(film => `Episode ${film.episode_id}: ${film.title}`)
        };
      }
    );
  }


  private reducerForStreams(acc, val) {
    acc.results = acc.results.concat(val.results);
    return acc;
  }

  private back() {
    this.router.navigate(['/']);
  }

}
