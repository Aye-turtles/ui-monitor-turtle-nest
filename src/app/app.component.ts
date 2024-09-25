import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserRes} from "./model/userRes";
import {LocalStorageService} from "./local-storage.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'Monitoreo de nidos de tortuga';
  user: UserRes
  constructor(
    protected lStorage: LocalStorageService
  ) {
    this.user = lStorage.currentUser

  }
}
