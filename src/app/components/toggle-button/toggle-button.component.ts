import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss'

})
export class ToggleButtonComponent {
  @Input() isOn: boolean = false;
  @Output() isOnChange = new EventEmitter<boolean>(); // Nome modificato per two-way binding

  @Input() onText: string = 'Got';
  @Input() offText: string = 'Not';
  @Input() onColor: string = '#4CAF50';
  @Input() offColor: string = '#f44336';

  toggle() {
    this.isOn = !this.isOn;
    this.isOnChange.emit(this.isOn); // Ora usa isOnChange invece di toggleChange
  }
}
