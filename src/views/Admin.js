import React from 'react';
import Base from './../components/Base';
import { connect } from 'react-redux';
import { FormattedDate } from 'react-intl';

import { deleteProject, getProjects } from '../actions/projects';

import './../stylesheets/views/admin.scss';

export default class Admin extends Base {

    constructor(props, context) {
        super(props, context);
        this.state = { view: "all" };
    }

    componentWillMount() {
        getProjects();
    }

    changeView(view, currentProject) {
        this.setState({
            view: view,
            currentProject: currentProject
        });
    }

    create() {

        return (
            <div className="create">
                <h3>Neues Projekt erstellen</h3>

                <a className="btn btn-primary" onClick={this.changeView.bind(this, "all")}>Alle anzeigen</a>
            </div>
        );
    }

    delete() {
        let project = this.state.currentProject;
        console.log(project)
        return (
            <div className="delete">
                <h3>Projekt löschen</h3>

                <a className="btn btn-primary" onClick={this.changeView.bind(this, "create")}>Neues Projekt erstellen</a>
                <a className="btn btn-primary" onClick={this.changeView.bind(this, "all")}>Alle anzeigen</a>

                <h2>Projekt "{project.title}" wirklich löschen?</h2>
                <a className="btn btn-danger btn-raised" onClick={this.onDeleteClick.bind(this, project.id)}>Ja</a>
                <a className="btn btn-default btn-raised" onClick={this.changeView.bind(this, "all")}>Nein</a>
            </div>
        );
    }

    onDeleteClick() {
        deleteProject("");
    }

    single() {

        return (
            <div className="single">
                <h3>Detailansicht</h3>

                <a className="btn btn-primary" onClick={this.changeView.bind(this, "create")}>Neues Projekt erstellen</a>
                <a className="btn btn-primary" onClick={this.changeView.bind(this, "all")}>Alle anzeigen</a>
            </div>
        );
    }

    showAll() {
        let self = this;
        let { projects } = this.props;
        let rows = [];
        if(projects) {
            projects.forEach(function (project) {
                rows.push(
                    <tr key={project.id}>
                        <td>{project.title}</td>
                        <td className="description">{project.description}</td>
                        <td><FormattedDate value={new Date(project.createdAt*1000)}
                                           year='numeric'
                                           month='long'
                                           day='2-digit'  /></td>
                        <td>{project.category.name}</td>
                        <td>{project.media.title}</td>
                        <td>{project.media.link}</td>
                        <td className="actions">
                            <a className="btn btn-primary" onClick={self.changeView.bind(self, "single", project)}><i className="material-icons">&#xE417;</i></a>
                            <a className="btn btn-primary" onClick={self.changeView.bind(self, "edit", project)}><i className="material-icons">&#xE254;</i></a>
                            <a className="btn btn-primary" onClick={self.changeView.bind(self, "delete", project)}><i className="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                );
            });
        }

        return (
            <table className="table table-striped show-all">
                <thead>
                <tr>
                    <th>Titel</th>
                    <th>Beschreibung</th>
                    <th>Erstellt am</th>
                    <th>Kategorie</th>
                    <th>Medientitel</th>
                    <th>Medienlink</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }

    render() {
        let content = "";
        switch(this.state.view) {
            case "create":
                content = this.create();
                break;
            case "delete":
                content = this.delete();
                break;
            case "edit":
                content = this.showAll();
                break;
            case "single":
                content = this.single();
                break;
            case "all":
            default:
                content = this.showAll();
                break;
        }
        return (
            <div className="view admin container">
                <h1>Adminseite</h1>
                <h2>Projektverwaltung</h2>

                {content}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        projects: state.data.lists.projects
    }
}
export default connect(mapStateToProps)(Admin);