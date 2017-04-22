import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
  Meteor.publish('comments', function () {
    return Comments.find({ userId: this.userId });
  });
}

Meteor.methods({
  'comments.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }


    Comments.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null,
    });
  },
  'comments.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }



    Comments.update({
      _id,
      userId: this.userId
    }, {
      $set: { visible }
    });
  },
  'comments.trackVisit'(_id) {


    Comments.update({ _id }, {
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    })
  }
});
