import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LynnsComponent } from './lynns.component';

describe('FieldsComponent', () => {
	let component: LynnsComponent;
	let fixture: ComponentFixture<LynnsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LynnsComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LynnsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
