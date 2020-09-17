import React, {Component} from 'react';

import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComp, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res => res, e => {
                this.setState({error: e});
            } );
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            }));
            axios.interceptors.response.eject(axios.interceptors.response.use(res => res, e => {
                this.setState({error: e});
            }));
        }
        errorConfirmed = () => {
            this.setState({error: null});
        }   
        render() {
            return(
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.state.errorConfirmed}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComp {...this.props} />
                </Aux>
                );
        }
    } 
}

export default withErrorHandler;