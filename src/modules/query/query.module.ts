import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { QueryService } from './query.service';
import { Query } from './models/query.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryType } from './models/query-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Query, QueryType
    ])
  ],
  controllers: [QueryController],
  providers: [QueryService]
})
export class QueryModule {}
