import { AbstractControl } from '@angular/forms';
import { EMAIL_PATTERN } from '../common/const';

export function ValidateEmail(control: AbstractControl) {
    
  if(!EMAIL_PATTERN.test(control.value)){
    return { validEmail: true };
  }

  return null;
}