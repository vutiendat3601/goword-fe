import { redirect } from 'react-router-dom';
import { parseError } from '../utils/api-util';
import { ExerciseModel } from './exercise-service';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function createPlan({ request }: { request: any }) {
  // # Request
  const API_PLAN = `${API_BASE_URL}/api/v1/plans`;

  const formData: FormData = await request.formData();

  const reqOptions: RequestInit = {
    method: 'post',
    redirect: 'follow',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accToken')}`,
    },
    body: formData,
  };

  // # Response
  const resp = await fetch(API_PLAN, reqOptions);
  if (resp.ok) {
    return redirect('/plan');
  }
  const err = await parseError(resp);
  err.formData = Object.fromEntries(formData);
  return err;
}
async function getPlan({ params }: { params: any }) {
  // # Request
  if (params.planId) {
    const API_PLAN = `${API_BASE_URL}/api/v1/plans/${params.planId}`;

    const reqOptions: RequestInit = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accToken')}`,
      },
    };

    // # Response
    const resp = await fetch(API_PLAN, reqOptions);
    if (resp.ok) {
      const json = await resp.json();
      return json.data;
    }
  }
  return null;
}
async function getPlans({ params }: { params: any }) {
  // # Request
  const API_PLAN = `${API_BASE_URL}/api/v1/plans?page=0&size=10`;

  const reqOptions: RequestInit = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accToken')}`,
    },
  };

  // # Response
  const resp = await fetch(API_PLAN, reqOptions);
  if (resp.ok) {
    const data = await resp.json();
    return data;
  }
  return null;
}

async function deletePlan(planId: string) {
  // # Request
  const API_PLAN = `${API_BASE_URL}/api/v1/plans/${planId}`;

  const reqOptions: RequestInit = {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accToken')}`,
    },
  };

  // # Response
  const resp = await fetch(API_PLAN, reqOptions);
  if (resp.ok) {
    return resp.json();
  }
  const err = await parseError(resp);
  return err;
}

interface PlanModel {
  id: string;
  name: string;
  description: string;
  thumb: string;
  exercises: ExerciseModel[];
}

export { createPlan, deletePlan, getPlan, getPlans };
export type { PlanModel };
