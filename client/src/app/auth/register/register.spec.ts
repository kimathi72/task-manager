import { Observable } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RegisterComponent } from './register.component';
import { AuthService } from '../services/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['register']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should mark form invalid when passwords do not match', () => {
    component.registerForm.setValue({ 
      username: 'user', 
      password: 'pass123', 
      confirmPassword: 'different' 
    });
    expect(component.registerForm.valid).toBeFalse();
    expect(component.registerForm.errors?.['mismatch']).toBeTruthy();
  });

  it('should mark form valid when all fields are correct', () => {
    component.registerForm.setValue({ 
      username: 'user', 
      password: 'pass123', 
      confirmPassword: 'pass123' 
    });
    expect(component.registerForm.valid).toBeTrue();
  });

  it('should call AuthService.register on submit with valid form', () => {
    component.registerForm.setValue({ 
      username: 'testuser', 
      password: 'pass123', 
      confirmPassword: 'pass123' 
    });
    authService.register.and.returnValue(of({ jwt: 'fake-jwt' }));

    component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith('testuser', 'pass123');
    expect(component.loading).toBeFalse();
    expect(component.successMessage).toBe('Registration successful! Redirecting...');
  });

  it('should not call AuthService.register when form is invalid', () => {
    component.registerForm.setValue({ 
      username: '', 
      password: '', 
      confirmPassword: '' 
    });

    component.onSubmit();

    expect(authService.register).not.toHaveBeenCalled();
  });

  it('should navigate to login after successful registration', (done) => {
    component.registerForm.setValue({ 
      username: 'testuser', 
      password: 'pass123', 
      confirmPassword: 'pass123' 
    });
    authService.register.and.returnValue(of({ jwt: 'fake-jwt' }));

    component.onSubmit();

    setTimeout(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    }, 1600);
  });

  it('should display error message on registration failure', () => {
    component.registerForm.setValue({ 
      username: 'testuser', 
      password: 'pass123', 
      confirmPassword: 'pass123' 
    });
    const errorResponse = { error: { message: 'Username already exists' } };
    authService.register.and.returnValue(
      new Observable(observer => observer.error(errorResponse))
    );

    component.onSubmit();

    expect(component.loading).toBeFalse();
    expect(component.errorMessage).toBe('Username already exists');
  });
});