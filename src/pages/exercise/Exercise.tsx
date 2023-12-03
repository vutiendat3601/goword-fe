import classNames from 'classnames/bind';
import { useLoaderData } from 'react-router-dom';
import { ExerciseModel } from '../../services/exercise-service';
import styles from './Exercise.module.css';
import ExerciseCard from '../../components/exercise-card/ExerciseCard';

const css = classNames.bind(styles);

function Exercise(): JSX.Element {
  const { data: exercises } = useLoaderData() as {
    data: ExerciseModel[];
    totalPage: number;
    page: number;
    size: number;
    numOfElements: number;
  };

  return (
    <section className={css('exercise-list')}>
      {exercises.length > 0 ? (
        exercises.map((exercise: any, index: number) => (
          <ExerciseCard
            key={index}
            id={exercise.id}
            name={exercise.name}
            thumb={exercise.thumb}
            content={exercise.content}
          />
        ))
      ) : (
        <p className={css('message')}>Chưa có kế hoạch.</p>
      )}
    </section>
  );
}

export default Exercise;
