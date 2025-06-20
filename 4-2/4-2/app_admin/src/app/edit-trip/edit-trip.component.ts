import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // Added ActivatedRoute
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
    selector: 'app-edit-trip',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './edit-trip.component.html',
    styleUrl: './edit-trip.component.css'
}) 
export class EditTripComponent implements OnInit {
    public editForm!: FormGroup;
    trip!: Trip;
    submitted = false;
    message: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private tripDataService: TripDataService,
        private route: ActivatedRoute // Added for route parameters
    ) {}

    ngOnInit(): void {
        // Get tripCode from route parameters
        this.route.params.subscribe(params => {
            const tripCode = params['tripCode'];
            
            if (!tripCode) {
                alert("Missing trip code parameter!");
                this.router.navigate(['']);
                return;
            }

            console.log('EditTripComponent::ngOnInit');
            console.log('tripcode:', tripCode);

            // Initialize form with validators
            this.editForm = this.formBuilder.group({
                _id: [],
                code: [tripCode, Validators.required],
                name: ['', Validators.required],
                length: ['', Validators.required],
                start: ['', Validators.required],
                resort: ['', Validators.required],
                perPerson: ['', Validators.required],
                image: ['', Validators.required],
                description: ['', Validators.required]
            });

            // Fetch trip data
            this.tripDataService.getTrip(tripCode)
                .subscribe({
                    next: (value: any) => { 
                        this.trip = value;
                        if(value) {
                            // Populate form with retrieved data
                            this.editForm.patchValue(value);
                            this.message = `Trip ${tripCode} loaded`;
                        } else {
                            this.message = 'No trip found';
                            this.router.navigate(['']);
                        }
                        console.log(this.message);
                    },
                    error: (error: any) => {
                        console.log('Error fetching trip:', error);
                        this.router.navigate(['']);
                    }
                });
        });
    }

    public onSubmit() {
        this.submitted = true;
        if(this.editForm.valid) {
            this.tripDataService.updateTrip(this.editForm.value)
                .subscribe({
                    next: (value: any) => {
                        console.log(value);
                        this.router.navigate(['']);
                    },
                    error: (error: any) => {
                        console.log('Error updating trip:', error);
                    }
                });
        }
    }

    // get the form short name to access the form fields
    get f() { return this.editForm.controls; }
}