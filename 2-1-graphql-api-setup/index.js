const database = require("./database");
const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    teams: [Team]
    team(id: Int): Team
    equipments: [Equipments]
    supplies: [Supply]
  }
  type Mutation {
    deleteEquipment(id: String): Equipments
    insertEquipment(
      id: String
      used_by: String
      count: Int
      new_or_used: String
    ): Equipments
    editEquipment(
      id: String
      used_by: String
      count: Int
      new_or_used: String
    ): Equipments
  }
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
    supplies: [Supply]
  }
  type Equipments {
    id: String
    used_by: String
    count: Int
    new_or_used: String
  }
  type Supply {
    id: String
    team: Int
  }
`;
const resolvers = {
  Query: {
    teams: () =>
      database.teams.map((team) => {
        team.supplies = database.supplies.filter((supply) => {
          return supply.team === team.id;
        });
        return team;
      }),
    team: (parent, args, context, info) =>
      database.teams.filter((team) => {
        return team.id === args.id;
      })[0],
    equipments: () => database.equipments,
    supplies: () => database,
  },
  Mutation: {
    deleteEquipment: (parent, args, context, info) => {
      const deleted = database.equipments.filter((equipments) => {
        return equipments.id === args.id;
      })[0];

      database.equipments = database.equipments.filter((equipments) => {
        return equipments.id !== args.id;
      });

      return deleted;
    },
    insertEquipment: (parent, args, context, info) => {
      database.equipments.push(args);
      return args;
    },
    editEquipment: (parent, args, context, info) => {
      return database.equipments
        .filter((equipments) => {
          return equipments.id === args.id;
        })
        .map((equipments) => {
          Object.assign(equipments, args);
          return equipments;
        })[0];
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
console.log(database.supplies);

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
