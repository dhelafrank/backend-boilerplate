import bcrypt from 'bcrypt';
import { Configs } from '../../configs';

// Function to hash a password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = Configs.sec.bcryptRounds;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(hashedPassword);
  return hashedPassword;
}

// Function to compare a password with its hashed version
export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  const match = await bcrypt.compare(password, hashedPassword);
  console.log(match);
  return match;
}