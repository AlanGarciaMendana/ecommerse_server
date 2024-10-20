import { createHash, isValidPassword } from "../utils/utils.js";
import UserRepository from "../repositories/user.repositoy.js";

const userRepository = new UserRepository()

class UserService {
    async registerUser(userData) {
        const existUser = await userRepository.getUserByEmail(userData.email);
        if (existUser) {
            res.status(400).send("Ya existe usuario")
        }
    
        userData.password = createHash(userData.password);
        const newUser = await userRepository.createUser(userData); 
        return newUser;
      }
  

  async loginUser(email, password) {
    const user = await userRepository.getUserByEmail(email);
    if (!user || !isValidPassword(password, user)) {
        res.status(400).send("Credenciales incorrectas")
    }

    return user;
  }
}

export default UserService;