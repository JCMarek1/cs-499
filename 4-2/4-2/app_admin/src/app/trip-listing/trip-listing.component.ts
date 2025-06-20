import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TripCardComponent } from "../trip-card/trip-card.component";
import { TripDataService } from "../services/trip-data.service";
import { Trip } from "../models/trip";
import { Router, RouterModule } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

@Component({
    selector: 'app-trip-listing',
    standalone: true,
    imports: [CommonModule, TripCardComponent, RouterModule],
    templateUrl: './trip-listing.component.html',
    styleUrls: ['./trip-listing.component.css']
})
export class TripListingComponent implements OnInit {
    trips: Trip[] = [];
    message: string = '';
    loading: boolean = true;
    debug: boolean = true;  // Toggle for debug outputs

    constructor(
        private tripDataService: TripDataService,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        if (this.debug) console.log('TripListingComponent initialized');
    }

    ngOnInit(): void {
        if (this.debug) console.log('Starting trip data load...');
        
        this.tripDataService.getTrips().subscribe({
            next: (trips: Trip[]) => {
                if (this.debug) {
                    console.log('Trips loaded:', trips);
                    console.log('Trip count:', trips.length);
                    console.log('First trip:', trips[0]);
                }
                
                this.trips = trips;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading trips:', error);
                this.message = 'Failed to load trips. Please try again later.';
                this.loading = false;
                if (this.debug) console.log('Error state activated');
            }
        });
    }

    public isLoggedIn(): boolean {
        const loggedIn = this.authenticationService.isLoggedIn();
        if (this.debug) console.log('Login status:', loggedIn);
        return loggedIn;
    }

    public addTrip(): void {
        if (this.debug) console.log('Navigating to add-trip');
        this.router.navigate(['/add-trip']);
    }
}