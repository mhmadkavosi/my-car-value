import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGurd } from '../gurds/auth.gurds';
import { CreateReportDto } from './dtos/create-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGurd)
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }
}
