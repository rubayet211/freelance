import { Controller, Get, Req, Res, Param, Query, Post, Body, Headers, Put, Delete, Patch, ParseIntPipe, UsePipes, ValidationPipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage, MulterError } from 'multer';
import { DeleteResult } from 'typeorm';
import { ClientsServices } from './clients.services';
import { clientCredentials } from './dto/clients.dto';
import { clientEntity } from './entitties/client.entities';

@Controller('clients')
export class ClientsController {

    constructor(private readonly clientsService: ClientsServices) { }

    //Get all the client's of the particular type
    @Get()
    getAllClientsType(@Query('type') params:string): Promise<clientEntity[]>
    {
        console.log(params);
        return this.clientsService.FindAllClientsByType(params);
    }

    //Get all the clients
    @Get()
     getAllClients(): Promise<clientEntity[]>
    {
        //console.log(this.clientsService.FindAllClients());
        return this.clientsService.FindAllClients();
    }

    //Get a client by his/her ID
    @Get(':id')
    getOneClient(@Param('id',ParseIntPipe) id:number): Promise<clientEntity[]>
    {
        return this.clientsService.FindOneClient(id);
    }

    //Create a new client
    @Post('new')
    @UsePipes(new ValidationPipe())
    createClient(@Body() credentials:clientCredentials): [string, clientCredentials] {
       credentials.UUID = randomUUID();
       this.clientsService.createClient(credentials);
       return ["The following client has been created: ",credentials];
    }

    //Delete a client
    @Delete(':id')
    @UsePipes(ParseIntPipe)
    deleteAClient(@Param('id') id:number, @Res({passthrough:true}) res: Response): Promise<clientEntity[]>
    {
        return this.clientsService.DeleteClient(id); 
    }

    //Partially Update a client
    @Patch(':id')
    updatePartiallyClientsInfo(@Param('id') id:number, @Body() body:clientCredentials) 
    {
        this.clientsService.PatchUpdateClient(id,body);
    }

}
