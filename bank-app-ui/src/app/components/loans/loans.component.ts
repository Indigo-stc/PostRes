import { Component, OnInit } from '@angular/core';
import { Loans } from 'src/app/model/loans.model';
import { User } from 'src/app/model/user.model';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  user = new User();
  loans = new Array();
  currOutstandingBalance: number = 0;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || "");
    if(this.user){
      this.dashboardService.getLoansDetails(this.user.id).subscribe(
        responseData => {
        this.loans = <any> responseData.body;
        console.log(this.loans)
        this.loans.forEach(function (this: LoansComponent, loan: Loans) {
          this.currOutstandingBalance = this.currOutstandingBalance+loan.outstandingAmount;
        }.bind(this)); 
        });
    }
  }

  guardar() {
    let date = new Date();
    let loan = new Loans(0, this.user.id, date, 'Personal', 20, 1, 15000);
    console.log(loan);
    this.dashboardService.saveLoan(loan).subscribe(
      (res) => {
        console.log(res)
      }
    )
  }

  

}
