import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserSelectorComponent } from './components/user-selector/user-selector.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { DifficultyCardComponent } from './components/difficulty-card/difficulty-card.component';
import { SolveExerciseComponent } from './components/solve-exercise/solve-exercise.component';
import { FormExerciseComponent } from './components/form-exercise/form-exercise.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserSelectorComponent,
    NavbarComponent,
    ExerciseCardComponent,
    CategoryCardComponent,
    DifficultyCardComponent,
    SolveExerciseComponent,
    FormExerciseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
