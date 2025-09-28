import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should register a user', () => {
    const mockResponse = { message: 'User registered' };
    service.register('testuser', 'password').subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/api/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should login a user and store JWT', () => {
    const mockJWT = { jwt: 'token123' };
    service.login('testuser', 'password').subscribe(res => {
      expect(res.jwt).toBe('token123');
      expect(localStorage.getItem('jwt')).toBe('token123');
    });

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockJWT);
  });

  it('should logout a user', () => {
    localStorage.setItem('jwt', 'token123');
    service.logout();
    expect(localStorage.getItem('jwt')).toBeNull();
  });
});
