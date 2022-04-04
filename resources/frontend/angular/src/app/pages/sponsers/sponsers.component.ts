import { Component, OnInit } from '@angular/core';
import 'keen-slider/keen-slider.min.css'
import KeenSlider from 'keen-slider'

@Component({
	selector: 'app-sponsers',
	templateUrl: './sponsers.component.html',
	styleUrls: ['./sponsers.component.scss']
})
export class SponsersComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
		let slider = new KeenSlider(
			'#sponser-slider',
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
