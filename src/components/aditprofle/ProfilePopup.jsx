// ProfilePopup.jsx
import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { useDispatch } from "react-redux";
import { addUser, clearUser } from "@/store/usersSlice";
import axios from "axios";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: "#1a1b1f",
  borderRadius: "12px",
  padding: theme.spacing(3),
  width: "500px",
  maxWidth: "90%",
  color: "white",
}));

// Add the missing ProfileInfo styled component
const ProfileInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "16px",
});

const ProfilePhotoSection = styled(Box)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  marginBottom: "24px",
  gap: "12px",
});

const EditIconWrapper = styled(Box)({
  position: "absolute",
  right: -10,
  bottom: -10,
  backgroundColor: "#1a1b1f",
  borderRadius: "50%",
  padding: "4px",
  cursor: "pointer",
});

const StyledTextField = styled(TextField)({
  marginBottom: "16px",
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.23)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(255, 255, 255, 0.7)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
});

const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  marginTop: "24px",
});

const ProfileEditModal = ({ open, onClose, initialData }) => {
  const user = useSelector((state) => state.user?.user);
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const dispatch = useDispatch();

  const onSave = async () => {
    try {
      const response = await axios.post("/api/save-name-bio", {
        email: user?.email,
        name,
        bio,
      });
      if (response?.data?.success) {

        dispatch(addUser(response?.data?.user));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const [profilePhoto, setProfilePhoto] = useState("/avatar-placeholder.png");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create form data to send the file to the backend
      const formData = new FormData();
      formData.append("file", file);
      formData.append("email", user?.email);

      // Send the file to the backend to upload to IPFS and save the address
      try {
        const response = await axios.post("/api/upload-to-pinata", formData);
        if (response?.data?.success) {
          setProfilePhoto(response?.data?.image); // Update profile photo

          dispatch(addUser(response?.data?.image));
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <StyledModal open={open} onClose={onClose} aria-labelledby="edit-profile">
      <ModalContent>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Edit profile
        </Typography>

        <ProfilePhotoSection>
          <Typography variant="subtitle1">Profile photo</Typography>
          <Box
            component="img"
            src={user?.image}
            alt="Profile"
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              position: "relative",
            }}
          />
          <EditIconWrapper>
            <label htmlFor="upload-photo" style={{ cursor: "pointer" }}>
              <EditIcon sx={{ fontSize: 20 }} />
            </label>
            <input
              id="upload-photo"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </EditIconWrapper>
        </ProfilePhotoSection>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Username
          </Typography>
          <StyledTextField
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Bio
          </Typography>
          <StyledTextField
            fullWidth
            variant="outlined"
            multiline
            rows={2}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            size="small"
          />
        </Box>

        <ButtonContainer>
          <Button
            onClick={onClose}
            sx={{
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            [close]
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1D4ED8",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#1D4ED8",
              },
            }}
            onClick={onSave}
          >
            Save
          </Button>
        </ButtonContainer>
      </ModalContent>
    </StyledModal>
  );
};

const ProfilePopup = ({ openn, onClose }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [somesOpen, setsomesOpen] = useState(true);

  const dispatch = useDispatch();

  const { disconnect } = useDisconnect();
  const { open } = useAppKit();

  const { address } = useAccount();
  const user = useSelector((state) => state.user?.user);

  const handleConnect = async () => {
    try {
      const walletAddress = await open();
      if (walletAddress && user?.email) {
        await axios.post("/api/save-wallet-address", {
          email: user?.email,
          address: walletAddress,
        });
      }
    } catch (error) {
      console.error("Error saving wallet address:", error);
    }
  };

  // Function to handle wallet disconnection
  const handleDisconnect = async () => {

    const dispatched = await disconnect();
    
    setTimeout(() => {
     dispatch(clearUser()); // Clear user data from Redux
      
  
      console.log("Wallet disconnected");

    }, 3000);

  };

  // Conditional handler
  const handleWalletAction = user?.walletAddress
    ? handleDisconnect
    : handleConnect;

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <StyledModal
        open={openn}
        onClose={onClose}
        aria-labelledby="profile-popup"
      >
        <ModalContent>
          <ProfileInfo>
            <Box
              component="img"
              src={user?.image}
              alt="Profile"
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                marginRight: 2,
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">pump</Typography>
              <Typography variant="body2" sx={{ color: "#fff" }}>
                love
              </Typography>
            </Box>
            <Button
              startIcon={<EditIcon />}
              variant="text"
              onClick={handleEditClick}
              sx={{
                color: "white",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": {
                  border: "1px solid rgba(255,255,255,0.3)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Edit profile
            </Button>
          </ProfileInfo>

          <Box
            sx={{
              backgroundColor: "#2a2b2f",
              padding: "12px",
              borderRadius: "8px",
              marginY: 2,
              wordBreak: "break-all",
              fontSize: "14px",
            }}
          >
            {user?.walletAddress}
          </Box>

          <Button
            fullWidth
            sx={{
              color: "#9cd",
              textTransform: "none",
              fontSize: "14px",
              background: "#1D4ED8",
              padding: "15px 30px",
              borderRadius: "50px",
            }}
            onClick={handleWalletAction}
          >
            <Typography variant="h6">
              {user?.walletAddress ? "Disconnect Wallet" : "connect Wallet"}
            </Typography>
          </Button>

          <Button
            fullWidth
            sx={{
              color: "#9cd",
              textTransform: "none",
              fontSize: "14px",
              background: "#1D4ED8",
              padding: "15px 30px",
              borderRadius: "50px",
              mt: "20px",
            }}
          >
            <Typography variant="h6">Widthraw from privy wallet</Typography>
          </Button>

          <Typography
            variant="h4"
            onClick={onClose}
            mt={2}
            textAlign="center"
            sx={{ cursor: "pointer" }}
          >
            [close]
          </Typography>
        </ModalContent>
      </StyledModal>

      <ProfileEditModal
        open={editModalOpen}
        onClose={handleEditClose}
        initialData={{
          username: "pump",
          bio: "love pump",
        }}
      />
    </>
  );
};

export default ProfilePopup;
