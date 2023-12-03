import classNames from 'classnames/bind';
import styles from './ExerciseCard.module.css';
import btnPlay from '../../assets/img/button-play.svg';
import { useNavigate } from 'react-router-dom';
import { deleteExercise } from '../../services/exercise-service';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

const css = classNames.bind(styles);

interface ExerciseCardProps {
  id: string;
  thumb: string;
  name: string;
  content: string;
}

function ExerciseCard({
  id,
  thumb,
  name,
  content,
}: ExerciseCardProps): JSX.Element {
  const navigate = useNavigate();
  const {
    userInfo: { permissions },
  } = useContext(UserContext);
  const handleDelete = async (id: string) => {
    const result = await deleteExercise(id);
    if (result.status === 'success') {
      navigate('/exercise');
    }
  };
  return (
    <article className={css('wrapper')}>
      <img src={thumb} alt="" className={css('thumb')} />
      <h2 className={css('name')}>{name}</h2>
      {/* <p className={css('desc')}>{content.replace(/\n/g, '<br>')}</p> */}
      <p
        className={css('desc')}
        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }}
      >
        {/* {content.replace(/\n/g, '<br>')} */}
      </p>

      <div className={css('action')}>
        {permissions.includes('DELETE_EXERCISE') && (
          <button
            className={css('delete-btn')}
            onClick={(e: any) => handleDelete(id)}
          >
            Xóa
          </button>
        )}
        <button className="play-btn" onClick={() => navigate(`/play/${id}`)}>
          <img className={css('play-icon')} src={btnPlay} alt="" />
        </button>
      </div>
    </article>
  );
}

export default ExerciseCard;
