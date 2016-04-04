import React from 'react';
console.log(React);
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

  var CommentBox = React.createClass({
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
          <CommentList  data={this.state.data} />
          <CommentForm />
        </div>
      );
    }
  });
  React.render(
    <CommentBox />,
    document.getElementById('comment')
  );
