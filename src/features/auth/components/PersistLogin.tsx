import { Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRefreshMutation } from '../authApi/authApi';
import usePersist from '../hooks/usePersist';
import { useSelector } from 'react-redux';
import { SelectToken } from '../authApi/authSlice';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import RequireAuth from './RequireAuth';
import HomeLink from '../../../components/HomeLink';

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(SelectToken);
  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      console.log('verify refresh token');

      try {
        await refresh();
        setTrueSuccess(true);
      } catch (err) {
        console.log(err);
      }
    };

    if (!token && persist) verifyRefreshToken();
  }, []);

  let content;

  if (!persist) {
    // persist: no
    // console.log('persist: no');
    content = (
      <RequireAuth>
        <Outlet />
      </RequireAuth>
    );
  } else if (isLoading) {
    content = (
      <section className="pleas_login_page_box">
        <section className="pleas_login_container">
          <h1>LOADING . . . </h1>
        </section>
      </section>
    );
    content = <p>Loading...</p>;
  } else if (isError) {
    // persist: yes
    // token: no

    const errorMessage = getQueryErrorMessage(error);

    content = (
      <section className="pleas_login_page_box">
        <section className="pleas_login_container">
          {errorMessage}
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <p>
              Please <span>login</span> again
            </p>
          </Link>
          <p>OR GO </p>
          <HomeLink />
        </section>
      </section>
    );
  } else if (isSuccess && trueSuccess) {
    // console.log('Success');
    // persist: yes
    // token: yes
    content = (
      <RequireAuth>
        <Outlet />
      </RequireAuth>
    );
  } else if (token && isUninitialized) {
    // console.log('token and un');
    // persist: yes
    // token: no
    content = (
      <RequireAuth>
        <Outlet />
      </RequireAuth>
    );
  }

  return content;
};

export default PersistLogin;
