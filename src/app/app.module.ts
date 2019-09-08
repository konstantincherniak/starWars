import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharactersComponent } from './characters/characters.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MaterialModule } from './shared/modules/material.module';


@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    CharactersComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
