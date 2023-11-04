import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ModeratorEntity } from './moderator.entity';
import { ModeratorInfo } from './moderator.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class ModeratorService {
    constructor(@InjectRepository(ModeratorEntity) private ModeratorRepository: Repository<ModeratorEntity>) { }
    async createModerator(ModeratorInfo: ModeratorInfo): Promise<ModeratorEntity> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(ModeratorInfo.password, salt);
        ModeratorInfo.password = hashedPassword;
        return await this.ModeratorRepository.save(ModeratorInfo);
    }
    async getModerator(): Promise<ModeratorEntity[]> {
        return await this.ModeratorRepository.find();
    }
    async getModeratorById(id: number): Promise<ModeratorEntity> {
        return await this.ModeratorRepository.findOneBy({ id: id });
    }
    async updateModerator(id: number, moderatorInfo: ModeratorInfo): Promise<any> {
        await this.ModeratorRepository.update(id, moderatorInfo);
        return await this.ModeratorRepository.findOneBy({ id: id });
    }

    async updateSpecModerator(id: number, moderatorInfo: ModeratorInfo): Promise<any> {
        await this.ModeratorRepository.update(id, moderatorInfo);
        return await this.ModeratorRepository.findOneBy({ id: id });
    }

    async deleteModerator(id: number): Promise<void> {
        await this.ModeratorRepository.delete(id);
    }

    async findModerator(username: string): Promise<ModeratorEntity> {
        return await this.ModeratorRepository.findOneBy({ username: username });
    }

    async getImages(): Promise<any> {
        return await this.ModeratorRepository.find();
    }

    async matchModerator(search: string): Promise<ModeratorEntity[]> {
        return await this.ModeratorRepository.find({
            where: {
                firstname: Like(search),
            },
        });
    }
}

