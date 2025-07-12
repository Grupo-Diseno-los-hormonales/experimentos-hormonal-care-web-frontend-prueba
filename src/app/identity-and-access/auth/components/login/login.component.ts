import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UserTypeService} from "../../../../shared/services/user-type.service";
import {AuthenticationService} from "../../../../iam/services/authentication.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  loginError = false;
  recaptchaToken: string | null = null;

  // ✅ Usuarios simulados localmente
  MOCK_USERS = [
    { name: 'Abraham', email: 'paciente@gmail.com', password: '123456', role: 'patient' },
    { name: 'Renzo', email: 'renzo@gmail.com', password: '123456', role: 'patient' },
    { name: 'Dra. Solano', email: 'doctor@gmail.com', password: '123456', role: 'endocrinologist' },
    { name: 'Admin Ana', email: 'admin@gmail.com', password: '123456', role: 'admin' }
  ];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userTypeService: UserTypeService,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false],
      recaptcha: ['', Validators.required] // ✅ Add this line
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onCaptchaResolved(token: string): void {
    this.recaptchaToken = token;
    this.loginForm.get('recaptcha')?.setValue(token);
    console.log('reCAPTCHA token:', token);
  }

  onSubmit(): void {
    this.loginError = false;

    if (this.loginForm.invalid) return;
    if (!this.recaptchaToken) return;

    const { email, password } = this.loginForm.value;

    const foundUser = this.MOCK_USERS.find(
      user =>
        user.email.toLowerCase().trim() === email.toLowerCase().trim() &&
        user.password.trim() === password.trim()
    );

    if (!foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser));

      this.loginError = true;
      return;
    }

    console.log('Redirigiendo al dashboard del rol:', foundUser.role);
    this.userTypeService.setUserType(foundUser.role as 'patient' | 'endocrinologist' | 'admin');

    if (foundUser.role === 'admin') {
      // ✅ Simular login en AuthenticationService
      localStorage.setItem('token', 'fake-token');
      localStorage.setItem('username', 'Admin User');
      localStorage.setItem('userId', '1');

      // ✅ Activar estado manualmente
      this.authenticationService['signedIn'].next(true);
      this.authenticationService['signedInUserId'].next(1);
      this.authenticationService['signedInUsername'].next('Admin User');

      this.router.navigate(['/admin']).then();
    } else if (foundUser.role === 'endocrinologist') {
      this.router.navigate(['/homeDoctor']).then();
    } else if (foundUser.role === 'patient') {
      localStorage.setItem('user', JSON.stringify(foundUser)); // ✅ Guardar usuario con nombre
      this.router.navigate(['/homePatient']).then();
    }
    else {
      this.loginError = true;
    }
  }


  goToRegister(): void {
    this.router.navigateByUrl('/selectRole');
  }

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
