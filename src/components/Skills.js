import React, { PropTypes } from 'react';
import Base from './Base';
import { FormattedMessage } from 'react-intl';

import './../stylesheets/components/skills.scss';

class Skills extends Base {

    componentDidMount() {
        $('.skillbar').each(function(){
            $(this).find('.skillbar-bar').animate({
                width: $(this).attr('data-percent')
            },6000);
        });
    }

    render() {
        return (
            <section id={this.context.intl.formatMessage({id: "route.skills"})} className="skills container">
                <h1><FormattedMessage id="components.skills.title" /></h1>
                <div className="skillbar clearfix " data-percent="85%">
                    <div className="skillbar-title" style={{ background: "#e34f26" }}><span>HTML5</span></div>
                    <div className="skillbar-bar" style={{ background: "#ff5127" }}></div>
                    <div className="skill-bar-percent">85%</div>
                </div>
                <div className="skillbar clearfix " data-percent="80%">
                    <div className="skillbar-title" style={{ background: "#2980b9" }}><span>CSS3</span></div>
                    <div className="skillbar-bar" style={{ background: "#3498db" }}></div>
                    <div className="skill-bar-percent">80%</div>
                </div>
                <div className="skillbar clearfix " data-percent="50%">
                    <div className="skillbar-title" style={{ background: "#46465e" }}><span>PHP</span></div>
                    <div className="skillbar-bar" style={{ background: "#5a68a5" }}></div>
                    <div className="skill-bar-percent">50%</div>
                </div>
                <div className="skillbar clearfix " data-percent="70%">
                    <div className="skillbar-title" style={{ background: "#f66700" }}><span>Java</span></div>
                    <div className="skillbar-bar" style={{ background: "#ff852d" }}></div>
                    <div className="skill-bar-percent">70%</div>
                </div>
                <div className="skillbar clearfix " data-percent="55%">
                    <div className="skillbar-title" style={{ background: "#00758f" }}><span>MySql</span></div>
                    <div className="skillbar-bar" style={{ background: "#0099b3" }}></div>
                    <div className="skill-bar-percent">55%</div>
                </div>
                <div className="skillbar clearfix " data-percent="80%">
                    <div className="skillbar-title" style={{ background: "#39c4fb" }}><span>Photoshop</span></div>
                    <div className="skillbar-bar" style={{ background: "#5cdeff" }}></div>
                    <div className="skill-bar-percent">65%</div>
                </div>
                <div className="skillbar clearfix " data-percent="75%">
                    <div className="skillbar-title" style={{ background: "#f47419" }}><span>Illustrator</span></div>
                    <div className="skillbar-bar" style={{ background: "#ff8610" }}></div>
                    <div className="skill-bar-percent">75%</div>
                </div>
                <div className="skillbar clearfix " data-percent="80%">
                    <div className="skillbar-title" style={{ background: "#aa62c3" }}><span>Premiere Pro</span></div>
                    <div className="skillbar-bar" style={{ background: "#c978e2" }}></div>
                    <div className="skill-bar-percent">80%</div>
                </div>
                <div className="skillbar clearfix " data-percent="65%">
                    <div className="skillbar-title" style={{ background: "#7b559b" }}><span>After Effects</span></div>
                    <div className="skillbar-bar" style={{ background: "#a571cb" }}></div>
                    <div className="skill-bar-percent">65%</div>
                </div>
                <div className="skillbar clearfix " data-percent="70%">
                    <div className="skillbar-title" style={{ background: "#232c75" }}><span>Cinema 4D</span></div>
                    <div className="skillbar-bar" style={{ background: "#2a34bb" }}></div>
                    <div className="skill-bar-percent">70%</div>
                </div>
            </section>
        );
    }
}

Skills.contextTypes = {
    intl: PropTypes.object.isRequired
};

export default Skills;