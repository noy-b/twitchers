import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {

    constructor(
        private sanitizer: DomSanitizer
    ) {}

    transform(url, type: String) {
        if (type === 'url') {
            return this.sanitizer.bypassSecurityTrustResourceUrl(url);
        } else {
            return this.sanitizer.bypassSecurityTrustStyle(url);
        }
    }
}
