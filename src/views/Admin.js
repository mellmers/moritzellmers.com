import React from 'react';
import Base from './../components/Base';
import { connect } from 'react-redux';
import { FormattedDate } from 'react-intl';

var serialize = require('form-serialize');

import { createProject, deleteProject, getProjects, updateProject } from '../actions/projects';

import './../stylesheets/views/admin.scss';

export default class Admin extends Base {

    constructor(props, context) {
        super(props, context);
        this.state = { view: "all" };
    }

    componentWillMount() {
        getProjects();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.view === "edit") {
            let self = this;
            $('#edit-form').validator().on('submit', function (e) {
                if (!e.isDefaultPrevented()) {
                    e.preventDefault();
                    let formData = serialize(document.querySelector("#edit-form"), { hash: true });
                    self.props.dispatch(updateProject(formData)).then(function (response) {
                        if(response.id) {
                            self.changeView("all");
                        }
                    });
                }
            });
        }
    }

    changeView(view, currentProject) {
        if(view !== "edit") {
            $('#edit-form').validator().off('submit');
        }
        this.setState({
            view: view,
            currentProject: currentProject
        });
    }

    create() {

        return (
            <div className="create-view">
                <h3>Neues Projekt erstellen</h3>

                <a className="btn btn-primary" onClick={this.changeView.bind(this, "all")}>Alle anzeigen</a>
            </div>
        );
    }

    delete() {
        let project = this.state.currentProject;
        return (
            <div className="delete-view">
                <h3>Projekt löschen</h3>

                <a className="btn btn-primary" onClick={this.changeView.bind(this, "create")}>Neues Projekt erstellen</a>
                <a className="btn btn-primary" onClick={this.changeView.bind(this, "all")}>Alle anzeigen</a>

                <h2>Projekt "{project.title}" wirklich löschen?</h2>
                <a className="btn btn-danger btn-raised" onClick={this.onDeleteClick.bind(this, project.id)}>Ja</a>
                <a className="btn btn-default btn-raised" onClick={this.changeView.bind(this, "all")}>Nein</a>
            </div>
        );
    }

    edit() {
        let project = this.state.currentProject;

        return (
            <div className="edit-view">
                <h3>Bearbeitungsansicht</h3>

                <a className="btn btn-primary" onClick={this.changeView.bind(this, "create")}>Neues Projekt erstellen</a>
                <a className="btn btn-primary" onClick={this.changeView.bind(this, "all")}>Alle anzeigen</a>

                <form id="edit-form"
                      role="form"
                      data-toggle="validator">
                    <input
                        type="text"
                        id="idInput"
                        name="id"
                        className="hidden"
                        value={project.id}
                        readOnly="true"
                    />
                    <div className="form-group label-floating">
                        <label className="control-label" for="title">Titel</label>
                        <input
                            type="text"
                            id="titleInput"
                            name="title"
                            className="form-control"
                            defaultValue={project.title}
                            maxLength={255}
                        />
                    </div>
                    <div className="form-group label-floating">
                        <label className="control-label" for="title">Beschreibung</label>
                        <input
                            type="textarea"
                            id="descriptionInput"
                            name="description"
                            className="form-control"
                            defaultValue={project.description}
                            maxLength={21844}
                            rows="4"
                        />
                    </div>
                    <div className="form-group label-floating">
                        <label className="control-label" for="title">Category</label>
                        <select
                            name="categoryId"
                            className="form-control"
                        >
                            <option value="1">Audio</option>
                            <option value="2">Video</option>
                        </select>
                    </div>
                    <button className="btn btn-primary">Speichern <i className="material-icons">&#xE161;</i></button>
                    <a className="btn btn-primary" onClick={this.changeView.bind(this, "all")}>Abbrechen</a>
                </form>
            </div>
        );
    }

    onDeleteClick(id) {
        this.props.dispatch(deleteProject({id: id}));
    }

    single() {
        let project = this.state.currentProject;

        return (
            <div className="single-view">
                <h3>Detailansicht</h3>

                <a className="btn btn-primary" onClick={this.changeView.bind(this, "create")}>Neues Projekt erstellen</a>
                <a className="btn btn-primary" onClick={this.changeView.bind(this, "all")}>Alle anzeigen</a>

                <div className="row">
                    <div className="col-sm-3">
                        Titel
                    </div>
                    <div className="col-sm-9">
                        <div>{project.title}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        Beschreibung
                    </div>
                    <div className="col-sm-9">
                        <div>{project.description}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        Erstellt am
                    </div>
                    <div className="col-sm-9">
                        <FormattedDate value={new Date(project.createdAt*1000)}
                                       year='numeric'
                                       month='long'
                                       day='2-digit'  />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        Kategorie
                    </div>
                    <div className="col-sm-9">
                        <div>{project.category.name}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        Mediumtitel
                    </div>
                    <div className="col-sm-9">
                        <div>{project.medium.title}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        Mediumlink
                    </div>
                    <div className="col-sm-9">
                        <div>{project.medium.link}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-offset-3 col-sm-9">
                        <a className="btn btn-primary" onClick={this.changeView.bind(this, "edit", project)}>Bearbeiten <i className="material-icons">&#xE254;</i></a>
                    </div>
                </div>
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
                        <td>{project.medium.title}</td>
                        <td>{project.medium.link}</td>
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
            <table className="table table-striped show-all-view">
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
                content = this.edit();
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