import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestsComponent } from './nests.component';

describe('NestsComponent', () => {
  let component: NestsComponent;
  let fixture: ComponentFixture<NestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
