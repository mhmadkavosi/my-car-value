import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reports } from './reports.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/users.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Reports) private repo: Repository<Reports>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved;
    return this.repo.save(report);
  }
}
