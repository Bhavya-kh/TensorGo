import { useState, useEffect } from 'react';
import axios from '../services/api';

const usePlan = (planId) => {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      const res = await axios.get(`/plans/${planId}`);
      setPlan(res.data);
    };
    fetchPlan();
  }, [planId]);

  return plan;
};

export default usePlan;
