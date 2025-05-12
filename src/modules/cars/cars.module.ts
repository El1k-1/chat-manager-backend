import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Cars } from './models/cars.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cars
    ])
  ],
  controllers: [CarsController],
  providers: [CarsService]
})
export class CarsModule {}
