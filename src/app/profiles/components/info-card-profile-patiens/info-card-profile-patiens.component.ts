import { Component, Input } from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

@Component({
  selector: 'app-info-card-profile-patiens',
  standalone: true,
  templateUrl: './info-card-profile-patiens.component.html',
  imports: [
    MatCard,
    MatGridList,
    MatGridTile,
    MatCardContent
  ],
  styleUrls: ['./info-card-profile-patiens.component.css']
})
export class InfoCardProfilePatiensComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() link: string = '';
}
