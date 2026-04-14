import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DataServicesCalls } from '../services/data.services';
import { ClientData } from '../modals/data-service.modal';

@Component({
    selector: 'app-lobby-page',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="client-container">
            @for (client of clientData; track client.name) {
                <div class="client-card">
                    <h2>{{ client.name }}</h2>
                    <hr>
                    <div class="details">
                        <p><strong>Birth Year:</strong> {{ client.birth_year }}</p>
                        <p><strong>Gender:</strong> {{ client.gender }}</p>
                        <p><strong>Physical Traits:</strong></p>
                        <ul>
                        <li>Height: {{ client.height }}cm</li>
                        <li>Mass: {{ client.mass }}kg</li>
                        <li>Hair: {{ client.hair_color }}</li>
                        <li>Eyes: {{ client.eye_color }}</li>
                        <li>Skin: {{ client.skin_color }}</li>
                        </ul>
                    </div>
                    <button>
                        Ask for a loan
                    </button>

                    <input type="text" placeholder="R 00.00">
                </div>
            } @empty {
                <p>No client data found.</p>
            }
        </div>
    `
})
export class LobbyPageComponent implements OnInit{
    private apiData = inject(DataServicesCalls);
    clientData : ClientData[] = [] ;
    ngOnInit(): void {
        this.apiData.getClients().subscribe({
            next: (data) => {
                this.clientData = data;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
    
}