import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the header and router outlet', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should configure products as the starting page with cart and confirmation routes', () => {
    expect(routes.some((route) => route.path === '' && route.redirectTo === 'products')).toBe(
      true,
    );
    expect(routes.some((route) => route.path === 'products')).toBe(true);
    expect(routes.some((route) => route.path === 'products/:id')).toBe(true);
    expect(routes.some((route) => route.path === 'cart')).toBe(true);
    expect(routes.some((route) => route.path === 'confirmation')).toBe(true);
  });
});
