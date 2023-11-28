import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import FirstTabDescription from './FirstTab';
import SecondTabGet from './SecondTab';
import ThirdTabAdd from './ThirdTab';

const Tabs = () => {
  const { scrollYProgress } = useScroll();

  const temporaryx = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  let y = useTransform(temporaryx, [0, 0.4], ['33%', '0%']);
  let y2 = useTransform(temporaryx, [0.2, 0.5], ['66%', '33%']);
  let y3 = useTransform(temporaryx, [0.3, 0.7], ['99%', '66%']);

  return (
    <article className="tabs">
      <section className="tabs_info_content">
        <div className="tab_content">
          {/* FIRST TAB */}
          <motion.div className="first_tab" style={{ y: y }}>
            <FirstTabDescription />
          </motion.div>

          {/* SECOND TAB */}
          <motion.div className="second_tab" style={{ y: y2 }}>
            <SecondTabGet />
          </motion.div>

          {/* THIRD TAB */}
          <motion.div className="third_tab" style={{ y: y3 }}>
            <ThirdTabAdd />
          </motion.div>
        </div>
      </section>
    </article>
  );
};

export default Tabs;
