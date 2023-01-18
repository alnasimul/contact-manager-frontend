import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import Modal from "../../Modal/Modal";
import UpdateContactForm from "../../UpdateContactForm/UpdateContactForm";
import contactManagerApi from "../../../helpers/contactManagerApi";
import { toast } from "react-toastify";
const SingleContact = ({ contact }) => {
  const [expanded, setExpanded] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { _id, name, email, numbers, company, home } = contact;

  console.log(numbers);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const deleteContact = () => {
    if(window.confirm(`Are you sure to delete ${name} from contact list`)){
        contactManagerApi.delete(`/deleteContact/${_id}`)
        .then(res => {
            if(res.data){
                toast("Contact deleted successfully 🤙🏻")
                setTimeout( ()=> {
                    window.location.reload();
                },3000)
            }
        })
    }
  }

  return (
    <div className="p-3">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            sx={{ width: "82%", color: "text.secondary", flexShrink: 0 }}
          >
            <h2 className="m-5">
              {" "}
              <i class="fas fa-user fa-fw me-2"></i> {name}
            </h2>
          </Typography>
          <Typography className="m-3" sx={{ color: "text.secondary" }}>
            {numbers.map((number, index) => (
              <ul className="list-group w-100">
                <li className="list-group-item mb-2" key={index}>
                  <i class="fas fa-mobile fa-fw me-4"></i>
                  {number.value}
                </li>
              </ul>
            ))}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="d-flex align-items-center justify-content-between">
            <div className="mx-5">
              <h6>
                <i class="fas fa-user fa-fw me-2"></i> {name}
              </h6>
              {email && (
                <h6>
                  <i class="fas fa-envelope-open-text fa-fw me-2"></i>
                  {email}
                </h6>
              )}
              {company && (
                <h6>
                  {" "}
                  <i class="fas fa-building fa-fw me-2"></i>
                  {company}
                </h6>
              )}
              {home && (
                <h6>
                  {" "}
                  <i class="fas fa-home fa-fw me-2"></i>
                  {home}
                </h6>
              )}
            </div>
            <div>
              <Button color="secondary"  onClick={openModal}>
                <i class="fas fa-pen"></i>
              </Button>{" "}
              <Button color="secondary" onClick={deleteContact}>
                <i class="fas fa-trash"></i> 
              </Button>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}><UpdateContactForm contact={contact} edit={true} closeModal={closeModal}/></Modal>
    </div>
  );
};

export default SingleContact;
