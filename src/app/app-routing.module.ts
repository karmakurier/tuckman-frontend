import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRoomComponent } from './homepage/create-room/create-room.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MemberDetailsComponent } from './homepage/member-details/member-details.component';
import { MemberQuestionsComponent } from './homepage/member-questions/member-questions.component';
import { RoomDetailsComponent } from './homepage/room-details/room-details.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'createRoom', component: CreateRoomComponent},
  { path: 'room/:id', component: RoomDetailsComponent},
  { path: 'memberQuestions', component: MemberQuestionsComponent},
  { path: 'memberDetails', component: MemberDetailsComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
