import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  dateFooter : Date = new Date();
  
  constructor() { }

  ngOnInit() {
  }

}
