import { Injectable } from "@nestjs/common";
import { type } from "os";

@Injectable()
export class ClientsServices
{
         clients = [
        {
            id: "20-44282-3",
            name: "Atif",
            age: 25,
            type: "Standard",
        },
        {
            id: "20-44283-3",
            name: "Hatem",
            age: 26,
            type: "Premium",
        },
        {
            id: "20-44263-3",
            name: "Rhyme",
            age: 27,
            type: "Basic",
        },
        {
            id: "20-44288-3",
            name: "Arefin",
            age: 26,
            type: "Basic",
        }
    ]
}