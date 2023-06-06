import { Query, Resolver } from '@nestjs/graphql';
import { Person } from 'src/schemas/person.schema';
import { PersonService } from './person.service';

@Resolver('Person')
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Query(() => [Person])
  async getAllPerson() {
    return await this.personService.findAll();
  }
}
