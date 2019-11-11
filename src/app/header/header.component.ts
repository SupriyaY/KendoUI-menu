import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

// Interface Categories
export interface Category {
  value: string;
  parts: string;
}



function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const newpasswordControl = c.get('newpassword');
  const confirmpassword = c.get('confirmpassword');

  if (newpasswordControl.pristine || confirmpassword.pristine) {
    return null;
  }

  if (newpasswordControl.value === confirmpassword.value) {
    return null;
  }

  return { match: true };

}


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    private show: boolean = true;
    public onToggle(): void {
        this.show = !this.show;
    }
    //DIALOG FOR ACCOUNTS
    public opened = false;
    public close(status) {
        console.log(`Dialog result: ${status}`);
        this.opened = false;
    }
    public open() {
        this.opened = true;
    }

    title: string;
    passwordForm: FormGroup;
  
  
    constructor(private fb: FormBuilder) { }


    ngOnInit() {

      this.passwordForm = this.fb.group({
        passwordGroup: this.fb.group({
          newpassword: ['', [Validators.minLength(8)]],
          confirmpassword: ['', Validators.required]
        }, { validator: passwordMatcher })
  
  
  
  
      });



    }
}