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
    UseInterceptors,
    ParseBoolPipe
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { Response } from 'express'
import { ClientsServices } from './clients.services';
import { clientCredentials } from './dto/clients.dto';
import { clientsEntity } from './entitties/client.entities';
import { ClientLoginDto } from './dto/clientlogin.dto';
import { Header, Session, UseGuards } from '@nestjs/common/decorators';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/UpdateProjectDTO.dto';
import { SessionGuard } from './client.guard';
import { projectsEntity } from './entitties/clientproject.entities';

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
    // @Get('type')
    // getAllClientsType(@Query('type') params: string): Promise<clientsEntity[]> {
    //     console.log("getAllClientsType method");
    //     // return this.clientsService.FindAllClientsByType(params);
    // }

    @Get('limitclient')
    getAllClientsLimited(@Query('limit') query: number): Promise<clientsEntity[]> {
        console.log("getAllClientsLimited method");
        return this.clientsService.FindAllClientsLimited(query);
    }

    @Get('projects')
    getAllProjectsLimited():Promise<projectsEntity[]>
    {
        console.log("getAllProjecsLimited method");
        return this.clientsService.FindAllProjects();
    }

    // @Get('currencyproject')
    // getAllProjectsByCurrency(@Query('currency') query: string)
    // {
    //     console.log("getAllProjecsLimited method");
    //     return this.clientsService.getProjByCurrency(query);
    // }

    @Get('login')
    async clientLogin(@Body() LoginCredentials, @Headers() header, @Session() session):Promise<clientsEntity> {
        // console.log(header.email);
        // console.log(header.password);
        const app = await this.clientsService.ClientLogin(header);
        console.log("I am from controller");
        console.log(app);
        // session.UUID = app.UUID;
        return app;
    }

    @Get('project')
    @UseGuards(SessionGuard)
    getFreelancerofProject(@Query('title') projTitle:string)
    {
        return this.clientsService.getfreelancer(projTitle);
    }

    @Get('sortproject')
    @UseGuards(SessionGuard)
    getProjectSorted(@Query('sort') sort)
    {
        console.log('getProjectSorted method');
        return this.clientsService.getsortedProject(sort);
    }

    //Get a client by his/her ID
    @Get(':id')
    getOneClient(@Param('id') id): Promise<clientsEntity> {
        console.log(id);
        return this.clientsService.FindOneClient(id);
    }

    //Create a new client
    @Post('newclient')
    @UseInterceptors(FileInterceptor('image',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },

            storage: diskStorage({
                destination: 'C:/Users/ATIF/Downloads/freelancefront/public',
                filename: (req, file, cb) => {
                    cb(null, Date.now() + file.originalname)
                }
            })
        }))
    // @UsePipes(new ValidationPipe())
    createClient(@Body() req, @Body() credentials:clientCredentials, @UploadedFile() file): string {
        // credentials.image = file.filename;
        console.log(file);
        console.log(credentials);
        // const fileNam = "C:/Users/ATIF/Documents/Project/freelance/clientImg/";
        const imagePath = "/".concat(file.filename);
        console.log(imagePath);
        const newObj = {...credentials,"image":imagePath};
        this.clientsService.createClient(newObj);
        return "The client has been created.";
    }

    @Post(':id/newproject')
    @UseGuards(SessionGuard)
    createProject(@Param('id') id: number, @Body() body: CreateProjectDTO, @Session() session) {
        const sess = session.UUID;
        const sessi = session.id;
        console.log(sess);
        console.log(sessi);
        return this.clientsService.createClientProject(sess, id, body);
    }

    //Delete a client
    @Delete(':id')
    @UsePipes(ParseIntPipe)
    deleteAClient(@Param('id') id: number): string {
        this.clientsService.DeleteClient(id);
        return "The client has been deleted.";
    }

    @Delete('project/:id')
    deleteAProject(@Param('id' , ParseIntPipe) id: number): string {
        this.clientsService.DeleteProject(id);
        return "The project has been deleted.";
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
        .then((value) => {res.sendFile(value.image, { root: "./clientImg" });});
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
