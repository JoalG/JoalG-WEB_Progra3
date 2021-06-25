import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormExerciseComponent } from './components/form-exercise/form-exercise.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [

  {path:'home', component:HomeComponent},
  {path:'form-exercise', component:FormExerciseComponent},
  {path:'sign-up', component:SignUpComponent},

  {path:'**',pathMatch:'full',redirectTo:'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
