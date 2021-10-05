const db = require("../config/connection");
const { User, Trip, Task, Budget } = require("../models");
const userSeeds = require("./users.json");
// const memberSeeds = require("./members.json");
const taskSeeds = require("./task.json");
const tripSeeds = require("./trips.json");
const budgetSeeds = require("./budget.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);

    const allUsers = User.find({});
    console.log(allUsers);

    await Trip.deleteMany({});
    await Task.deleteMany({});
    await Budget.deleteMany({});

    // await Trip.create(tripSeeds);
    // await Task.create(taskSeeds);
    // await Budget.create(budgetSeeds);

    for (let i = 0; i < tripSeeds.length; i++) {
      const { _id, userId } = await Trip.create(tripSeeds[i]);
      const user = await User.findOneAndUpdate(
        { user: userId },
        {
          $addToSet: {
            trip: { _id },
          },
        }
      );
    }

    console.log("Seeding Complete!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
