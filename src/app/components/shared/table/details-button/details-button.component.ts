import {Component } from '@angular/core';

@Component({
  selector: 'app-details-button',
  templateUrl: './details-button.component.html',
  styleUrls: ['./details-button.component.scss']
})
export class DetailsButtonComponent {
  private params: any;
  link?: string;
  agInit(params: any): void {
    this.params = params;
    this.link = params.link;
  }

}
