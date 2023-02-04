import "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    status: string;
    expertise: string;
    username: string;
    name: string;
    email: string;
    bio: string;
    location: string;
    blog: string;
    company: string;
    hireable: boolean;
    followers: number;
    following: number;
    createdAtGithub: string;
    updatedAtGithub: string;
  }
}
