import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: 'CAT_CONFIG',
      useValue: {
        maxAge: 25,
        defaultBreed: 'Mixed',
        enableLogging: true,
      },
    },
    {
      provide: 'CAT_REPOSITORY',
      useFactory: () => {
        // Factory for creating cat repository
        return {
          type: 'in-memory',
          maxSize: 1000,
        };
      },
    },
  ],
  exports: [CatsService, 'CAT_CONFIG'],
})
export class CatsModule {}
