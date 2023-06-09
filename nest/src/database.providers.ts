import * as mongoose from 'mongoose';

const DATABASE_NAME = 'graphQL';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(`mongodb://localhost/${DATABASE_NAME}`),
  },
];
