import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSensorsComponent } from './show-sensors.component';

describe('ShowSensorsComponent', () => {
  let component: ShowSensorsComponent;
  let fixture: ComponentFixture<ShowSensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSensorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
