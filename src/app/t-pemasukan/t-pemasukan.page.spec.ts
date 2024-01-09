import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TPemasukanPage } from './t-pemasukan.page';

describe('TPemasukanPage', () => {
  let component: TPemasukanPage;
  let fixture: ComponentFixture<TPemasukanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TPemasukanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
