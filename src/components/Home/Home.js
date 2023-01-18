import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Layout from "../Layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import contactManagerApi from "../../helpers/contactManagerApi";
import SingleContact from "./SingleContact/SingleContact";

const Home = () => {
   
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        contactManagerApi.get(`/loadContact`)
        .then(res => setContacts(res.data))
    },[])
  console.log(contacts)
  return (
    <Layout>
      <ToastContainer />
      <div className="position-absolute top-30 mt-2 start-0 mx-2">
        <PopupState variant="popover" popupId="demo-popup-menu" >
          {(popupState) => (
            <>
              <Button
                variant="contained"
                {...bindTrigger(popupState)}
                color="secondary"
              >
                Company
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>Profile</MenuItem>
                <MenuItem onClick={popupState.close}>My account</MenuItem>
                <MenuItem onClick={popupState.close}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </PopupState>
      </div>
      <div className="m-5 p-3">
            {
                contacts.map(contact => <SingleContact contact={contact} key={contact._id}></SingleContact>)
            }
      </div>
    </Layout>
  );
};

export default Home;
