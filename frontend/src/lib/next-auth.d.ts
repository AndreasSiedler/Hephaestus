import "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    username: string;
    company: string;
    blog: string;
    location: string;
    hireable: boolean;
    bio: string;
    followers: number;
    following: number;
    createdAtGithub: string;
    updatedAtGithub: string;
  }
}
