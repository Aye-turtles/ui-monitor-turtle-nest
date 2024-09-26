import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrgsComponent } from './create-orgs.component';

describe('CreateOrgsComponent', () => {
  let component: CreateOrgsComponent;
  let fixture: ComponentFixture<CreateOrgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrgsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOrgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
