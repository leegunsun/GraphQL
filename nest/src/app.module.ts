import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
// import { PersonModule } from './models/person.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonModule } from './models/person.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://test:sparta@cluster0.fnwebyg.mongodb.net/?retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gpl',
      typePaths: ['./**/*.graphql'],
    }),

    // PersonModule,
  ],
})
export class AppModule {}
