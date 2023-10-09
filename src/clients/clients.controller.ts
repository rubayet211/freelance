import { Controller, Get, Req, Res, Param, Query, Post, Body, Headers, Put, Delete } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { Request, Response } from 'express';
import { ClientsServices } from './clients.services';
import { ClientsDTO } from './DTO/clients.dto';
 
@Controller('clients')
export class ClientsController {

    constructor(private readonly clientsDatabase:ClientsServices){}

    //Get all the clients of our web app
    @Get()
    getAllClients()
    {
        console.log("All")
        return(this.clientsDatabase.clients);
    }

    //Get a client by his/her ID
    @Get(':id')
    getOneClient(@Param('id') id)
    {
        const result = this.clientsDatabase.clients.findIndex
        (
            (clients) => clients.id == id 
        )
        return this.clientsDatabase.clients[result];
    }

    //Get the particular client's type
    @Get(':id/:type')
    getOneClientByType(@Param('id') id)
    {
        const result = this.clientsDatabase.clients.findIndex
        (
            (clients) => clients.id == id
        )
        return (this.clientsDatabase.clients[result].type);
    }

    //Get all the client's of the particular type
    @Get()
    getAllClientsByType(@Query() params:string)
    {
        console.log(params)
        const result = this.clientsDatabase.clients.filter
        (
            (clients) => clients.type == params
        )
        console.log(params)
       
    }
   
    //Create a new client
    @Post('new')
    createClient(@Body() credentials:ClientsDTO)
    {
        console.log(credentials);
        if
        (
            !credentials.id ||
            !credentials.name ||
            !credentials.age
        )
        {return ("Oops. Looks like one or more informations are missing. Error code:  "+HttpStatus.BAD_REQUEST);}

        else
        {
            const arr = ["Standard","Basic","Premium"];
            credentials.type = arr[(Math.floor(Math.random() * arr.length))];
            this.clientsDatabase.clients.push(credentials);
        }

        return this.clientsDatabase.clients;
    }

    //Delete a client
    @Delete(':id')
    deleteAClient(@Param('id') clientsDTOid)
    {
        const result = this.clientsDatabase.clients.findIndex
        (
            (clients) => clients.id == clientsDTOid
        )
        this.clientsDatabase.clients.splice(result);

        return (this.clientsDatabase.clients);
    }

    // @Get(':id?name')
    // updateClientsInfo(@Query('name') query)
    // {
        
    //         console.log(query);
        
    // }

}
