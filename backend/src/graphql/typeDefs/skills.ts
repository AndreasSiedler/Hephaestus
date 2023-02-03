import gql from "graphql-tag";

const typeDefs = gql`
  type Skill {
    name: String
    weight: Int
  }
`;

export default typeDefs;
