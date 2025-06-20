import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent implements OnInit {

  @Input() trip!: Trip;

  constructor(
    private router: Router,
    private authenticatinService: AuthenticationService
  ) {}

  ngOnInit(): void {
  }

  public isLoggedIn(): boolean {
    return this.authenticatinService.isLoggedIn();
  }
  
  public editTrip(trip: Trip) {
    // Use Angular router navigation with parameters instead of localStorage
    this.router.navigate(['/edit-trip', trip.code]);
  }
}