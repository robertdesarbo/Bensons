import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePreferenceComponent } from './schedule-preference.component';

describe('SchedulePreferenceComponent', () => {
	let component: SchedulePreferenceComponent;
	let fixture: ComponentFixture<SchedulePreferenceComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SchedulePreferenceComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SchedulePreferenceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
