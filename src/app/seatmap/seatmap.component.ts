import { Component, OnInit, Output } from '@angular/core';
import { Seat } from './seat.model';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SeatmapService } from './seatmap.service';
import * as fromApp from '../app.reducer';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-seatmap',
  templateUrl: './seatmap.component.html',
  styleUrls: ['./seatmap.component.css']
})
export class SeatmapComponent implements OnInit {

  seatToggle: boolean = false;
  seats: Seat[];
  arrayOfArrays = [];
  seatColor: string;
  flightid;
  @Output() seatno = new Subject<string>();
  bookedSeats = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    //private dialogRef: MatDialogRef<SeatMapComponent>,
    private store: Store<fromApp.appState>,
    private seatService: SeatmapService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flightid = params["id"];
    });
    console.log("ngInit called on seatmap");
    this.store
      .select("seats")
      .pipe(
        map(seatState => {
          console.log(seatState.seats);
          return seatState.seats;
        })
      )
      .subscribe(seats => {
        console.log(seats);
        this.seats = seats;
      });
    var size = 6;

    for (let i = 0; i <= this.seats.length; i += size) {
      this.arrayOfArrays.push(this.seats.slice(i, i + size));
    }
    console.log(this.arrayOfArrays);
  }

  seat(seatno: string) {
    console.log(seatno);
  }
  seatSelected(value) {
    this.seatToggle = !this.seatToggle;
    console.log(this.seatToggle);
    console.log(value);
    console.log(this.seats.indexOf(value));
    //this.seatService.selectSeat(value.seatno, this.seats.indexOf(value));
    this.seatService.selectSeat(value, this.seats.indexOf(value));
    this.router.navigate(["flights", this.flightid]);
    // this.router.navigate(['flights/3/passenger',number]);
    //this.router.navigate(["flights/3/passenger"], {
    //queryParams: { serviceId: number }
    //});
    // this.router.navigate(['flights/3/passenger'], {
    //   state: { example: number }
    // });
    // router.navigate(['/show_alunos'])
  }
}
