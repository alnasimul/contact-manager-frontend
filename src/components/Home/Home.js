import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Layout from "../Layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import contactManagerApi from "../../helpers/contactManagerApi";
import SingleContact from "./SingleContact/SingleContact";
import { CheckBoxOutlined, FileDownload, Restore, Undo } from "@mui/icons-material";
import { ButtonGroup } from "@mui/material";

const Home = () => {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [multipleCheckbox, setMultipleCheckbox] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([])


  const getSearchResult = (searchTerm) => {
    setSearch(searchTerm);
  };

  const getCompanies = (data) => {
    // removing duplicate value from an array of objects ----

    const companies = data.map((o) => o.company);
    const filtered = companies.filter(
      ({ company }, index) => !companies.includes(company, index + 1)
    );
    const uniqueCompanies = [...new Set(filtered)];

    setCompanies(uniqueCompanies);

    // ------
  };

  useEffect(() => {
    // if (shouldLog.current) {
    //   shouldLog.current = false;
    //   console.log("useEffect");
      contactManagerApi
        .get(`/loadContactsBySearch?search=${search}`)
        .then((res) => {
          if (res.data) {
            setContacts(res.data);
          } else {
            toast("No contact found");
          }
        });
   // }
  }, [search]);


  useEffect(() => {
    // if (shouldLog.current) {
    // shouldLog.current = false;
    // console.log("useEffect");
    contactManagerApi.get(`/loadContact`).then((res) => {
      setContacts(res.data);
      getCompanies(res.data);
    });
    // }
  }, []);



 // const shouldLog = useRef(true);

  const backupContacts = () => {
    contactManagerApi.get(`/backupContacts`).then((res) => {
      if (res.data) {
        alert("All conatcts backuped successfully");
      }
    });
  };

  const restoreContacts = () => {
    contactManagerApi.get(`/restoreContacts`).then((res) => {
      if (res.data) {
        alert("All contacts restored successfully");
      }
    });
  };

  const getContactsBySeclectedCompany = (company) => {
    contactManagerApi
      .get(`/getContactBySelectedCompany?company=${company}`)
      .then((res) => setContacts(res.data));
  };

  const setContactsByCompany = (company, numbers) => {

    getContactsBySeclectedCompany(company);

    let filteredContacts = numbers.filter(
      (contact) => contact.company === company
    );


    setContacts(filteredContacts);
  };

 const deleteContacts = () => {
  if(selectedContacts.length > 0) {
    if(window.confirm(`Are you sure want to delete the selected ${selectedContacts.length} contacts?`)){
      deleteMultipleContacts(selectedContacts)
     }
  }else{
    toast.error("No contact selected ⚠️")
  }
 }

  const deleteMultipleContacts = () => {
    contactManagerApi.delete(`/deleteMultipleContacts/${[...selectedContacts]}`)
    .then( res => {
      if(res.data){
        toast("Contacts deleted successfully")
        setTimeout(() => {
          window.location.reload()
        },3000)
      }
    })
  }

  const getId = (id, checked) => {
    if(checked){
     setSelectedContacts([ ...selectedContacts, id])
    }else {
      setSelectedContacts(selectedContacts.filter( el => el!== id))
    }
  }
 
 console.log(selectedContacts,"selectedContacts")

  
  return (
    <Layout getSearchResult={getSearchResult}>
      <ToastContainer />
      <div className="d-flex align-items-center mt-3">
        <div className=" mx-2">
          <PopupState variant="popover" popupId="demo-popup-menu">
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
                  {companies.map((company, index) => (
                    <MenuItem
                      onClick={() => {
                        popupState.close();
                        setContactsByCompany(company, contacts);
                      }}
                      key={index}
                    >
                      {company}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </PopupState>
        </div>
        <div>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            className="ms-auto"
          >
            <Button className="" onClick={backupContacts}>
              <FileDownload />
              Backup
            </Button>
            <Button onClick={restoreContacts}>
              <Restore />
              Restore
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="m-5 p-3">
        {multipleCheckbox ? <Button variant="outlined" onClick={() => setMultipleCheckbox(false)}> <Undo className="mx-2 mb-1"/> Undo Mulitiple</Button> : <Button variant="outlined" onClick={() => setMultipleCheckbox(true)}> <CheckBoxOutlined className="mx-2 mb-1"/> Select Multiple</Button> }
        {multipleCheckbox && <Button variant="contained" className="mx-2" onClick= {deleteContacts}> {selectedContacts.length} DELETE </Button>}
        {contacts.map((contact) => (
          <SingleContact contact={contact} key={contact._id} multipleCheckbox={multipleCheckbox} getId = {getId} ></SingleContact>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
