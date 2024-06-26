import { Injectable } from '@nestjs/common';
import { SeriesDto } from './dto/series.dto';
import { Series } from '../entities/Series';

@Injectable()
export class SeriesMapper {
  seriesToDto(series: Series): SeriesDto {
    const dto = new SeriesDto();

    dto.id = series.id;
    dto.title = series.title;
    dto.description = series.description;

    return dto;
  }
}
