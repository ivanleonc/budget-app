import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewbudgetPage } from './newbudget.page';

describe('NewbudgetPage', () => {
  let component: NewbudgetPage;
  let fixture: ComponentFixture<NewbudgetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewbudgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
