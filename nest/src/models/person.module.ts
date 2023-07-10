import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { PersonProviders } from './person.providers';
import { PersonResolver } from './person.resolver';
import { PersonService } from './person.service';
// 원티드 강좌, 지원서
@Module({
  imports: [DatabaseModule],
  providers: [PersonResolver, PersonService, ...PersonProviders],
})
export class PersonModule {}
