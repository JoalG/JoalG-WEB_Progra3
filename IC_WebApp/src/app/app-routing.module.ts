import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormExerciseComponent } from './components/form-exercise/form-exercise.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [

  {path:'home', component:HomeComponent},
  {path:'form-exercise', component:FormExerciseComponent},

  {path:'**',pathMatch:'full',redirectTo:'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
