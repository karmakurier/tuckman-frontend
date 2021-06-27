import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MemberQuestionsComponent } from './homepage/member-questions/member-questions.component';
import { RoomDetailsComponent } from './homepage/room-details/room-details.component';
import { TeamtestComponent } from './teamtest/teamtest.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'teamtest', component:  TeamtestComponent},
  { path: 'roomdetails', component: RoomDetailsComponent},
  { path: 'memberQuestions', component: MemberQuestionsComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
