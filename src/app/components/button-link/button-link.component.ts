import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.scss']
})
export class ButtonLinkComponent implements OnInit {

  @Input() link: string = "this is the link";
  @Output() link2: EventEmitter<string> = new EventEmitter<string>();

  constructor(private toasterService: ToasterService) { }

  copyLink(inputElement) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
    this.toasterService.pop('success', 'Super!', 'Der Link wurde in Deine Zwischenablage kopiert.')
  }

  ngOnInit(): void {
  }

}