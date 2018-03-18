import {Fragment} from "react";
import ReactLoading from 'react-loading';
import {connect} from 'react-redux';

const Loader = ({isFetching}) => (
    <div className="float-loading">
        {
            isFetching && <Fragment>
                <ReactLoading type={'balls'} color={'#000'} width='100px' height='100px'/>
                <h4>Loading article</h4>
            </Fragment>
        }
        <style jsx>
            {
                `
                .float-loading {
                        display: flex;
                        flex-flow: column nowrap;
                        justify-content: center;
                        align-items: center;
                        position: absolute;
                        width: inherit;
                    }
                `
            }
        </style>
    </div>
);

export default connect(({isFetching}) => ({isFetching}))(Loader);