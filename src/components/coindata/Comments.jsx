"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  Tabs,
  Tab,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Modal from "@mui/material/Modal";
import { Provider } from "react-redux";
import PumpStore from "@/store/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "next/navigation";
import uploadImageToPinata from "@/utils/uploadImageToPinata";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#1B1D28",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "100vh",
};

const Comments = () => {
  return (
    <Provider store={PumpStore}>
      <ShowComments />
    </Provider>
  );
};

const ShowComments = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  let user = useSelector((store) => store.user.user);
  console.log(user, "========================");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const userOptionalImg = useRef();
  let userComment = useRef();
  let params = useParams();
  let [NewComments, setNewComments] = useState([]);
  let CommentsData = new FormData();
  let colors = [
    "blue",
    "black",
    "red",
    "green",
    "purple",
    "orange",
    "pink",
    "yellow",
  ];
  let colorBox = useRef();
  let [mainReplyId, setmainReplyId] = useState("0");
  let [replyidValue, setreplyidValue] = useState();
  let [TokenDetails, setTokenDetails] = useState({});

  useEffect(() => {
    axios
      .post("/api/WhichToken", { tokenAddress: params.TAdress })
      .then((resp) => {
        setTokenDetails(resp.data.TokenDetail);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post("/api/Allcommentshow", { tokenAddress: params.TAdress })
      .then((resp) => {
        setNewComments(resp.data.Newdata.allComments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function CommentsAdders(replyID) {
    if (user.walletAddress) {
      let imgUrl;

      if (userOptionalImg.current.value) {
        const OptionalImageData = new FormData();
        OptionalImageData.append("file", userOptionalImg.current.files[0]);

        const IpfsHash = await uploadImageToPinata(OptionalImageData);
        if (!IpfsHash) {
          toast.error("Failed to upload file.");
          return;
        }

        imgUrl = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;
      } else {
        imgUrl = undefined;
      }

      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const currentTime = `${hours}:${minutes}:${seconds}`;
      // let userComments = userComment.current.value.slice(11)

      CommentsData.append("userName", user?.name);
      CommentsData.append("userImage", user?.image);
      CommentsData.append("userOptImage", imgUrl || "");
      CommentsData.append("mainComment", userComment.current.value);
      CommentsData.append("time", String(currentTime));
      CommentsData.append("Tokenaddress", params.TAdress);
      CommentsData.append("replyID", replyID);
      CommentsData.append("userID", user.userId);

      axios
        .post("/api/NewComments", CommentsData)
        .then((resp) => {
          if (resp.data.success) {
            setOpen2(false);
            setOpen(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      setTimeout(() => {
        axios
          .post("/api/Allcommentshow", { tokenAddress: params.TAdress })
          .then((resp) => {
            setNewComments(resp.data.Newdata.allComments);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 1000);
    } else {
      alert("Plz connect your wallet");
    }
  }

  function LikesAdders(commentID, index) {
    if (user.walletAddress) {
      colorBox.current.children[index].classList.add("animationDivHeard");

      setTimeout(() => {
        colorBox.current.children[index].classList.remove("animationDivHeard");
      }, 1000);

      axios
        .post("/api/Likes", {
          tokenAddress: params.TAdress,
          userId: user._id,
          commentID: commentID,
        })
        .then((resp) => {})
        .catch((error) => {
          console.log(error);
        });

      setTimeout(() => {
        axios
          .post("/api/Allcommentshow", { tokenAddress: params.TAdress })
          .then((resp) => {
            setNewComments(resp.data.Newdata.allComments);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 1000);
    } else {
      alert("Plz Connect your wallet");
    }
  }

  function checkCommentedReply(replyID) {
    NewComments.find((data, index) => {
      if (data._id.toLowerCase() === replyID.toLowerCase()) {
        colorBox.current.children[index].style.background =
          "rgba(0, 183, 255, 0.411)";
      } else {
        colorBox.current.children[index].style.background = "#1B1D28"; // Reset others to default
      }
    });
  }

  const formattedDate = new Date(TokenDetails.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Ensures 12-hour format
  });
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#2E303A",
        color: "#9BA2AE",
        borderRadius: "10px",
        padding: 2,
      }}
    >
      <Button
        variant="contained"
        sx={{ marginBottom: 2, background: "transparent" }}
        onClick={() => console.log(NewComments)}
      >
        Scroll to bottom
      </Button>

      {/* Main Post */}
      <Box
        sx={{
          display: "flex",
          marginBottom: 2,
          padding: 2,
          backgroundColor: "#1B1D28",
          borderRadius: "10px",
        }}
      >
        <Avatar
          src={TokenDetails?.file}
          sx={{ width: 56, height: 56, marginRight: 2 }}
        />
        <Box>
          <Typography variant="body1">
            {TokenDetails?.name} (ticker:{TokenDetails?.ticker})
          </Typography>
          <Typography variant="caption" color="gray">
            {TokenDetails.userName} (dev) - {formattedDate}
          </Typography>
        </Box>
      </Box>

      {/* Thread List */}
      <List ref={colorBox}>
        {NewComments.map((item, index) => {
          let likesColor = item.likes.find((likesData) => {
            if (likesData.userid == user._id) {
              return likesData;
            }
          });
          return (
            <Box
              key={index}
              sx={{
                height: "100px",
                backgroundColor: "#2E303A",
                borderRadius: "10px",
                marginTop: "10px",
                border: "4px solid #1B1D28",
                backgroundColor: "#1B1D28",
                height: "auto",
              }}
            >
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "8px",
                  marginBottom: 1,
                  padding: 1,
                  color: "#9BA2AE",
                }}
              >
                <img
                  style={{ width: 20, height: 20, marginRight: 5 }}
                  src={
                    item.userImg ||
                    "https://pump.mypinata.cloud/ipfs/QmeSzchzEPqCU1jwTnsipwcBAeH7S4bmVvFGfF65iA1BY1?img-width=16&img-dpr=2&img-onerror=redirect"
                  }
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2">{item.user}</Typography>
                  <Typography variant="body2"></Typography>
                  <Typography variant="caption" color="gray">
                    <span
                      style={{
                        background: colors[Math.floor(Math.random() * 8)],
                        color: "white",
                        padding: 3,
                        borderRadius: "5px",
                      }}
                    >
                      {String(item?.userID).slice(-8)}
                    </span>{" "}
                    | {item.time} |{" "}
                    <Button onClick={handleOpen}>
                      <span
                        style={{
                          color: "#9BA2AE",
                          fontSize: "0.8em",
                          padding: "10px 5px 10px 0",
                        }}
                        onClick={() => {
                          setmainReplyId(item._id);
                          setreplyidValue("#" + item._id.substring(0, 9) + " ");
                        }}
                      >
                        #{item._id.substring(0, 9)}{" "}
                        <span style={{ color: "blue", fontSize: "1.2em" }}>
                          reply
                        </span>
                      </span>
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography variant="h3" sx={{ paddingBottom: "20px" }}>
                          Add a Reply
                        </Typography>
                        <input
                          value={replyidValue}
                          onChange={(e) => setreplyidValue(e.target.value)}
                          ref={userComment}
                          type="text"
                          style={{
                            color: "white",
                            fontSize: "1.3em",
                            width: "100%",
                            height: "100px",
                            margin: "20px,0,0,0",
                            background: "#2A2A3B",
                            border: "1px solid white",
                            borderRadius: "10px",
                            fontSize: ".9em",
                          }}
                          className="WhitePlaceholder"
                          required
                        />
                        <Typography variant="h5" sx={{ paddingTop: "20px" }}>
                          Image (optional)
                        </Typography>
                        <Box
                          sx={{
                            width: "60%",
                            height: "200px",
                            margin: "auto",
                            border: "2px dotted white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "20px",
                            fontSize: "1.2em",
                            color: "white",
                            background: "#050608",
                            borderRadius: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          Drag & Drop
                        </Box>
                        <input
                          ref={userOptionalImg}
                          type="file"
                          style={{
                            color: "white",
                            fontSize: "1.1em",
                            width: "100%",
                            padding: "10px",
                            background: "#2A2A3B",
                            border: "1px solid white",
                            borderRadius: "10px",
                          }}
                        />
                        <Button
                          sx={{
                            width: "100%",
                            padding: "5px 0",
                            background: "blue",
                            color: "white",
                            marginTop: "40px",
                          }}
                          onClick={() => CommentsAdders(mainReplyId)}
                        >
                          post reply
                        </Button>
                        <Button
                          sx={{
                            width: "100%",
                            padding: "5px 0",
                            background: "transparent",
                            color: "white",
                            marginTop: "10px",
                          }}
                          onClick={handleClose}
                        >
                          [cancle]
                        </Button>
                      </Box>
                    </Modal>
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  sx={{ color: likesColor ? "red" : "#9BA2AE" }}
                  onClick={() => LikesAdders(item._id, index)}
                >
                  <FavoriteIcon fontSize="small" />
                </IconButton>
                <Typography
                  variant="caption"
                  sx={{ marginRight: 2, color: "white" }}
                >
                  {item.likes.length}
                </Typography>
              </ListItem>
              <Box sx={{ display: "flex" }}>
                {item.optionalImage ? (
                  <img
                    src={item.optionalImage}
                    width={200}
                    style={{ position: "relative", top: "-18px" }}
                  />
                ) : null}
                <Box
                  sx={{
                    ml: "10px",
                    position: "relative",
                    top: "-18px",
                    fontSize: ".9em",
                  }}
                >
                  <span
                    style={{
                      color: "blue",
                      fontWeight: "800",
                      fontSize: "1.2em",
                      margin: "0 20px 0 0",
                      cursor: "pointer",
                    }}
                    onClick={() => checkCommentedReply(item.reply)}
                  >
                    {item.reply.length == 24
                      ? "#" + item.reply.substring(0, 9)
                      : null}
                  </span>
                  {item.mainComment}
                </Box>
              </Box>
            </Box>
          );
        })}
      </List>

      <Button
        sx={{ margin: "auto", display: "block", color: "white" }}
        onClick={handleOpen2}
      >
        [Post A Comment]
      </Button>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h3" sx={{ paddingBottom: "20px" }}>
            Add a Comment
          </Typography>
          <input
            ref={userComment}
            type="text"
            style={{
              color: "white",
              fontSize: "1.3em",
              width: "100%",
              height: "100px",
              margin: "20px,0,0,0",
              background: "#2A2A3B",
              border: "1px solid white",
              borderRadius: "10px",
            }}
          />
          <Typography variant="h5" sx={{ paddingTop: "20px" }}>
            Image (optional)
          </Typography>
          <Box
            sx={{
              width: "60%",
              height: "200px",
              margin: "auto",
              border: "2px dotted white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              fontSize: "1.2em",
              color: "white",
              background: "#050608",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            Drag & Drop
          </Box>
          <input
            ref={userOptionalImg}
            type="file"
            style={{
              color: "white",
              fontSize: "1.1em",
              width: "100%",
              padding: "10px",
              background: "#2A2A3B",
              border: "1px solid white",
              borderRadius: "10px",
            }}
          />
          <Button
            sx={{
              width: "100%",
              padding: "5px 0",
              background: "blue",
              color: "white",
              marginTop: "40px",
            }}
            onClick={CommentsAdders}
          >
            post comment
          </Button>
          <Button
            sx={{
              width: "100%",
              padding: "5px 0",
              background: "transparent",
              color: "white",
              marginTop: "10px",
            }}
            onClick={handleClose2}
          >
            [cancle]
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Comments;
