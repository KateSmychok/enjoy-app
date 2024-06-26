import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeriesService } from './series.service';
import { SeriesDto } from './dto/series.dto';
import { CreateSeriesDto } from './dto/create-series.dto';

@Controller('series')
@ApiTags('series')
export class SeriesController {
  constructor(private seriesService: SeriesService) {}

  @Get('/')
  @ApiOperation({ operationId: 'getAllSeries' })
  @ApiResponse({ status: 200, type: [SeriesDto] })
  async getAllSeries(): Promise<SeriesDto[]> {
    return this.seriesService.getAllSeries();
  }

  @Post('/')
  @ApiOperation({ operationId: 'addSeries' })
  @ApiResponse({ status: 200, type: SeriesDto })
  async addNewSeries(@Body() body: CreateSeriesDto): Promise<SeriesDto> {
    return this.seriesService.addNewSeries(body);
  }
}
