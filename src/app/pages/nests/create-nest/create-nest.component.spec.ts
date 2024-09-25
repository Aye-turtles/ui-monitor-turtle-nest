import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNestComponent } from './create-nest.component';

describe('CreateNestComponent', () => {
  let component: CreateNestComponent;
  let fixture: ComponentFixture<CreateNestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
