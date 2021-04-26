import {Component} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

/**
 * App component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'plannerHip';

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      '(max-width: 1155px)'
    ]).subscribe(result => {
      if (result.matches) {
        console.log('-1150px');
      } else {
        console.log('+1155px');
      }
    });
  }
}

/*
if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker('./app.worker', { type: 'module' });
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}*/
