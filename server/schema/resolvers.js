const { Budget, Task, Trip, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { username }, context) => {
      if (context.user) {
        return await User.findOne({ username: username }).populate("trip");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    users: async (parent, args, context) => {
      if (context.user) {
        return await User.find({}).populate("trip");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    trip: async (parent, { tripId }, context) => {
      if (context.user) {
        return await Trip.findOne({ _id: tripId }).populate("tasks", "budget");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    trips: async (parent, args, context) => {
      if (context.user) {
        return await Trip.find({}).populate("tasks", "budget");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    task: async (parent, { taskId }, context) => {
      if (
        (context.const[(state, dispatch)] = useReducer(
          reducer,
          initialState,
          init
        ))
      ) {
        return await Task.findOne({ _id: taskId });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    tasks: async (parent, args, context) => {
      if (context.user) {
        return await Task.find({});
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    budget: async (parent, { budgetId }, context) => {
      if (context.user) {
        return await Budget.findOne({ _id: budgetId });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    budgets: async (parent, args, context) => {
      if (context.user) {
        return await Budget.find({});
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    addUser: async (parent, { username, password }, context) => {
      const user = await User.create({ username, password });
      const token = await signToken(User);
      return { token, user };
    },

    login: async (parent, { username, password }) => {
      const loggedInUser = await User.findOne({ username: username });
      console.log(loggedInUser);
      if (!User) {
        throw new AuthenticationError("No profile with this username found!");
      }
      const correctPw = await loggedInUser.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = await signToken(loggedInUser);
      return { token, user: loggedInUser };
    },

    addTrip: async (
      parent,
      { userId, title, description, location, startDate, endDate },
      context
    ) => {
      const tripData = { title, description, location, startDate, endDate };

      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      const newTrip = await Trip.create(tripData);

      if (context.user) {
        await User.findOneAndUpdate(
          { _id: userId },
          {
            $push: { trip: newTrip._id },
          },
          {
            new: true,

            runValidators: true,
          }
        );

        return newTrip;
      }
      // // If user attempts to execute this mutation and isn’t logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },
    addTask: async (
      parent,
      { tripId, title, details, dueDate, status, assignee },
      context
    ) => {
      const taskData = { tripId, title, details, dueDate, status, assignee };

      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      const newTask = await Task.create(taskData);

      if (context.user) {
        await Trip.findOneAndUpdate(
          { _id: tripId },
          {
            $push: { tasks: newTask._id },
          },
          {
            new: true,

            runValidators: true,
          }
        );

        return newTask;
      }
      // // If user attempts to execute this mutation and isn’t logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },

    addBudget: async (
      parent,
      { tripId, title, value, purchaseDate, purchasedBy },
      context
    ) => {
      const budgetData = { tripId, title, value, purchaseDate, purchasedBy };

      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      const newBudget = await Budget.create(budgetData);

      if (context.user) {
        await Trip.findOneAndUpdate(
          { _id: tripId },
          {
            $push: { budget: newBudget._id },
          },
          {
            new: true,

            runValidators: true,
          }
        );
        return newBudget;
      }
      // // If user attempts to execute this mutation and isn’t logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },
    updateTrip: async (
      parent,
      { userId, tripId, title, description, location, startDate, endDate },
      context
    ) => {
      const tripToUpdate = await Trip.findOneAndUpdate(
        { _id: tripId },
        {
          title: title,
          description: description,
          location: location,
          startDate: startDate,
          endDate: endDate,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      await User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { trip: tripToUpdate },
        },
        {
          new: true,
          // runValidators: true,
        }
      );
      return tripToUpdate;

      // throw new AuthenticationError("You need to be logged in!")
      // }
      // If user attempts to execute this mutation and isn’t logged in, throw an error
    },
    removeTrip: async (parent, { userId, tripId }, context) => {
      const toUpdateWithDelete = await User.findOneAndUpdate(
        { _id: userId },
        {
          $pull: { trip: tripId },
        },
        {
          new: true,
        }
      );
      const removeTrip = await Trip.findOneAndDelete(
        { _id: tripId },
        {
          new: true,

          // runValidators: true,
        }
      );

      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in

      return toUpdateWithDelete;
      // }
      // // If user attempts to execute this mutation and isn’t logged in, throw an error
      // throw new AuthenticationError("You need to be logged in!");
    },
    updateTask: async (
      parent,
      { tripId, taskId, title, details, dueDate, status, assignee },
      context
    ) => {
      const taskToUpdate = await Task.findOneAndUpdate(
        { _id: taskId },
        {
          title: title,
          details: details,
          dueDate: dueDate,
          status: status,
          assignee: assignee,
        },
        {
          new: true,
          // runValidators: true,
        }
      );
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      await Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $addToSet: { tasks: taskToUpdate },
        },
        {
          new: true,
          // runValidators: true,
        }
      );
      console.log(taskToUpdate);
      return taskToUpdate;
      // }
      // // If user attempts to execute this mutation and isn’t logged in, throw an error
      // throw new AuthenticationError("You need to be logged in!");
    },
    removeTask: async (parent, { tripId, taskId }, context) => {
      const toUpdateWithDelete = await Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $pull: { tasks: taskId },
        },
        {
          new: true,

          // runValidators: true,
        }
      );

      console.log(toUpdateWithDelete);

      const removeTask = await Task.findOneAndDelete(
        { _id: taskId },
        {
          new: true,

          // runValidators: true,
        }
      );

      // // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in

      // console.log(removeTask);
      return toUpdateWithDelete;
      // }
      // // If user attempts to execute this mutation and isn’t logged in, throw an error
      // throw new AuthenticationError("You need to be logged in!");
    },
    updateBudget: async (
      parent,
      { tripId, budgetId, title, value, purchaseDate, purchasedBy },
      context
    ) => {
      const budgetToUpdate = await Budget.findOneAndUpdate(
        { _id: budgetId },
        {
          title: title,
          value: value,
          purchaseDate: purchaseDate,
          purchasedBy: purchasedBy,
        },
        {
          new: true,
          // runValidators: true,
        }
      );
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      await Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $addToSet: { budget: budgetToUpdate },
        },
        {
          new: true,
          // runValidators: true,
        }
      );
      console.log(budgetToUpdate);
      return budgetToUpdate;
      // }
      // // If user attempts to execute this mutation and isn’t logged in, throw an error
      // throw new AuthenticationError("You need to be logged in!");
    },
    removeBudget: async (
      parent,
      { tripId, budgetId, title, value, purchaseDate, purchasedBy },
      context
    ) => {
      const toUpdateWithDelete = await Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $pull: { budget: budgetId },
        },
        {
          new: true,

          // runValidators: true,
        }
      );

      console.log(toUpdateWithDelete);

      const removeBudget = await Budget.findOneAndDelete(
        { _id: budgetId },
        {
          new: true,

          // runValidators: true,
        }
      );

      // // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in

      // console.log(removeTask);
      return toUpdateWithDelete;
      // }
      // // If user attempts to execute this mutation and isn’t logged in, throw an error
      // throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
