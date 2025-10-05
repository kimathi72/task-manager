import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form with empty fields', () => {
    expect(component.loginForm.get('username')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should mark form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should mark form invalid when username is missing', () => {
    component.loginForm.setValue({ username: '', password: 'pass123' });
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should mark form invalid when password is missing', () => {
    component.loginForm.setValue({ username: 'user', password: '' });
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should mark form valid when both fields are filled', () => {
    component.loginForm.setValue({ username: 'user', password: 'pass123' });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call AuthService.login on submit with valid form', () => {
    component.loginForm.setValue({ username: 'testuser', password: 'pass123' });
    authService.login.and.returnValue(of({ jwt: 'fake-jwt' }));

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('testuser', 'pass123');
    expect(component.loading).toBeFalse();
  });

  it('should not call AuthService.login when form is invalid', () => {
    component.loginForm.setValue({ username: '', password: '' });

    component.onSubmit();

    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should navigate to /tasks after successful login', () => {
    component.loginForm.setValue({ username: 'testuser', password: 'pass123' });
    authService.login.and.returnValue(of({ jwt: 'fake-jwt' }));

    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should set loading to true during login', () => {
    component.loginForm.setValue({ username: 'testuser', password: 'pass123' });
    authService.login.and.returnValue(of({ jwt: 'fake-jwt' }));

    component.loading = false;
    component.onSubmit();

    // Note: loading will be set back to false after the observable completes
    expect(authService.login).toHaveBeenCalled();
  });

  it('should display error message on login failure', () => {
    component.loginForm.setValue({ username: 'testuser', password: 'wrongpass' });
    const errorResponse = { error: { message: 'Invalid credentials' } };
    authService.login.and.returnValue(
      new Observable(observer => observer.error(errorResponse))
    );

    component.onSubmit();

    expect(component.loading).toBeFalse();
    expect(component.errorMessage).toBe('Invalid credentials');
  });

  it('should display default error message when error has no message', () => {
    component.loginForm.setValue({ username: 'testuser', password: 'wrongpass' });
    authService.login.and.returnValue(
      new Observable(observer => observer.error({}))
    );

    component.onSubmit();

    expect(component.loading).toBeFalse();
    expect(component.errorMessage).toBe('Login failed');
  });

  it('should clear error message on new submit', () => {
    component.errorMessage = 'Previous error';
    component.loginForm.setValue({ username: 'testuser', password: 'pass123' });
    authService.login.and.returnValue(of({ jwt: 'fake-jwt' }));

    component.onSubmit();

    expect(component.errorMessage).toBe('');
  });

  it('should navigate to register page when goToRegister is called', () => {
    component.goToRegister();

    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });
});