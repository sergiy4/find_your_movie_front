import { Collection } from '../types';
import useAuth from '../../auth/hooks/useAuth';
import DeleteButton from './DeleteCollectionButton';
import { useNavigate } from 'react-router-dom';

const CollectionItem = ({ name, _id, userID }: Collection) => {
  const navigate = useNavigate();
  const { userID: user } = useAuth();
  const isUserOwner = user === userID ? true : false;
  console.log(user);
  console.log(userID);
  console.log(isUserOwner);
  return (
    <>
      <section onClick={() => navigate(`/collections/${_id}`)}>
        <p>{name}</p>
        {isUserOwner ? <DeleteButton id={_id} key={_id} /> : null}
      </section>
    </>
  );
};

export default CollectionItem;
