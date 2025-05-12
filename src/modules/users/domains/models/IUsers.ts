export interface IUsers {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  created_at: Date;
  updated_at: Date;
}
