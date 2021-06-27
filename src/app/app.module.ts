import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RoomService } from './services/rooms.service';
import { QuestionsService } from './services/questions.service';
import { TeamtestComponent } from './teamtest/teamtest.component';
import { ButtonLinkComponent } from './components/button-link/button-link.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    TeamtestComponent,
    ButtonLinkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RoomService, QuestionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
