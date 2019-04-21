import { AbstractControl } from '@angular/forms';

export function ValidateNumber(control: AbstractControl) {

  if(!isNaN(parseFloat(control.value)) && isFinite(control.value)){
      return null;
  }

  return {validNumber:true};
}