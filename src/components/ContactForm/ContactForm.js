import { Button, TextField } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EdgesensorLowIcon from "@mui/icons-material/EdgesensorLow";
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AddIcon from '@mui/icons-material/Add';

import { useForm } from "react-hook-form";
import { useState } from "react";
import contactManagerApi from "../../helpers/contactManagerApi";

const ContactForm = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

 

  const onSubmit = (data) => {

    console.log(data)
    console.log('submitted')
    try {
      contactManagerApi.post(`/insertContact`, data)
      .then(res => {
        if(res.data){
          console.log("data inserted successfully")
        }
      })
    } catch (error) {
      
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex align-items-center">
        <AssignmentIndIcon className="mx-3 mt-1" color="secondary"/>
        <TextField
          {...register("name")}
          placeholder="Name"
          id="filled-hidden-label-small"
          variant="standard"
          className="my-3"
          fullWidth
        />
      </div>
      <div className="d-flex align-items-center">
        <EdgesensorLowIcon className="mx-3 mt-1" color="secondary"/>
        <TextField
          {...register("contactNo")}
          placeholder="Contact No"
          id="filled-hidden-label-small"
          className="my-3"
          variant="standard"
          fullWidth
        />
      </div>
      <div className="d-flex align-items-center">
        <EmailIcon className="mx-3 mt-1" color="secondary"/>
        <TextField
          {...register("email")}
          placeholder="Email"
          id="filled-hidden-label-small"
          className="my-3"
          variant="standard"
          fullWidth
        />
      </div>
      <div className="d-flex align-items-center">
        <HomeIcon className="mx-3 mt-1" color="secondary"/>
        <TextField
          {...register("home")}
          placeholder="Home"
          id="filled-hidden-label-small"
          className="my-3"
          variant="standard"
          fullWidth
        />
      </div>
      <div className="d-flex align-items-center">
        <ApartmentIcon className="mx-3 mt-1" color="secondary"/>
        <TextField
          {...register("company")}
          placeholder="Company"
          id="filled-hidden-label-small"
          className="my-3 "
          variant="standard"
          fullWidth
        />
      </div>
      <Button type="submit" className="my-3 ms-3" variant="contained" color="secondary">
       <AddIcon className="mx-2 mb-1"/> <span className="me-4">ADD</span> 
      </Button>
    </form>
  );
};

export default ContactForm;
