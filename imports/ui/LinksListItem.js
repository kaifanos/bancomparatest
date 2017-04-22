import { Meteor } from 'meteor/meteor';
import React from 'react';
import Clipboard from 'clipboard';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'Like' : 'Likes';
    return <p className="item__message">{this.props.visitedCount} {visitMessage} </p>;
  }
  render() {
    return (

      <div className="item">
        <h2>{this.props.url}</h2>
        <div>
           <img src={this.props.imagenurl} height="200" width="100"/>
          </div>
        {this.renderStats()}
        <button className="button button--pill button--link" onClick={() => Meteor.call('links.trackVisit', this.props._id)}>LIKE</button>

      </div>
    );
  }
};

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number,
  imagenurl: PropTypes.string
};
