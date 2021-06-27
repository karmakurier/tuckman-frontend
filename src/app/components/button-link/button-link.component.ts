import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.scss']
})
export class ButtonLinkComponent implements OnInit {

  @Input() link: string="this is the link";
  @Output() link2: EventEmitter<string>=new EventEmitter<string>();

  constructor() { }

  copyLink(inputElement){
    inputElement.select();
    document.execCommand("copy");
    window.alert("Folgender Link wurde erfolgreich in den  Zwischenspeicher kopiert:  \n\n"+ 
                  inputElement.value + "\n\nDrücken Sie STRG+V um den Link einzufügen");
    inputElement.setSelectionRange(0,0);
    this.link2.next("blabala");
  }

  ngOnInit(): void {
  }

}