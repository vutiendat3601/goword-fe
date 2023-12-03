import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { deletePlan } from '../../services/plan-service';
import Button from '../button/Button';
import styles from './PlanCard.module.css';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

const css = classNames.bind(styles);

interface PlanCardProps {
  id: string;
  thumb: string;
  name: string;
  description: string;
}

function PlanCard({
  id,
  thumb,
  name,
  description,
}: PlanCardProps): JSX.Element {
  const navigate = useNavigate();

  const {
    userInfo: { permissions },
  } = useContext(UserContext);

  const handleDelete = async (id: string) => {
    const result = await deletePlan(id);
    if (result.status === 'success') {
      navigate('/plan');
    }
  };
  return (
    <article className={css('wrapper')}>
      <div className={css('thumb-wrapper')}>
        <img src={thumb} alt={name} className={css('thumb')} />
      </div>
      <h2 className={`${css('name')} text-name`}>{name}</h2>
      <p className={css('desc')}>{description}</p>
      <div className={css('action')}>
        {permissions.includes('DELETE_PLAN') && (
          <button
            className={css('delete-btn')}
            onClick={(e: any) => handleDelete(id)}
          >
            Xóa
          </button>
        )}
        <Button onClick={() => navigate(`/plan/${id}`)}>Xem chi tiết</Button>
      </div>
    </article>
  );
}

export default PlanCard;
