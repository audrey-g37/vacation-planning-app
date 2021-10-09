import { QUERY_USER, QUERY_USERS, QUERY_TRIP, QUERY_TRIPS, QUERY_TASK, QUERY_TASKS, QUERY_BUDGET, QUERY_BUDGET } from '../utils/queries';

//SEE BELOW FOR EXAMPLES THAT WORK AND CONSOLE LOG WHAT WE WANT.

// ALL TRIPS, NO VARIABLES  
const {data} = useQuery(QUERY_TRIPS);
const allTrips = data?.trips || [];
console.log (allTrips);

// SINGLE TRIP, USES TRIP ID VARIABLE
const tripIdVar = "615f5b4efe6c34abc3e05bf2"
const {data} = useQuery(QUERY_TRIP, {
  variables: {tripId: tripIdVar}
});
const singleTrip = data?.trip || [];
console.log (singleTrip);

// ALL TASKS
const {data} = useQuery(QUERY_TASKS);
const allTasks= data?.tasks || [];
console.log (allTasks);

// SINGLE TASK, USES TASK ID VARIABLE
const taskIdVar = "615f5b4ffe6c34abc3e05c02"
const {data} = useQuery(QUERY_TASK, {
  variables: {taskId: taskIdVar}
});
const singleTask = data?.task|| [];
console.log (singleTask);