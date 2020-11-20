import React, {useState, useEffect} from 'react';

import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComp, axios) => {
    return props => {
        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });
        const resInterceptor = axios.interceptors.response.use(res => res, e => {
            setError(e);
        } );

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor]);

        const errorConfirmed = () => {
            setError(null);
        };

            return(
                <Aux>
                    <Modal show={error} modalClosed={errorConfirmed}>
                        {error ? error.message: null}
                    </Modal>
                    <WrappedComp {...props} />
                </Aux>
                );
        }
     
}

export default withErrorHandler;