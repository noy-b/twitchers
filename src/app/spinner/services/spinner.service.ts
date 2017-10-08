import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class SpinnerService {
    public spinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public isLoading(value: boolean) {
        this.spinner.next(value);
    }
}
