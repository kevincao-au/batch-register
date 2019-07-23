import { Injectable } from "@angular/core";


@Injectable()
export class AppConstants {

    public static get BATCH_SUBMIT_LIMIT(): number { return 5; }

}