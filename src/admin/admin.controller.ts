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
    ParseBoolPipe,
    Session,
    UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { SessionGuard } from './admin.guard';
import { AdminServices } from './admin.services';
import { CreateAdminDTO } from './DTO/createadminDTO.dto';
import { AdminLoginDto } from './DTO/logindto.dto';
import { Response } from 'express';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminServices: AdminServices) { }

    @Get('admins')
    getAllAdmins() 
    {
        console.log("getAllAdmins method");
        return this.adminServices.FindAllAdmins();
    }

    @Get('paginatedadmins')
    getAllAdminsLimit(@Query('limit') query) 
    {
        console.log("getAllAdmins method");
        return this.adminServices.FindAllAdminsLimited(query);
    }

    @Get('login')
    async clientLogin(@Body() LoginCredentials : AdminLoginDto , @Session() session) 
    {
        const admin = await this.adminServices.AdminLogin(LoginCredentials);
        // session.UUID = admin.UUID;
    }

    @Get('clients')
    getAllClients()
    {
        console.log("getAllClients method");
        return this.adminServices.FindAllClients();
    }

    @Get('moderators')
    getAllModerators() 
    {
        console.log("getAllModerators method");
        return this.adminServices.FindAllModerators();
    }

    @Get('freelancers')
    getAllFreelancers()
    {
        console.log("getAllFreelancers method");
        return this.adminServices.FindAllFreelancers();
    }

    @Get('projects')
    getAllProjects()
    {
        console.log("getAllProjects method");
        return this.adminServices.FindAllProjects();
    }

    @Get('underme/:id')
    getModeratorUnderMe(@Param('id') param)
    {
        console.log("ge method");
        return this.adminServices.FindModeratorUnderMe(param);
    }


    @Post('newadmin')
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
                destination: './uploads',
                filename: (req, file, cb) => {
                    cb(null, Date.now() + file.originalname)
                }
            })
        }))
    @UsePipes(new ValidationPipe())
    createAdmin(@Body() credentials : CreateAdminDTO , @UploadedFile() file: Express.Multer.File): string 
    {
        credentials.Image = file.filename;
        this.adminServices.createAdmin(credentials);
        return "The client has been created.";
    }

    @Delete('client')
    @UseGuards(SessionGuard)
    deleteClient(@Body() id: number): string 
    {
        this.adminServices.DeleteClient(id);
        return "The client has been deleted.";
    }

    @Get('adminimage/:id')
    getImage(@Param('id') id, @Res() res: Response) 
    {
        return this.adminServices.findadminimage(id)
        .then((value) => {res.sendFile(value.Image, { root: "./uploads" });});
    }

    @Delete('project')
    @UseGuards(SessionGuard)
    deleteProject(@Body() id: number): string 
    {
        this.adminServices.DeleteProject(id);
        return "The project has been deleted.";
    }

    @Delete('moderator')
    @UseGuards(SessionGuard)
    deleteModerator(@Body() id: number): string 
    {
        this.adminServices.DeleteModerator(id);
        return "The moderator has been deleted.";
    }

    @Delete('freelancer')
    @UseGuards(SessionGuard)
    deleteFreelancer(@Body() id: number): string 
    {
        this.adminServices.DeleteFreelancer(id);
        return "The freelancer has been deleted.";
    }

    @Patch(':id')
    @UseGuards(SessionGuard)
    updatePartiallyAdmin(@Param('id') id: number, @Body() body) : string 
    {
        this.adminServices.PatchUpdateAdmin(id, body);
        return "The client has been updated";
    }

    @Put(':id')
    @UseGuards(SessionGuard)
    updatePutlyAdmin(@Param('id') id: number, @Body() body) : string {
        this.adminServices.PutUpdateAdmin(id, body);
        return "The client has been updated";
    }

    @Patch('project')
    @UseGuards(SessionGuard)
    patchUpdateProject(@Body('projectID') Param: number, @Body() Body) 
    {
        this.adminServices.PatchProject(Param, Body);
    }

    @Patch('client')
    @UseGuards(SessionGuard)
    patchUpdateClient(@Body('clientID') Param: number, @Body() Body) 
    {
        this.adminServices.PatchClient(Param, Body);
    }

    @Patch('moderator')
    @UseGuards(SessionGuard)
    patchUpdateModerator(@Body('moderatorID') Param: number, @Body() Body) 
    {
        this.adminServices.PatchModerator(Param, Body);
    }

    @Patch('freelancer')
    @UseGuards(SessionGuard)
    patchUpdateFreelancer(@Body('freelancerID') Param: number, @Body() Body) 
    {
        this.adminServices.PatchFreelancer(Param, Body);
    }

}
