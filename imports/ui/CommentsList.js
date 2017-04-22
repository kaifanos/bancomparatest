import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Comments } from '../api/comments';
import CommentsListItem from './CommentsListItem';

export default class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount() {
    console.log('componentDidMount CommentsList');
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Comments.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({ links });
    });
  }
  componentWillUnmount() {
    console.log('componentWillUnmount CommentsList');
    this.linksTracker.stop();
  }
  renderLinksListItems() {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No existen comentarios todavia.</p>
        </div>
      );
    }

    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <CommentsListItem key={link._id} shortUrl={shortUrl} {...link}/>;
    });
  }
  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
};
