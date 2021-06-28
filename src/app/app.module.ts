import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RoomService } from './services/rooms.service';
import { QuestionsService } from './services/questions.service';
import { ButtonLinkComponent } from './components/button-link/button-link.component';
import { RoomDetailsComponent } from './homepage/room-details/room-details.component';
import { MemberQuestionsComponent } from './homepage/member-questions/member-questions.component';
import { MemberDetailsComponent } from './homepage/member-details/member-details.component';
import { CreateRoomComponent } from './homepage/create-room/create-room.component';
import { MailLinkComponent } from './components/mail-link/mail-link.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ButtonLinkComponent,
    RoomDetailsComponent,
    MemberQuestionsComponent,
    MemberDetailsComponent,
    CreateRoomComponent,
    MailLinkComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [RoomService, QuestionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
