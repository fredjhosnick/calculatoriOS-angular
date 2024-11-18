import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MyCalculatorComponent } from './my-calculator/my-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MyCalculatorComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calculator';
}
