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

    addTrip: async (
      parent,
      { userId, title, description, location, startDate, endDate },
      context
    ) => {
      // const testUser = await User.find({_id: userId})
      // console.log(testUser)
      // console.log({ tripData });
      const tripData = { title, description, location, startDate, endDate };
      console.log(userId);

      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      const newTrip = await Trip.create(tripData);
      console.log(newTrip);

      // if (context.user) {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: { trip: newTrip._id },
        },
        {
          new: true,

          // runValidators: true,
        }
      );

      return newTrip;
      // }
      // // If user attempts to execute this mutation and isn’t logged in, throw an error
      // throw new AuthenticationError("You need to be logged in!");
    },
    addTask: async (
      parent,
      { tripId, title, details, dueDate, status, assignee },
      context
    ) => {
      // const testUser = await User.find({_id: userId})
      // console.log(testUser)
      // console.log({ tripData });
      const taskData = { tripId, title, details, dueDate, status, assignee };
      console.log(tripId);

      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      const newTask = await Task.create(taskData);
      console.log(newTask);

      // if (context.user) {
      await Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $push: { tasks: newTask._id },
        },
        {
          new: true,

          // runValidators: true,
        }
      );

      return newTask;
      // }
      // // If user attempts to execute this mutation and isn’t logged in, throw an error
      // throw new AuthenticationError("You need to be logged in!");
    },

    addBudget: async (
      parent,
      { tripId, title, value, purchaseDate, purchasedBy },
      context
    ) => {
      // const testUser = await User.find({_id: userId})
      // console.log(testUser)
      // console.log({ tripData });
      const budgetData = { tripId, title, value, purchaseDate, purchasedBy };
      console.log(tripId);

      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      const newBudget = await Budget.create(budgetData);
      console.log(newBudget);

      // if (context.user) {
      await Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $push: { budget: newBudget._id },
        },
        {
          new: true,

          // runValidators: true,
        }
      );
      return newBudget;
      // }
      // // If user attempts to execute this mutation and isn’t logged in, throw an error
      // throw new AuthenticationError("You need to be logged in!");
    },

    removeTask: async (
      parent,
      { tripId, taskId, title, details, dueDate, status, assignee },
      context
    ) => {
      // const testUser = await User.find({_id: userId})
      // console.log(testUser)
      // console.log({ tripData });
      // const taskData = { taskId, title, details, dueDate, status, assignee };
      // console.log(taskData);

      const removeTask = await Task.findOneAndDelete(
        { _id: taskId },
        // {
        //   title: title, details: details, dueDate: dueDate, status: status, assignee: assignee
        // },
        {
          new: true,

          // runValidators: true,
        }
      );

      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      await Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $pull: { tasks: { _id: taskId } },
        },
        {
          new: true,

          // runValidators: true,
        }
      );
      console.log(removeTask);
      return removeTask;
      // }
      // // If user attempts to execute this mutation and isn’t logged in, throw an error
      // throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
