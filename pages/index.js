import React, {Fragment} from 'react'
import withRedux from "next-redux-wrapper";
import {Col} from "reactstrap";
import fetch from 'node-fetch';

import Menu from "../components/Menu";
import Article from "../components/Article";
import Layout from "../components/Layout";

import makeStore from '../redux/store';
import {selectMenuItem} from "../redux/modules/menuSelected";
import {loadArticle} from "../redux/modules/article";
import {loadMenu} from "../redux/modules/menuItems";
import MenuBurger from "../components/MenuBurger";

if (process.env.NODE_ENV !== 'production') {
    const {whyDidYouUpdate} = require('why-did-you-update');
    whyDidYouUpdate(React)
}

class Index extends React.Component {
    static getInitialProps({store, query, isServer}) {
        if (!isServer) {
            return;
        }

        return fetch(`http://localhost:3000/api/article/${encodeURI(query.id)}?user=${query.user.id}`)
            .then(data => data.json())
            .then(article => {
                store.dispatch(selectMenuItem(article.id));
                store.dispatch(loadArticle(article));
                return article.id;
            })
            .then(id => fetch(`http://localhost:3000/api/menu/${id}?user=${query.user.id}`))
            .then(data => data.json())
            .then(menu => {
                store.dispatch(loadMenu(menu));
            })
    }

    componentWillReceiveProps(nextProps) {
        this.props.selectMenuItem(nextProps.url.query.article || null);
    }

    render() {
        return (
            <Fragment>
                    <MenuBurger/>
                    <Layout>
                        <Col lg={5} className="d-none d-lg-block">
                            <Menu/>
                        </Col>
                        <Col lg={7} md={12}>
                            <Article/>
                        </Col>
                    </Layout>
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    selectMenuItem: id => dispatch(selectMenuItem(id))
});

export default withRedux(makeStore, null, mapDispatchToProps)(Index);
