import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EPemasukanPage } from './e-pemasukan.page';

describe('EPemasukanPage', () => {
  let component: EPemasukanPage;
  let fixture: ComponentFixture<EPemasukanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EPemasukanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
