import classNames from 'classnames/bind';
import styles from './PlanDetail.module.css';
import ExerciseCard from '../../../components/exercise-card/ExerciseCard';
import { useLoaderData } from 'react-router-dom';
import { PlanModel } from '../../../services/plan-service';
import Button from '../../../components/button/Button';

const css = classNames.bind(styles);

function PlanDetail(): JSX.Element {
  const plan: PlanModel = useLoaderData() as PlanModel;

  return (
    <section>
      <div className={css('detail')}>
        <div className={css('thumb-wrapper')}>
          <img src={plan.thumb} alt="" className={css('thumb')} />
        </div>
        <div className={css('info')}>
          <h2 className={css('name')}>{plan.name}</h2>
          <p className={css('desc')}>{plan.description}</p>
        </div>
      </div>
      <div className={css('exercise')}>
        <div className={css('exercise-action')}>
          <h2 className={css('heading')}>Bài tập</h2>
          <div className={css('action-btn')}>
            <Button>Thêm</Button>
          </div>
        </div>
        <div className={css('exercise-list')}>
          {plan.exercises.map(({ id, name, content, thumb }) => (
            <ExerciseCard
              id={id}
              name={name}
              thumb={thumb}
              content={content}
              key={id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PlanDetail;
