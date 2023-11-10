import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {
  private params: any;
  disabled: boolean = false;
  agInit(params: any): void {
    this.params = params;
    if(typeof this.params.disabled === "boolean") {
      return this.disabled = this.params.disabled;
    }
    this.disabled = this.params.disabled(params)
  }

  btnClickedHandler() {
    this.params.clicked(this.params.data, this.params.api);
  }
}
