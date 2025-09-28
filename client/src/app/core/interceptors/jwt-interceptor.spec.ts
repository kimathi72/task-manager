// src/app/core/interceptors/jwt-interceptor.spec.ts
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { jwtInterceptor } from './jwt-interceptor';
import { AuthService } from '../../auth/services/auth.service';

describe('jwtInterceptor (functional)', () => {
  let mockAuth: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    mockAuth = jasmine.createSpyObj<AuthService>('AuthService', ['getToken']);
  });

  it('should add Authorization header with Bearer token', (done) => {
    mockAuth.getToken.and.returnValue('test-token');

    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = (r) => {
      // ✅ expect the interceptor to add the header
      expect(r.headers.get('Authorization')).toBe('Bearer test-token');
      done();
      return {} as any;
    };

    // Call the interceptor function with mock service injected
    (jwtInterceptor as any)(req, next, mockAuth);
  });

  it('should not add Authorization header if no token', (done) => {
    mockAuth.getToken.and.returnValue(null);

    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = (r) => {
      // ✅ no Authorization header expected
      expect(r.headers.has('Authorization')).toBeFalse();
      done();
      return {} as any;
    };

    (jwtInterceptor as any)(req, next, mockAuth);
  });
});
