import { Component, OnInit } from '@angular/core';
import 'keen-slider/keen-slider.min.css'
import KeenSlider from 'keen-slider'

@Component({
	selector: 'app-sponsors',
	templateUrl: './sponsors.component.html',
	styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
		let slider = new KeenSlider(
			'#sponsor-slider',
			{
				loop: true,
				created: () => {
					console.log('created')
				},
			},
			[
				// add plugins here
			]
		)
	}
}
