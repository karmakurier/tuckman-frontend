import { Component, OnInit, Input, Output} from '@angular/core';

@Component({
  selector: 'app-mail-link',
  templateUrl: './mail-link.component.html',
  styleUrls: ['./mail-link.component.scss']
})
export class MailLinkComponent implements OnInit {

  @Input() link: string="https://awsomelink.com";
  @Output() mailadresse: string="dummymail@internet.de"

  constructor() { }

  sendMail(inputMail:string, linkelement:string){
    window.location.href="mailto:"+inputMail+"?subject=Persönlicher%20Link%20Tuckman%20Analyse&body="+linkelement;
  }

  ngOnInit(): void {
  }

}
