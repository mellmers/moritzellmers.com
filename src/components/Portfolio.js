import React, { PropTypes } from 'react';
import Base from './Base';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getProjects } from '../actions/projects';

import './../stylesheets/components/portfolio.scss';

class Portfolio extends Base {

    componentDidMount() {
        getProjects();
        this.renderPortfolio();
    }

    componentDidUpdate(prevProps, prevState) {
        this.renderPortfolio();
    }

    renderPortfolio() {
        let self = this;
        let projects = this.props.projects;
        let items = [];
        if(projects) {
            projects.forEach(function (project) {
                items.push(
                    {
                        title: project.title,
                        description: project.description,
                        thumbnail: [project.thumbnail],
                        large: [project.media.link],
                        button_list: [
                            {title: self.context.intl.formatMessage({id: "components.portfolio.details"}), url: '#'}
                        ],
                        tags: [project.category.name]
                    }
                );
            });
            console.log(items)
            $("#elastic-grid-portfolio").elastic_grid({
                items: items
            });
        }
    }

    render() {
        console.log(this.props.projects);
        let self = this;
        let projects = [];
        if(this.props.projects) {
            this.props.projects.forEach(function (project) {
                projects.push(
                    <img key={project.id} className="img-responsive" src={project.thumbnail}/>
                );
            });
        } else {
            projects.push(<div key="loading-spinner">this.renderLoadingSpinner()</div>);
        }
        return (
            <section id={this.context.intl.formatMessage({id: "route.portfolio"})} className="container portfolio">
                <div id="elastic-grid-portfolio"></div>
            </section>
        );
    }
}

Portfolio.contextTypes = {
    intl: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        projects: state.data.lists.projects
    }
}
export default connect(mapStateToProps)(Portfolio);