import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Room } from "../models/room.model";
import { environment } from "src/environments/environment";

@Injectable()
export class RoomService {

    constructor(private httpClient: HttpClient) {

    }

    getAllRooms(): Promise<Room[]> {
        return this.httpClient.get<Room[]>(`${environment.apiBaseUrl}/rooms`).toPromise();
    }
}