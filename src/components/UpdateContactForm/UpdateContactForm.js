import { Button, TextField } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EdgesensorLowIcon from "@mui/icons-material/EdgesensorLow";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import contactManagerApi from "../../helpers/contactManagerApi";
import { toast } from "react-toastify";
import { Edit } from "@mui/icons-material";

const UpdateContactForm = ({ contact, closeModal }) => {
  const {
    register,
    control,
    resetField,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { fields, append, prepend, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "numbers", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const { _id, name, email, numbers, company, home } = contact;

  const [data, setData] = useState("");

  // new way to render useEffect once in react 18 version ---------

  const shouldLog = useRef(true)
  
  useEffect(() => {
    if(shouldLog.current){
        shouldLog.current = false
        prepend(numbers);
    }
    },[]);

   // ------------

  const onSubmit = (formdata) => {
    const { contactNo, data, ...rest } = formdata;
    const filteredData = { ...rest };
    console.log({ ...rest }, "rest");
    console.log("submitted");
    if (filteredData.numbers.length > 0) {
      try {
        contactManagerApi.patch(`/updateContact/${_id}`, filteredData).then((res) => {
          if (res.data) {
            alert("data updated successfully");
               closeModal();
               window.location.reload();
          }
        });
      } catch (error) {}
    } else {
      toast.error("No number added ⚠️");
    }
  };

  const clearFiled = () => resetField("contactNo");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex align-items-center">
        <AssignmentIndIcon className="mx-3 mt-1" color="secondary" />
        <TextField
          {...register("name", { required: true })}
          placeholder="Name"
          id="filled-hidden-label-small"
          variant="standard"
          className="my-3"
          defaultValue={name}
          fullWidth
        />
      </div>
      {errors.name && (
        <span className="text-danger ms-5">This field is required</span>
      )}
      <div className="d-flex align-items-center">
        <EdgesensorLowIcon className="mx-3 mt-1" color="secondary" />
        <TextField
          {...register("contactNo")}
          placeholder="Contact No"
          id="filled-hidden-label-small"
          className="my-3"
          variant="standard"
          fullWidth
        />
        <Button
          onClick={() => {
            append({ value: getValues("contactNo")  })
           clearFiled()}
        }
          className=""
        >
          <AddIcon className="mx-2 mt-4" color="secondary" />
        </Button>
      </div>
      <div>
      </div>

      {fields.length > 0 && (
        <div className="ms-5 my-3">
          {fields.map((data, index) => (
            <div className="d-flex align-items-center">
              <span className="me-3">{index + 1}.</span>
              <TextField
                value={data.value}
                key={index}
                variant="standard"
                {...register(`contactNo.${index}.value`)}
              />
              <ClearIcon
                onClick={() => remove(index)}
                className="mx-3 mt-2"
                color="secondary"
              />
            </div>
          ))}
        </div>
      )}

      <div className="d-flex align-items-center">
        <EmailIcon className="mx-3 mt-1" color="secondary" />
        <TextField
          {...register("email")}
          placeholder="Email"
          id="filled-hidden-label-small"
          className="my-3"
          variant="standard"
          defaultValue={email}
          fullWidth
        />
      </div>
      <div className="d-flex align-items-center">
        <HomeIcon className="mx-3 mt-1" color="secondary" />
        <TextField
          {...register("home")}
          placeholder="Home"
          id="filled-hidden-label-small"
          className="my-3"
          variant="standard"
          defaultValue={home}
          fullWidth
        />
      </div>
      <div className="d-flex align-items-center">
        <ApartmentIcon className="mx-3 mt-1" color="secondary" />
        <TextField
          {...register("company")}
          placeholder="Company"
          id="filled-hidden-label-small"
          className="my-3 "
          variant="standard"
          defaultValue={company}
          fullWidth
        />
      </div>
      <Button
        type="submit"
        className="my-3 ms-3"
        variant="contained"
        color="secondary"
      >
        <Edit className="mx-2 mb-1" /> <span className="me-4">UPDATE</span>
      </Button>
    </form>
  );
};

export default UpdateContactForm;
