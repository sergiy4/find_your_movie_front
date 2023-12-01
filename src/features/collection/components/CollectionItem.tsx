import useAuth from '../../auth/hooks/useAuth';
import DeleteButton from './DeleteCollectionButton';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

type CollectionItemProps = {
  name: string;
  _id: string;
  userID: string;
};
const CollectionItem = ({ name, _id, userID }: CollectionItemProps) => {
  const navigate = useNavigate();
  const { userID: user } = useAuth();

  const isUserOwner = user === userID ? true : false;

  return (
    <>
      <motion.article
        onClick={() => navigate(`/collections/${_id}`)}
        whileHover={{ scale: 1.03 }}
        className="collection_card"
        data-testid="collection_card"
      >
        <h2>{name}</h2>
        <section>
          {isUserOwner ? <DeleteButton id={_id} key={_id} /> : null}
        </section>
      </motion.article>
    </>
  );
};

export default CollectionItem;
