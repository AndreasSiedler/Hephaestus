import { gql } from "@apollo/client";

export default {
  Queries: {
    populatedUser: gql`
      query PopulatedUser {
        populatedUser {
          id
          name
          username
          email
          bio
          location
          image
          expertise
          skills {
            name
            weight
          }
        }
      }
    `,
    getUser: gql`
      query GetUser {
        getUser {
          id
          username
          name
          image
        }
      }
    `,
    searchUsers: gql`
      query SearchUsers($username: String!) {
        searchUsers(username: $username) {
          id
          username
        }
      }
    `,
  },
  Mutations: {
    updateUser: gql`
      mutation UpdateUser(
        $expertise: String
        $name: String
        $email: String
        $bio: String
        $location: String
        $skills: [SkillInput]
      ) {
        updateUser(
          expertise: $expertise
          name: $name
          email: $email
          bio: $bio
          location: $location
          skills: $skills
        ) {
          success
          error
        }
      }
    `,
    createUsername: gql`
      mutation CreateUsername($username: String!) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};
