const { Budget, Task, Trip, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { username }, context) => {
      // if (context.user) {
      return await User.findOne({ username: username }).populate("trip");
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },
    users: async (parent, args, context) => {
      // if (context.user) {
      return await User.find({}).populate("trip");
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },
    trip: async (parent, { tripId }, context) => {
      // if (context.user) {
      return await Trip.findOne({ _id: tripId }).populate("tasks", "budget");
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },
    trips: async (parent, args, context) => {
      // if (context.user) {
      return await Trip.find({}).populate("tasks", "budget");
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },
    task: async (parent, { taskId }, context) => {
      // if (context.trip) {
      return await Task.findOne({ _id: taskId });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },
    tasks: async (parent, args, context) => {
      // if (context.trip) {
      return await Task.find({});
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },
    budget: async (parent, { budgetId }, context) => {
      // if (context.trip) {
      return await Budget.findOne({ _id: budgetId });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },
    budgets: async (parent, args, context) => {
      // if (context.trip) {
      return await Budget.find({});
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    addUser: async (parent, { username, password }, context) => {
      const user = await User.create({ username, password });
      // const token = await signToken(User);
      // return await { token, User };
      return await { user };
    },

    // login: async (parent, { username, password }) => {
    //   const User = await User.findOne({ username });
    //   if (!User) {
    //     throw new AuthenticationError("No profile with this email found!");
    //   }
    //   const correctPw = await User.isCorrectPassword(password);
    //   if (!correctPw) {
    //     throw new AuthenticationError("Incorrect password!");
    //   }
    //   const token = signToken(User);
    //   return { token, User };
    // },
   
    addTrip: async (parent, { tripData, userId }, context) => {
      console.log({ tripData });
      console.log({ userId });

      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      const newTrip = await Trip.create(tripData);
      console.log(newTrip);

      // if (context.user) {
      return await User.findOneAndUpdate(
        { _id: { userId } },
        {
          $push: { trip: trip._id },
        },
        {
          new: true,
          // runValidators: true,
        }
      );
      // }
      // // If user attempts to execute this mutation and isn’t logged in, throw an error
      // throw new AuthenticationError("You need to be logged in!");
    },
   
  },
};

module.exports = resolvers;
