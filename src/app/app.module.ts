import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ButtonLinkComponent } from './components/button-link/button-link.component';
import { RoomDetailsComponent } from './homepage/room-details/room-details.component';
import { MemberQuestionsComponent } from './homepage/member-questions/member-questions.component';
import { MemberDetailsComponent } from './homepage/member-details/member-details.component';
import { CreateRoomComponent } from './homepage/create-room/create-room.component';
import { MailLinkComponent } from './components/mail-link/mail-link.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiConfiguration } from 'generated/api';
import { environment } from 'src/environments/environment';
import { SpiderchartComponent } from './components/spiderchart/spiderchart.component';
import { DotchartComponent } from './components/dotchart/dotchart.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ButtonLinkComponent,
    RoomDetailsComponent,
    MemberQuestionsComponent,
    MemberDetailsComponent,
    CreateRoomComponent,
    MailLinkComponent,
    SpiderchartComponent,
    DotchartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    {
      provide: ApiConfiguration,
      useValue: new ApiConfiguration({
        basePath: environment.API_BASE_PATH
      })
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
