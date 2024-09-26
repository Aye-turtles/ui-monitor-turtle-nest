import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrgsComponent } from './show-orgs.component';

describe('ShowOrgsComponent', () => {
  let component: ShowOrgsComponent;
  let fixture: ComponentFixture<ShowOrgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowOrgsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowOrgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
