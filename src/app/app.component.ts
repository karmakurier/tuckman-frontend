import { Component, OnInit } from '@angular/core';
import { defineLocale, deLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'demo';

  constructor(private bsLocaleService: BsLocaleService) {}

  ngOnInit() {
    const tmp = defineLocale('de', deLocale);
    this.bsLocaleService.use('de');
  }
}
