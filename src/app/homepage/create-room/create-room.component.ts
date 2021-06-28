import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
  accordionExpanded: number = -1;
  isNonProfit: boolean = true;
  timed: boolean = false;

  constructor() { }

  changeNonProfit(isIt: boolean) {
    this.isNonProfit = isIt;
    if(!this.isNonProfit) {
      Swal.fire( {
        title: 'Sorry!',
        text: 'Die Benutzung der kostenfreien Tuckman-Analyse ist nur für gemeinnützige Teams bestimmt. Bitte kontaktiere uns wenn du die Analyse für nicht gemeinnützige Teams nutzen möchtest!',
        footer: 'Wir sind für dich da: <a href="mailto:info@karmakurier.de"> info@karmakurier.org</a>',
        icon: 'error'
      }

      )
    }
  }

  expandAccordion(num: number) {
    if(num === this.accordionExpanded) {
      this.accordionExpanded = -1;
    } else {
      this.accordionExpanded = num;
    }
  }

  ngOnInit(): void {
  }

}
