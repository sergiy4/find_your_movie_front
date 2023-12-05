import { useRouteError } from 'react-router-dom';
import HomeLink from './HomeLink';

const ErrorBoundary = () => {
  const error: any = useRouteError();

  return (
    <section className="around_box">
      <section className="error_page_container">
        <section className="error_message">
          <h2>something went wrong</h2>
          <h2>{error.status}</h2>
          <h2>{error.statusText}</h2>

          <p>{error.data}</p>
        </section>
        <section>
          <p>GO TO</p>
          <HomeLink />
        </section>
      </section>
    </section>
  );
};

export default ErrorBoundary;
