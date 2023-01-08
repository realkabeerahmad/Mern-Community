import { Comment, Delete, MoreHoriz, Send, ThumbUp } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import url from "../../apiCalls/api";

const Post = ({ post, user }) => {
  const [comment, setComment] = React.useState({
    userId: user._id,
    _id: post._id,
    content: "",
  });
  const [like, setLike] = React.useState({
    userId: user._id,
    _id: post._id,
  });
  const [Post, setPost] = React.useState(post);
  const [first, setFirst] = React.useState(true);
  const [liked, setLiked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setAcitve] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleActive = () => {
    if (active) {
      setAcitve(false);
    } else {
      setAcitve(true);
    }
  };
  const handleChange = (value) => (e) => {
    setComment({ ...comment, [value]: e.target.value });
  };
  if (post.likes.length > 0 && first) {
    for (let i = 0; i < post.likes.length; i++) {
      if (post.likes[i].userId === user._id) {
        setLiked(true);
        setFirst(false);
        break;
      }
    }
  }
  const addComment = () => {
    if (!user._id) {
      alert("Please Login");
      return false;
    } else {
      axios
        .post(url + "/community/comment", comment)
        .then((res) => {
          if (res.data.status === "success") {
            setPost(res.data.data);
            setComment({ userId: user._id, _id: post._id, content: "" });
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const addLike = () => {
    if (!user._id) {
      alert("Please Login");
      return false;
    } else {
      var uri = "";
      if (liked) {
        uri = "/community/dislike";
        setLiked(false);
      } else {
        uri = "/community/like";
        setLiked(true);
      }
      axios
        .post(url + uri, like)
        .then((res) => {
          if (res.data.status === "success") {
            setPost(res.data.data);
            // setComment({ userId: user._id, _id: post._id, content: "" });
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <Box
        sx={{
          width: 400,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0 2px 4px #0000001a, 0 8px 16px #0000001a",
          contain: "content",
          m: 1,
        }}
      >
        <Box
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            position: "relative",
            borderBottom: "1px solid #cfcfcf",
          }}
        >
          <Box
            sx={{
              width: 35,
              height: 35,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              contain: "content",
              marginRight: "5px",
              backgroundColor: "black",
            }}
          >
            <img
              src={Post.user.Image}
              alt={Post.user._id}
              style={{ height: 35 }}
            />
          </Box>
          <Box sx={{ ml: 1 }}>
            <h4>{Post.user.name}</h4>
            <Box sx={{ fontSize: 14, m: 0, p: 0 }}>
              {Post.createdAt.slice(0, 10)}
            </Box>
          </Box>

          {/* <IconButton
            sx={{ position: "absolute", right: 10 }}
            onClick={handleClick}
          >
            <MoreHoriz />
          </IconButton> */}
        </Box>
        <Box sx={{ p: 1, textAlign: "justify" }}>{Post.content}</Box>
        {Post.Image ? (
          <Box
            sx={{
              width: "100%",
              height: 300,
              contain: "content",
              // borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={Post.Image}
              alt={Post._id}
              style={{
                height: "100%",
              }}
            />
          </Box>
        ) : (
          <></>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 1,
            borderTop: "1px solid #cfcfcf",
          }}
        >
          <Box>{Post.likes_count} Likes</Box>
          <Box>{Post.comments_count} Comments</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            borderTop: "1px solid #cfcfcf",
            borderBottom: "1px solid #cfcfcf",
          }}
        >
          <Button
            sx={{ color: liked ? "#e92e4a" : "grey !important" }}
            onClick={addLike}
          >
            <ThumbUp sx={{ mr: 1, fontSize: 18 }} /> Like
          </Button>
          <Button onClick={handleActive} sx={{ color: "grey !important" }}>
            <Comment sx={{ mr: 1, fontSize: 18 }} /> Comments
          </Button>
        </Box>
        {active ? (
          <>
            {Post.comments.length > 0 ? (
              Post.comments.map((comment) => {
                return (
                  <Box
                    sx={{ p: 1, borderBottom: "1px solid #cfcfcf" }}
                    key={comment._id}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 25,
                          height: 25,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          contain: "content",
                          marginRight: "5px",
                          backgroundColor: "black",
                        }}
                      >
                        <img
                          src={comment.user.Image}
                          alt=""
                          style={{ height: 25 }}
                        />
                      </Box>
                      <Box sx={{ ml: 1 }}>
                        <h5>{comment.user.name}</h5>
                      </Box>
                      <Box sx={{ fontSize: 10, ml: 1 }}>
                        ({comment.createdAt.slice(0, 10)})
                      </Box>
                      {/* <IconButton sx={{ position: "absolute", right: 10 }}>
                        <Delete sx={{ fontSize: 15 }} />
                      </IconButton> */}
                    </Box>
                    <Box sx={{ textAlign: "justify" }}>{comment.content}</Box>
                  </Box>
                );
              })
            ) : (
              <></>
            )}

            <Box
              sx={{
                p: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TextField
                variant="standard"
                sx={{ width: "80%" }}
                color="error"
                placeholder="Add a Comment on this"
                onChange={handleChange("content")}
                value={comment.content}
              />
              <Button
                disabled={!comment.content}
                color="error"
                onClick={addComment}
              >
                <Send />
              </Button>
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
      <Menu open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Delete Post</MenuItem>
      </Menu>
    </>
  );
};

export default Post;
