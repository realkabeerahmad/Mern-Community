import { AddAPhoto, AddCircle, CheckCircle } from "@mui/icons-material";
import { Box, IconButton, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import Post from "../../components/Post/Post";
import url from "../../apiCalls/api";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router";
const Community = ({ user }) => {
  const Navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    userId: user ? user._id : "",
    Image: "",
    content: "",
  });
  const [open, setOpen] = useState(false);
  const [_image, setimage] = useState();
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // setimage();
    setOpen(false);
  };
  const handleImage = (e) => {
    setValues({ ...values, Image: e.target.files[0] });
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setimage(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  };
  const addPost = () => {
    setLoading(true);
    if (!user._id) {
      alert("Please Login");
      setLoading(false);
      Navigate("/login");
      return false;
    } else {
      if (values.Image) {
        const storageRef = ref(storage, `files/${values.Image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, values.Image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgresspercent(progress);
          },
          (error) => {
            alert(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                setImgUrl(downloadURL);
                setLoading(false);
              }
            );
          }
        );
        // console.log(imgUrl);
        if (imgUrl === null) {
          return;
        }
      }
      const data = {
        userId: values.userId,
        Image: imgUrl,
        content: values.content,
      };
      axios
        .post(url + "/community/post", data)
        .then((res) => {
          if (res.data.status === "success") {
            fetchPosts();
            setValues({ userId: user ? user._id : "", Image: "", content: "" });
          } else {
            alert(res.data.message);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const fetchPosts = () => {
    axios.get(url + "/community/showAllPosts").then((res) => {
      if (res.data.status === "success") {
        setPosts(res.data.data);
      }
    });
  };
  useEffect(() => {
    fetchPosts();

    return () => {};
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 400,
            display: "flex",
            backgroundColor: "white",
            borderRadius: 2,
            p: 2,
            m: 1,
            boxShadow: "0 2px 4px #0000001a, 0 8px 16px #0000001a",
          }}
        >
          <TextField
            // color="success"
            variant="standard"
            sx={{ width: "100%", mx: 1 }}
            placeholder="Ask Community"
            color="error"
            value={values.content}
            onChange={handleChange("content")}
          />
          <IconButton onClick={handleOpen}>
            <AddAPhoto />
          </IconButton>
          <IconButton
            // color="success"
            // variant="contained"
            // sx={{ ml: -5 }}
            color="error"
            onClick={addPost}
            disabled={!values.content ? true : false}
            loading={loading}
          >
            <AddCircle />
          </IconButton>
        </Box>
        {/* Post */}
        {posts.map((post) => {
          return <Post key={post._id} post={post} user={user} />;
        })}
      </Box>
      <Modal open={open} onClose={handleClose}>
        <div className="add">
          <div className="add-wrapper">
            <div className="add-top-bar">
              <h2>Add Image</h2>
              <i className="fa fa-times" onClick={handleClose}></i>
            </div>
            <div className="add-screen">
              <Box className="add-image" sx={{}}>
                <img src={_image} alt="" />
                <label className="custom-file-upload" htmlFor="image-upload">
                  <AddCircle sx={{ fontSize: 80 }} />
                  <input
                    id="image-upload"
                    type="file"
                    name="image-upload"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleImage}
                  />
                </label>
              </Box>
              <LoadingButton
                color="success"
                fullWidth
                variant="contained"
                sx={{
                  width: "100%",
                  position: "absolute",
                  bottom: 0,
                  fontSize: 18,
                }}
                onClick={handleClose}
                loading={loading}
              >
                <CheckCircle sx={{ mr: 1 }} />
                Done
              </LoadingButton>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Community;
