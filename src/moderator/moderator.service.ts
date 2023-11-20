import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ModeratorEntity } from './moderator.entity';
import { ModeratorInfo } from './moderator.dto';
import * as bcrypt from 'bcrypt';
import { ReportsEntity } from './reports/reports.entity';
import { ReportsDto } from './reports/reports.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ModeratorService {
  constructor(
    @InjectRepository(ModeratorEntity)
    private moderatorRepository: Repository<ModeratorEntity>,
    @InjectRepository(ReportsEntity)
    private reportRepository: Repository<ReportsEntity>,
    private mailerService: MailerService,
  ) {}

  async createModerator(
    moderatorInfo: ModeratorInfo,
    reportDto: ReportsDto,
  ): Promise<ModeratorEntity> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(moderatorInfo.password, salt);
    moderatorInfo.password = hashedPassword;

    const newModerator = this.moderatorRepository.create(moderatorInfo);
    const savedModerator = await this.moderatorRepository.save(newModerator);

    // await this.reportRepository.save(reportDto);

    return savedModerator;
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
      await this.mailerService.sendMail({
        to: '20-44334-3@student.aiub.edu',
        subject: 'Sign In Notification',
        text: 'You have signed in using nodemailer',
      });

      return result;
    }
    return null;
  }
}
