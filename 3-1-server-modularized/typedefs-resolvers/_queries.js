const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    equipments: [Equipment]
    supplies: [Supply]
    equipmentAdv: [EquipmentAdv]
  }
`;

module.exports = typeDefs;
