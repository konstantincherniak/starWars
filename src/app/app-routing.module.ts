import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CharacterListComponent} from './character-list/character-list.component';
import {CharactersComponent} from './characters/characters.component';
import {NotFoundComponent} from './not-found/not-found.component';


const routes: Routes = [
  { path: '', component: CharacterListComponent},
  { path: 'characters', pathMatch: 'full', redirectTo: ''},
  { path: 'characters/:id', component: CharactersComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
