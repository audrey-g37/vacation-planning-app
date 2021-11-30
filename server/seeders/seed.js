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

    const user1 = await User.findOne({ username: "user1" })
      .populate("trip")
      .lean();

    for (let i = 0; i < taskSeeds.length; i++) {
      const { _id, tripId } = await Task.create(taskSeeds[i]);
      const trip = await Trip.updateMany(
        { trip: tripId },
        {
          $addToSet: {
            tasks: { _id },
          },
        }
      );
    }

    const trip1 = await Trip.findOne({ title: "Bahamas Baby" })
      .populate("tasks")
      .lean();

    for (let i = 0; i < budgetSeeds.length; i++) {
      const { _id, tripId } = await Budget.create(budgetSeeds[i]);
      const trip = await Trip.updateMany(
        { trip: tripId },
        {
          $addToSet: {
            budget: { _id },
          },
        }
      );
    }

    const budget1 = await Trip.findOne({ title: "Bahamas Baby" })
      .populate("budget")
      .lean();

    // console.log(trip1);
    console.log("Seeding Complete!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
