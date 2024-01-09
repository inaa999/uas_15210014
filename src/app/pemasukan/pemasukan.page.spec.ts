import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PemasukanPage } from './pemasukan.page';

describe('PemasukanPage', () => {
  let component: PemasukanPage;
  let fixture: ComponentFixture<PemasukanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PemasukanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
