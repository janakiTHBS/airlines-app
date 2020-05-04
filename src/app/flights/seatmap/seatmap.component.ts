import { Component, OnInit } from '@angular/core';
import { SeatmapService } from './seatmap.service';
import { Seat } from './seat.model';
import { FlightService } from '../flight.service';
import { Flight } from '../flight.model';
import { CheckinStatus } from '../enums/CheckinStatus.enum';
import { PassengerType } from '../enums/PassengerType.enum';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SeatcheckinComponent } from './seatcheckin/seatcheckin.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seatmap',
  templateUrl: './seatmap.component.html',
  styleUrls: ['./seatmap.component.css']
})
export class SeatmapComponent implements OnInit {

  constructor(private seatmapService: SeatmapService,
              private flightService: FlightService,
              private dialog: MatDialog,
              private route: ActivatedRoute) { }
  totalSeats: number[] = this.seatmapService.getTotalSeats();
  seatsOccupied: Seat[] = null;
  availableSeats = this.seatmapService.getseatsAvailable();
  ngOnInit(): void {

  }

  onSeatClick(seatNumber: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    dialogConfig.data = {route: this.route, seatNumber};
    const dialogRef = this.dialog.open(SeatcheckinComponent, dialogConfig);

  }

  getColorCodes(seatNumber: string) {
   return this.flightService.getcheckedInPassengersMap().get(seatNumber.toString());
  }
}
