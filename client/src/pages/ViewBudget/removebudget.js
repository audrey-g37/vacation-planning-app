import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_BUDGET } from '../../utils/mutations';
import { QUERY_BUDGETS } from '../../utils/queries';

const handleRemoveSkill = ({ budget }) => {
//   const [removeBudget, { error }] = useMutation(REMOVE_BUDGET, {
//     update(cache, { data: { removeBudget } }) {
//       try {
//         cache.writeQuery({
//           query: budget,
//           data: { budget: removeBudget },
//         });
//       } catch (e) {
//         console.error(e);
//       }
//     },
//   });

//   const handleRemoveSkill = async (budget) => {
//     try {
//       const { data } = await removeBudget({
//         variables: { budget },
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!budget.length) {
//     return <h3>No Expenses Yet</h3>;
//   }
};

export default handleRemoveSkill;