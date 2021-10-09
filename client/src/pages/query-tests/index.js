import { QUERY_USER, QUERY_USERS, QUERY_TRIP, QUERY_TRIPS, QUERY_TASK, QUERY_TASKS, QUERY_BUDGET, QUERY_BUDGET } from '../../utils/queries';

const {data} = useQuery(QUERY_TRIPS);
const allTrips = data?.trips || [];
console.log (allTrips);

const {data} = useQuery(QUERY_TRIP);
const singleTrip = data?.trip || [];
console.log (singleTrip);

const {data} = useQuery(QUERY_TASKS);
const allTasks= data?.tasks || [];
console.log (allTasks);

const {data} = useQuery(QUERY_TASK);
const singleTask = data?.task|| [];
console.log (singleTask);