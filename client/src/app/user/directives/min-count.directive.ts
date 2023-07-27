import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMinCount]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MinCountDirective,
      multi: true,
    },
  ],
})

export class MinCountDirective implements Validator {
  @Input() appMinCount: number | undefined;
  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    console.log(control, control.value == null);
    
    if (this.appMinCount == undefined
      || control.value?.length >= this.appMinCount
      || this.appMinCount == 0) {
      return null;
    }

    return { appMinCount: this.appMinCount };
  }

}
