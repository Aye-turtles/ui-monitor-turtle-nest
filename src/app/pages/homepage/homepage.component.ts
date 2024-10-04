import {Component, OnInit} from '@angular/core';
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {LocalStorageService} from "../../local-storage.service";
import {UserControllersService} from "../../services/userControllers.service";
import {UserRes} from "../../model/userRes";
import {NestsRes} from "../../model/nestsRes";
import {RouterLink} from "@angular/router";
import {DataRowOutlet} from "@angular/cdk/table";
import {NestsControllerService} from "../../services/nestsController.service";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbar,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage,
    RouterLink,
    DataRowOutlet
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {

  protected user: UserRes;
  protected latestNests: NestsRes[];

  constructor(private userService: UserControllersService,
              private storage: LocalStorageService,
              private nestController: NestsControllerService) {
  }

  ngOnInit() {
    this.userService.getUserByEmail({"email": this.storage.email, "password":""})
      .subscribe(data =>{
        this.user = data;
        this.storage.currentUser = data;
      })
    this.nestController.getLastsNests().subscribe(data=>{
      this.latestNests = data;
    })
  }


}
