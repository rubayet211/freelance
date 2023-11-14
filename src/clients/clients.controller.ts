import {
    Controller,
    Get,
    Req,
    Res,
    Param,
    Query,
    Post,
    Body,
    Headers,
    Put,
    Delete,
    Patch,
    ParseIntPipe,
    UsePipes,
    ValidationPipe,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage, MulterError } from 'multer';
import { Response } from 'express'
import { ClientsServices } from './clients.services';
import { clientCredentials } from './dto/clients.dto';
import { clientsEntity } from './entitties/client.entities';
import { ClientLoginDto } from './dto/clientlogin.dto';
import { Session } from '@nestjs/common/decorators';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/UpdateProjectDTO.dto';

@Controller('clients')
export class ClientsController {

    constructor(private readonly clientsService: ClientsServices) { }

    //Get all the clients
    @Get()
    getAllClients(): Promise<clientsEntity[]> {
        console.log("getAllClients method");
        return this.clientsService.FindAllClients();
    }

    //Get all the client's of the particular type
    @Get('type')
    getAllClientsType(@Query('type') params: string): Promise<clientsEntity[]> {
        console.log("getAllClientsType method");
        return this.clientsService.FindAllClientsByType(params);
    }

    @Get('limit')
    getAllClientsLimited(@Query('limit') query: number): Promise<clientsEntity[]> {
        console.log("getAllClientsLimited method");
        return this.clientsService.FindAllClientsLimited(query);
    }

    @Get('login')
    async clientLogin(@Body() LoginCredentials: ClientLoginDto, @Session() session) {
        const app = await this.clientsService.ClientLogin(LoginCredentials);
        console.log(app.UUID);
        session.UUID = app.UUID;
        return (session.UUID);
    }

    //Get a client by his/her ID
    @Get(':id')
    getOneClient(@Param('id', ParseIntPipe) id: number): Promise<clientsEntity[]> {
        return this.clientsService.FindOneClient(id);
    }

    //Create a new client
    @Post('newclient')
    @UseInterceptors(FileInterceptor('Image',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },

            storage: diskStorage({
                destination: './clientImg',
                filename: (req, file, cb) => {
                    cb(null, Date.now() + file.originalname)
                }
            })
        }))
    @UsePipes(new ValidationPipe())
    createClient(@Body() req, @Body() credentials: clientCredentials, @UploadedFile() file: Express.Multer.File): string {
        console.log(req);
        console.log(file);
        console.log(credentials.Image);
        console.log(credentials.name);
        credentials.UUID = randomUUID();
        credentials.Image = file.filename;
        this.clientsService.createClient(credentials);
        return "The client has been created.";
    }

    @Post(':id/newproject')
    createProject(@Param('id') id: number, @Body() body: CreateProjectDTO) {
        return this.clientsService.createClientProject(id, body);
    }

    //Delete a client
    @Delete(':id')
    @UsePipes(ParseIntPipe)
    deleteAClient(@Param('id') id: number): string {
        this.clientsService.DeleteClient(id);
        return "The client has been deleted.";
    }

    //Partially Update a client
    @Patch(':id')
    updatePartiallyClientsInfo(@Param('id') id: number, @Body() body: clientCredentials): string {
        this.clientsService.PatchUpdateClient(id, body);
        return "The client has been updated";
    }

    @Put(':id')
    updatePutlyClientsInfo(@Param('id') id: number, @Body() body: clientCredentials): string {
        this.clientsService.PutUpdateClient(id, body);
        return "The client has been updated";
    }

    // Get client's image
    @Get('clientimage/:id')
    getImage(@Param('id') id, @Res() res: Response) {
        return this.clientsService.findclientimage(id)
        .then((value) => {res.sendFile(value.Image, { root: "./clientImg" });});
    }

    @Get('project/:id')
    getClientProjects(@Param() param: number) {
        return this.clientsService.FindTheClientsProject(param);
    }

    @Patch('project/:id')
    patchUpdateProject(@Param('id') Param: number, @Body() Body: UpdateProjectDTO) {
        this.clientsService.PatchProject(Param, Body);
    }

    @Put('project/:id')
    putUpdateProject(@Param('id') Param: number, @Body() Body: UpdateProjectDTO) {
        this.clientsService.PutProject(Param, Body);
    }


}
