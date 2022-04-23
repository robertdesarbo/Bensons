import {AfterViewInit, OnDestroy, Component, ElementRef, ViewChild} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';

@Component({
	selector: 'app-sponsors',
	templateUrl: './sponsors.component.html',
	styleUrls: [
    '../../../../node_modules/keen-slider/keen-slider.min.css',
    './sponsors.component.scss'
  ]
})
export class SponsorsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement>;

  slider: KeenSliderInstance = null;
  currentSlide: number = 1

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      breakpoints: {
        "(min-width: 400px)": {
          slides: { perView: 5, spacing: 5 },
        },
        "(min-width: 1000px)": {
          slides: { perView: 8, spacing: 10 },
        },
      },
      slides: { perView: 1 },
    });
  }

  ngOnDestroy() {
    if (this.slider) { this.slider.destroy(); }
  }
}
