// MODELS
import User from "../models/user";

interface InewUser {
  appName: string;
  reference: string;
}

export class CreateUser {
  private constructor() {}
  public static async UserCreate(userData) {
    const createUser = async (newUser: InewUser) => {
      const userBD = new User(newUser);
      await userBD.save();
      return userBD._id;
    };
    const seeIfExist = async (userId: string) => {
      const userBD = await User.findById(userId);
      return userBD._id;
    }
    console.log(userData);
    return userData.appName !== undefined
      ? await createUser(userData)
      : userData;
  }
}
