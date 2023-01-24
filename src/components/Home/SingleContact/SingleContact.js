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
const SingleContact = ({ contact, multipleCheckbox, getId }) => {
  const [expanded, setExpanded] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { _id, name, email, numbers, company, home } = contact;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const deleteContact = () => {
    if (window.confirm(`Are you sure to delete ${name} from contact list`)) {
      contactManagerApi.delete(`/deleteContact/${_id}`).then((res) => {
        if (res.data) {
          toast("Contact deleted successfully 🤙🏻");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });
    }
  };
  const onChange = (e) => {
    if(e.target.checked){
      getId(e.target.value, true)
    }else{
      getId(e.target.value, false)
    }
   // console.log(e.target.value)
  }

  return (
    <div className="w-full row my-5  align-items-center">
      <div className="col-md-1">
        {" "}
        {multipleCheckbox && (
          <input
            type="checkbox"
            className="form-check-input"
            name=""
            value={_id}
            onChange = {onChange}
          />
        )}
      </div>
      <div className="col-md-11">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "80%", color: "text.secondary" }}>
              <h5 className="m-5">
                {" "}
                <i class="fas fa-user fa-fw me-2"></i> {name}
              </h5>
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
                <Button color="secondary" onClick={openModal}>
                  <i class="fas fa-pen"></i>
                </Button>{" "}
                <Button color="secondary" onClick={deleteContact}>
                  <i class="fas fa-trash"></i>
                </Button>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
          <UpdateContactForm
            contact={contact}
            edit={true}
            closeModal={closeModal}
          />
        </Modal>
      </div>
    </div>
  );
};

export default SingleContact;
