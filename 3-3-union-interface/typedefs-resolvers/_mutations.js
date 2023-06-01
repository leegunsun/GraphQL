const { gql } = require("apollo-server");

// postPerson(input: PostPersonInput)에 input 파라미터를 넣어야지 작동한다.
const typeDefs = gql`
  type Mutation {
    deleteEquipment(id: String): Equipment
    deleteSupply(id: String): Supply
    postPerson(input: PostPersonInput): People!
  }
`;

module.exports = typeDefs;
