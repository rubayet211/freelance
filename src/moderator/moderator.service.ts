import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ModeratorEntity } from './moderator.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';

@Injectable()
export class ModeratorService {
    constructor(@InjectRepository(ModeratorEntity) private userRepository: Repository<ModeratorEntity>) { }
    // userRepository is the local repository
    async createModerator(user: ModeratorEntity): Promise<ModeratorEntity> {
        return this.userRepository.save(user);
    }
    async getAllModerators(): Promise<ModeratorEntity[]> {
        return this.userRepository.find();
    }
    async getModeratorById(id: number): Promise<ModeratorEntity> {
        return this.userRepository.findOneBy({ id: id });
    }
    async updateModerator(id: number, updatedUser: ModeratorEntity): Promise<ModeratorEntity> {
        await this.userRepository.update(id, updatedUser);
        return this.userRepository.findOneBy({ id: id });
    }
    async deleteModerator(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
