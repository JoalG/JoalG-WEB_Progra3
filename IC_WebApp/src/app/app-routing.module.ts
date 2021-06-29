import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormExerciseComponent } from './components/form-exercise/form-exercise.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SolveExerciseComponent } from './components/solve-exercise/solve-exercise.component';

const routes: Routes = [

  {path:'home', component:HomeComponent},
  {path:'form-exercise', component:FormExerciseComponent},
  {path:'solve-exercise/:code', component:SolveExerciseComponent},
  {path:'sign-up', component:SignUpComponent},
  {path:'login', component:LoginComponent},

  {path:'**',pathMatch:'full',redirectTo:'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
