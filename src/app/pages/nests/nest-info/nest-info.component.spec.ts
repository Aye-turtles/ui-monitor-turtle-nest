import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestInfoComponent } from './nest-info.component';

describe('NestInfoComponent', () => {
  let component: NestInfoComponent;
  let fixture: ComponentFixture<NestInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NestInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NestInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
