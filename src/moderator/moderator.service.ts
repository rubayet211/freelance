import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ModeratorEntity } from './moderator.entity';
import { ModeratorInfo } from './moderator.dto';
import * as bcrypt from 'bcrypt';
import { ReportsEntity } from './reports/reports.entity';

@Injectable()
export class ModeratorService {
  constructor(
    @InjectRepository(ModeratorEntity)
    private moderatorRepository: Repository<ModeratorEntity>,
  ) // @InjectRepository(ReportsEntity)
  // private reportRepository: Repository<ReportsEntity>,
  {}

  async createModerator(
    ModeratorInfo: ModeratorInfo,
  ): Promise<ModeratorEntity> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(ModeratorInfo.password, salt);
    ModeratorInfo.password = hashedPassword;
    return await this.moderatorRepository.save(ModeratorInfo);
  }
  async getModerator(): Promise<ModeratorEntity[]> {
    return await this.moderatorRepository.find();
  }
  async getModeratorById(id: number): Promise<ModeratorEntity> {
    return await this.moderatorRepository.findOneBy({ id: id });
  }
  async updateModerator(
    id: number,
    moderatorInfo: ModeratorInfo,
  ): Promise<any> {
    await this.moderatorRepository.update(id, moderatorInfo);
    return await this.moderatorRepository.findOneBy({ id: id });
  }

  async updateSpecModerator(
    id: number,
    moderatorInfo: ModeratorInfo,
  ): Promise<any> {
    await this.moderatorRepository.update(id, moderatorInfo);
    return await this.moderatorRepository.findOneBy({ id: id });
  }

  async deleteModerator(id: number): Promise<void> {
    await this.moderatorRepository.delete(id);
  }

  async findModerator(username: string): Promise<ModeratorEntity> {
    return await this.moderatorRepository.findOneBy({ username: username });
  }

  async getImages(): Promise<any> {
    return await this.moderatorRepository.find();
  }

  async matchModerator(search: string): Promise<ModeratorEntity[]> {
    return await this.moderatorRepository.find({
      where: {
        firstname: Like(search),
      },
    });
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.moderatorRepository.findOneBy({ username });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async assignReportToModerator(username: string, reportId: number) {
  //   const moderator = await this.moderatorRepository.findOne({
  //     where: { username: username },
  //   });
  //   const report = await this.reportRepository.findOne({
  //     where: { id: reportId },
  //   });

  //   if (moderator && report) {
  //     report.moderator = moderator;
  //     await this.reportRepository.save(report);
  //   }
  // }
}
