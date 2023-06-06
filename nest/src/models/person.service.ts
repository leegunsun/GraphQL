import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Person } from '../schemas/person.schema';

@Injectable()
export class PersonService {
  constructor(
    @Inject('PERSON_MODEL')
    private personModel: Model<Person>,
  ) {}

  async findAll(): Promise<Person[]> {
    return this.personModel.find().exec();
  }
}
