import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TeamtestComponent } from './teamtest/teamtest.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'teamtest', component:  TeamtestComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
