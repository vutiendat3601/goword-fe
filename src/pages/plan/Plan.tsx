import classNames from 'classnames/bind';
import PlanCard from '../../components/plan-card/PlanCard';
import styles from './Plan.module.css';
import { useLoaderData } from 'react-router-dom';
import { PlanModel } from '../../services/plan-service';

const css = classNames.bind(styles);

function Plan(): JSX.Element {
  const { data: plans } = useLoaderData() as {
    data: PlanModel[];
    totalPage: number;
    page: number;
    size: number;
    numOfElements: number;
  };

  return (
    <section className={css('plan-list')}>
      {plans.length > 0 ? (
        plans.map((plan: any, index: number) => (
          <PlanCard
            key={index}
            id={plan.id}
            name={plan.name}
            description={plan.description}
            thumb={plan.thumb}
          />
        ))
      ) : (
        <p className={css('message')}>Chưa có kế hoạch.</p>
      )}
    </section>
  );
}

export default Plan;
