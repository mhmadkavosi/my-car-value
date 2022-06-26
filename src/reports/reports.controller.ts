import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGurd } from '../gurds/auth.gurds';
import { CreateReportDto } from './dtos/create-report.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorators';
import { User } from '../users/users.entity';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApprovedReportDto } from './dtos/approved-report.dto';
import { query } from 'express';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGurd)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  @Patch('/:id')
  approveReport(@Param('id') id: number, @Body() body: ApprovedReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}
