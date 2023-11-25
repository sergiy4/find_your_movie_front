import LoginForm from '../components/LoginForm';
import { MoveTextAnimation } from '../../../utils/anim';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <main className="form_page">
      <section className="form_container">
        <section className="section_form_text">
          <p>log in</p>

          <motion.div className="line_mask">
            <motion.div
              className="wrapper"
              custom={0.01}
              variants={MoveTextAnimation}
              initial="hidden"
              animate="showCantHover"
            >
              <h2>WELCOME</h2>
            </motion.div>
          </motion.div>

          <motion.div className="line_mask">
            <motion.div
              className="wrapper"
              custom={0.03}
              variants={MoveTextAnimation}
              initial="hidden"
              animate="showCantHover"
            >
              <h2>BACK</h2>
            </motion.div>
          </motion.div>
        </section>

        <section className="section_form">
          <LoginForm />
        </section>
      </section>
    </main>
  );
};

export default Login;
