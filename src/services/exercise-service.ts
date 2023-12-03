import { redirect } from 'react-router-dom';
import { parseError } from '../utils/api-util';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface ExerciseModel {
  id: string;
  name: string;
  thumb: string;
  content: string;
  createdAt: number;
}

async function getExercise({ params }: { params: any }) {
  // # Request
  if (params.exerciseId) {
    const API_EXERCISE = `${API_BASE_URL}/api/v1/exercises/${params.exerciseId}`;

    const reqOptions: RequestInit = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accToken')}`,
      },
    };

    // # Response
    const resp = await fetch(API_EXERCISE, reqOptions);
    if (resp.ok) {
      const json = await resp.json();
      return json.data;
    }
  }
  return null;
}
async function deleteExercise(exerciseId: string) {
  // # Request
  const API_EXERCISE = `${API_BASE_URL}/api/v1/exercises/${exerciseId}`;

  const reqOptions: RequestInit = {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accToken')}`,
    },
  };

  // # Response
  const resp = await fetch(API_EXERCISE, reqOptions);
  if (resp.ok) {
    return resp.json();
  }
  const err = await parseError(resp);
  return err;
}
async function getExercises() {
  // # Request
  const API_EXERCISE = `${API_BASE_URL}/api/v1/exercises?page=0&size=10`;

  const reqOptions: RequestInit = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accToken')}`,
    },
  };

  // # Response
  const resp = await fetch(API_EXERCISE, reqOptions);
  if (resp.ok) {
    const data = await resp.json();
    return data;
  }
  return null;
}
async function createExercise({ request }: { request: any }) {
  // # Request
  const API_EXERCISE = `${API_BASE_URL}/api/v1/exercises`;

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
  const resp = await fetch(API_EXERCISE, reqOptions);
  if (resp.ok) {
    return redirect('/exercise');
  }
  const err = await parseError(resp);
  err.formData = Object.fromEntries(formData);
  return err;
}

export type { ExerciseModel };
export { getExercise, createExercise, getExercises, deleteExercise };
