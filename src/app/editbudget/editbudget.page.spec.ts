import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditbudgetPage } from './editbudget.page';

describe('EditbudgetPage', () => {
  let component: EditbudgetPage;
  let fixture: ComponentFixture<EditbudgetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditbudgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
