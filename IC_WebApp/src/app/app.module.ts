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
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CodeEditorModule } from '@ngstack/code-editor';

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
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    CodeEditorModule.forRoot()  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
