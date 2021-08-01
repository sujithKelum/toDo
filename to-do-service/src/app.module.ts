import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ValidationPipe } from './shared/pipes/validation.pipe';

// Config
import { typeOrmConfig } from './configs/typeorm.config';

// Modules
import { ElementsModule } from './modules/toDo/toDo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ElementsModule
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {}
