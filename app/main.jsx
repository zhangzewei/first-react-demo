import React from 'react';
import LikeButton from 'js/anotherAPP/filterBar';
  var Comment = React.createClass({
    render: function() {
      return (
        <div className="comment">
          <h2 className="commentAuthor">
            {this.props.author}
          </h2>
          {this.props.children}
        </div>
      );
    }
  });

  var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function (comment) {
        return (
          <Comment author={comment.author}>
            {comment.text}
          </Comment>
        );
      });
      return (
        <div className="commentList">
          {commentNodes}
        </div>
      );
    }
  });

  var CommentForm = React.createClass({
    handleSubmit: function(e) {
      e.preventDefault();
      var author = this.refs.author.value.trim();
      var text = this.refs.text.value.trim();
      if (!text || !author) {
        return;
      }
      // TODO: send request to the server
      this.props.onCommentSubmit({author: author, text: text});
      this.refs.author.value = '';
      this.refs.text.value = '';
      return;
    },
    render: function() {
      return (
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Your name" ref="author" />
          <input type="text" placeholder="Say something..." ref="text" />
          <input type="submit" value="Post" />
        </form>
      );
    }
  });
  var NoLink = React.createClass({
    getInitialState: function() {
      return {message: 'Hello!'};
    },
    handleChange: function(event) {
      this.setState({message: event.target.value});
    },
    render: function() {
      var message = this.state.message;
      return <input type="text" value={message} onChange={this.handleChange} />;
    }
  });
  var CommentBox = React.createClass({
    handleCommentSubmit: function(comment) {
      var comments = this.state.data;
      var newComments = comments.concat([comment]);
      this.setState({data: newComments});
    },
    getInitialState: function() {
      return {data: []};
    },
    componentDidMount: function() {
      var data = [
        {author: "张泽玮", text: "这是第一个评论"},
        {author: "张泽玮第二次", text: "这是第二个评论"},
        {author: "张泽玮第三次", text: "这是第三个评论"}
      ];
      this.setState({data: data});
    },
    render: function() {
      return (
        <div className="commentBox">
          <h1>Comments</h1>
          <NoLink />
          <CommentList data={this.state.data} />
          <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        </div>
      );
    }
  });
  React.render(
    <CommentBox />,
    document.getElementById('comment')
  );
  React.render(
    <LikeButton />,
    document.getElementById('filter-bar')
  );
