import { faker } from "@faker-js/faker";
import mongoose, { Types } from "mongoose";
import User from "./models/userModel.js";
import Todo from "./models/todoModel.js";
import bcrypt from "bcrypt"

async function seed() {
  try {

    await mongoose.connect("Your Db URI")
    console.log('Connected to MongoDB');


    await User.deleteMany({});
    console.log('Existing users removed');
    await Todo.deleteMany({})
    console.log('Existing Todos removed');

    const users=[]
    const todos=[]

    for (let i = 0; i < 5; i++) {
      const hashedPassword = await bcrypt.hash('123456', 10);
      const id=new Types.ObjectId()
      users.push({
        _id:id,
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: hashedPassword,
      })
      for(let j=0;j<5;j++){
      todos.push({
        title:faker.internet.username(),
        description:faker.internet.username(),
        status:"Incomplete",
        Priority:"Low",
       owner:id
      })
    }
    }


    await User.insertMany(users);
    console.log('Seed user data inserted');

    await Todo.insertMany(todos)
    console.log('Seed todo data inserted');


    await mongoose.connection.close()
    console.log('Database connection closed');
  } catch (error) {
    console.log("Error seeding user:", error);
  }
}
seed();