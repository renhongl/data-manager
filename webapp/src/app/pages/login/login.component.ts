import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  loaded = false;

  constructor(
    private fb: FormBuilder,
    private ser: LoginService,
    private message: NzMessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

    this.ser.isLogin().subscribe((result: any) => {
      if (result.data) {
        this.router.navigate(['/']);
      } else {
        this.loaded = true;
      }
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (!this.validateForm.valid) {
      return;
    }
    const postData = {
      username: this.validateForm.value.userName,
      password: this.validateForm.value.password,
    };
    this.ser.login(postData).subscribe((result: any) => {
      if (result.data) {
        this.message.success('登陆成功');
        this.router.navigate(['/']);
      } else {
        this.message.success(result.errMsg);
      }
    });
  }

}
