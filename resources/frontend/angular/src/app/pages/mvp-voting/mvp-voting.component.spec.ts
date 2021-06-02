import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvpVotingComponent } from './mvp-voting.component';

describe('MvpVotingComponent', () => {
	let component: MvpVotingComponent;
	let fixture: ComponentFixture<MvpVotingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MvpVotingComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MvpVotingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
