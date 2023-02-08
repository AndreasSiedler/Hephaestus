import { User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { verifyAndCreateUsername } from "../../util/functions";
import { CreateUsernameResponse, GraphQLContext } from "../../util/types";

const resolvers = {
  Query: {
    populatedUser: async (_: any, __: any, context: GraphQLContext) => {
      const { prisma, session } = context;
      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const {
        user: { id: myUserId },
      } = session;

      try {
        /**
         * Get user and populate it
         */
        const user = await prisma.user.findUnique({
          where: {
            id: myUserId,
          },
          include: {
            skills: true,
          },
        });

        return user;
      } catch (error: any) {
        console.log("error", error);
        throw new GraphQLError(error?.message);
      }
    },
    getUser: async function getUser(_: any, __: any, context: GraphQLContext) {
      const { prisma, session } = context;
      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const {
        user: { id: myUserId, username: myUsername },
      } = session;

      try {
        /**
         * Get random user which is not a friend already
         */
        const user = await prisma.user.findFirst({
          where: {
            username: {
              not: myUsername,
            },
            friendsOf: {
              none: {
                userId: myUserId,
              },
            },
            friends: {
              none: {
                friendId: myUserId,
              },
            },
          },
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        });

        return user;
      } catch (error: any) {
        console.log("error", error);
        throw new GraphQLError(error?.message);
      }
    },
    searchUsers: async function searchUsers(
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<Array<User>> {
      const { username: searchedUsername } = args;
      const { prisma, session } = context;

      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const {
        user: { username: myUsername },
      } = session;

      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchedUsername,
              not: myUsername,
            },
          },
        });

        return users;
      } catch (error: any) {
        console.log("error", error);
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    updateUser: async function updateUser(
      _: any,
      args: {
        expertise?: string;
        name?: string;
        email?: string;
        bio?: string;
        location?: string;
        blog?: string;
        status?: string;
        syncGithub?: boolean;
        skills: {
          id?: string;
          name: string;
          weight?: number;
        }[];
      },
      context: GraphQLContext
    ) {
      const { session, prisma } = context;

      if (!session?.user) {
        return {
          error: "Not authorized",
        };
      }

      const { expertise, name, email, bio, location, blog, status, syncGithub, skills = [] } = args;

      const {
        user: { id: userId },
      } = session;

      try {
        const existingSkills = await prisma.skill.findMany({
          where: {
            userId,
          },
        });
        const existingSkillIds = existingSkills.map((s) => s.name);
        const skillIds = skills.map((s) => s.name);

        /**
         * Delete existing skills NOT included in selected skills
         */
        const skillsToDelete = existingSkillIds.filter((name) => !skillIds.includes(name));

        /**
         * Create skill NOT included in existing skills
         */
        const skillsToCreate = skillIds.filter((name) => !existingSkillIds.includes(name));

        const transactionStatements = [
          prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              expertise: expertise,
              name: name,
              email: email,
              bio: bio,
              location: location,
              blog: blog,
              status: status,
              skills: {
                deleteMany: {
                  name: {
                    in: skillsToDelete,
                  },
                },
              },
            },
          }),
        ];

        if (skillsToCreate) {
          transactionStatements.push(
            prisma.user.update({
              where: {
                id: userId,
              },
              data: {
                skills: {
                  createMany: {
                    data: skillsToCreate?.map((skill) => ({
                      name: skill,
                      weight: 0,
                    })),
                  },
                },
              },
            })
          );
        }

        await prisma.$transaction(transactionStatements);

        if (syncGithub) {
          console.log("sync with github");
        }

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("updateUser error", error);
        throw new GraphQLError(error?.message);
      }
    },
    createUsername: async function createUsername(
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<CreateUsernameResponse> {
      const { session, prisma } = context;

      if (!session?.user) {
        return {
          error: "Not authorized",
        };
      }

      const { id } = session.user;
      const { username } = args;

      return await verifyAndCreateUsername({ userId: id, username }, prisma);
    },
  },
};

export default resolvers;
