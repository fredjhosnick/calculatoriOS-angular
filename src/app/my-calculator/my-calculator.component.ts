import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-my-calculator',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './my-calculator.component.html',
  styleUrl: './my-calculator.component.css'
})
export class MyCalculatorComponent implements OnInit {

  inputString: any;


  ngOnInit(): void {

    this.inputString = new FormGroup({

      text: new FormControl('0')
    })

  }

  buttonClick(buttonElement: any) {

    let buttonText = buttonElement.textContent.trim()

    if (buttonText === "." && this.inputString.controls.text.value.includes('.')) {
      return;
    }

    if (this.inputString.controls.text.value === "0") {
      if (buttonText === ".") {
        this.inputString.controls.text.setValue(this.inputString.controls.text.value + buttonText)
      } else {
        this.inputString.controls.text.setValue(buttonText)
      }

    } else {
      this.inputString.controls.text.setValue(this.inputString.controls.text.value + buttonText)

    }


  }




  buttonClear() {
    this.inputString.controls.text.setValue("0")
  }

  buttonCalculate() {
    try {
      let expression = this.inputString.controls.text.value;

      expression = expression.replace(/÷/g, '/').replace(/x/g, '*');
      const result = this.safeEvaluate(expression);
      this.inputString.controls.text.setValue(result.toString());
    } catch (error) {
      this.inputString.controls.text.setValue("Error");
    }
  }
  safeEvaluate(expression: string): number {
    const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');
    return new Function(`return ${sanitizedExpression}`)();
  }

  buttonPercent() {
    let currentValue = this.inputString.controls.text.value;
    if (currentValue && !isNaN(currentValue)) {
      const result = parseFloat(currentValue) / 100;
      this.inputString.controls.text.setValue(result.toString());
    }
  }

  buttonToggleSign() {
    let currentValue = this.inputString.controls.text.value;
    if (currentValue && !isNaN(currentValue)) {
      const result = parseFloat(currentValue) * -1;
      this.inputString.controls.text.setValue(result.toString());
    }
  }


}

