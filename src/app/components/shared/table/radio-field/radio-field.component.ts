import { Component } from '@angular/core';

@Component({
  selector: 'app-radio-field',
  templateUrl: './radio-field.component.html',
  styleUrls: ['./radio-field.component.scss']
})
export class RadioFieldComponent {
  protected params: any;
  public radioValue: number = 0;

  agInit(params: any): void {
    this.params = params;
    this.radioValue = params.value;
  }
  getValue(): any {
    return this.radioValue;
  }


  isPopup(): boolean {
    return true;
  }

  stopEdit() {
    alert(`Value changed to: ${this.radioValue}`);
    this.params.api.stopEditing();
  }
  handleChange() {
    this.params.node.setSelected(!this.params.node.selected)
  }
}
