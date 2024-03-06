import React, { useEffect, useState } from "react";
import { Typography, Button, Grid, Alert } from "@mui/material";
import { BsTrash, BsEye } from "react-icons/bs";
import usePut from "../../hooks/usePut.jsx";
import usePost from "../../hooks/usePost.jsx";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import "./style.css";
import DeleteConfirmationModal from "./DeleteConfirmationModal.js";
import LockIcon from "@mui/icons-material/Lock";
import VerifyModal from "./VerifyModal.js";
import Swal from 'sweetalert2'
import axiosLib from 'axios'


import { baseUrl } from "baseUrl";
import LinearProgress from "@mui/material/LinearProgress";

const YourComponent = ({ userData, setShouldReload, shouldReload }) => {
  const [credit2020, setCredit2020] = useState("$");
  const [credit2021, setCredit2021] = useState("$");
  const [note, setNote] = useState("");
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [fileFieldError , setFileFieldError] = useState({})


  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileToDelete, setFileToDelete] = useState("");
  const [fileTODeleteType, setFileToDeleteType] = useState("");
  const [showPre_sign_input, setShowPre_sign_input] = useState(false);
  const [showAmended_input, setshowAmended_input] = useState(false);
  const [showForm_8879_input, setShowForm_8879_input] = useState(false);
  const [showForm_receipt_input, setShowForm_receipt_input] = useState(false);
  const [saveButtonError, setSaveButtonError] = useState("");

  const [fileType, setFileType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //utiltity functions

  const extractNumber = (str) => {
    return parseFloat(str.replace(/[^0-9.-]+/g, ""));
  };

  const scaleProgress = (progressValue) => {
    return Math.min(progressValue * 0.9, 90);
  };

  function getFileNameFromUrl(url) {
    const segments = url.split("/");
    const lastSegment = segments[segments.length - 1];
    const fileName = decodeURIComponent(lastSegment.split("?")[0]);
    return fileName;
  }


  // Use Effects ---------------------------

  useEffect(() => {
    setCredit2020(formatCurrency(userData?.Review_calculation_income_2020));
    setCredit2021(formatCurrency(userData?.Review_calculation_income_2021));
    setNote(userData?.note_for_review_calculation);
  }, []);

  useEffect(() => {
    if (JSON.parse(userData?.pre_signature_document).length == 0) {
      console.log("pre_sing_true");
      setShowPre_sign_input(true);
    }
    if (JSON.parse(userData?.pre_signature_second_document).length == 0) {
      console.log("john_ammend");
      setshowAmended_input(true);
    }
    if (JSON.parse(userData?.pre_signature_third_document).length == 0) {
      console.log("form_8879_true");
      setShowForm_8879_input(true);
    }
    if (JSON.parse(userData?.pre_signature_fourth_document).length == 0) {
      setShowForm_receipt_input(true);
    }
  }, [userData]);

  //API hooks calling
  const {
    data: pre_sign_data,
    loading: pre_sign_loading,
    error: pre_sign_error,
    putData: pre_sign_putData,
  } = usePut("wasabi/uploadFile");
  const {
    data: ammend_data,
    loading: ammend_loading,
    error: ammend_error,
    putData: ammend_putData,
  } = usePut("wasabi/uploadFile");
  const {
    data: form_8879__data,
    loading: form_8879_loading,
    error: form_8879_error,
    putData: form_8879_putData,
  } = usePut("wasabi/uploadFile");
  const {
    data: receiptData,
    loading: receiptLoading,
    error: receiptError,
    putData: receiptPutData,
  } = usePut("wasabi/uploadFile");

  const {
    data: deleteFileData,
    loading: deleteFileLoading,
    error: deleteFileError,
    putData: deletFileMethod,
  } = usePut("wasabi/deleteFile");
  const {
    data: updateUserData,
    loading: updateUserLoading,
    error: updateUserError,
    putData: updateUserHookMethod,
  } = usePut("user/updateUser");

  let {
    data: viewFileData,
    loading: viewFileLoading,
    error: viewFileError,
    postData: viewFilePostHook,
  } = usePost("wasabi/viewFile");

  //----------------------------------------Hanlde Functions  -------------------------------------------------------------------

  const handleOpenModal = (file, type) => {
    setFileToDelete(file);
    setFileToDeleteType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setFileToDelete("");
    setFileToDeleteType("");
    setIsModalOpen(false);
  };

  const formatCurrency = (amount) => {
    if (typeof amount === "string") {
      amount = parseFloat(amount);
    }
    if (!isNaN(amount) && amount) {
      return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
    } else {
      return "$0";
    }
  };
  const handleCredit2020Change = (e) => {
    let value = extractNumber(e.target.value);
    value = formatCurrency(value);
    setCredit2020(value);
  };
  const handleCredit2021Change = (e) => {
    let value = extractNumber(e.target.value);
    value = formatCurrency(value);
    setCredit2021(value);
  };

  const handleCreditSave = async (year) => {
    let payload = {
      id: userData?.id,
    };

    try {
      if (year == 2020) {
        payload.Review_calculation_income_2020 = extractNumber(credit2020);
        payload.Review_calculation_income_2021 = userData?.Review_calculation_income_2021
      } else if (year == 2021) {
        payload.Review_calculation_income_2021 = extractNumber(credit2021);
        payload.Review_calculation_income_2020 = userData?.Review_calculation_income_2020 // sending the other so that we can add them and update final_review_cal_amount
      }

      const response = await updateUserHookMethod(payload);
      if(response.status == 200){
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Credit ${year} Saved Successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setShouldReload(!shouldReload);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNoteSave = async () => {
    let payload = {
      id: userData?.id,
      note_for_review_calculation: note,
    };
    try {
      const response = await updateUserHookMethod(payload);
      if(response.status == 200){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Note Saved Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setShouldReload(!shouldReload);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFileUpload = async (type) => {
    let formData = new FormData();
    if (type === "pre_sign") {
      if(!file1){
        setFileFieldError({})
      setFileFieldError({name : 'file1' , message : "File is missing"})
      return false
      }
      try {
        formData.append("file", file1);
        formData.append("email", userData?.email);
        formData.append("type", type);
        formData.append("id", userData?.id);
        formData.append(
          "previous_array",
          userData?.pre_signature_document
        );

        // Progress tracking during upload
        const config = {
          onUploadProgress: (progressEvent) => {
            const progressPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progressPercent);
          },
          headers: { "content-type": "multipart/form-data" },
        };
        const response = await pre_sign_putData(formData, config);
        setShowPre_sign_input(false);
        if(response.status == 200){
          setShouldReload(!shouldReload);
        }
       
      } catch (err) {
        console.log(err);
      }
    } else if (type === "ammend") {
      if(!file2){
        setFileFieldError({})
        setFileFieldError({name : 'file2' , message : "File is missing"})
        return false
      }
      
      setFileType("ammend");
      try {
        formData.append("file", file2);
        formData.append("email", userData?.email);
        formData.append("type", type);
        formData.append("id", userData?.id);
        formData.append(
          "previous_array",
          userData?.pre_signature_second_document
        );

        // Progress tracking during upload
        const config = {
          onUploadProgress: (progressEvent) => {
            const progressPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progressPercent);
          },
          headers: { "content-type": "multipart/form-data" },
        };
        const response = await ammend_putData(formData, config); // Pass config to putData
        setshowAmended_input(false);
        if(response.status == 200){
          setShouldReload(!shouldReload);
        }
      } catch (err) {
        console.log(err);
      }
    } else if (type === "form_8879") {
      if(!file3){
        setFileFieldError({})
        setFileFieldError({name : 'file3' , message : "Please Select file to proceed"})
      }

      setFileType("form_8879");
      try {
        formData.append("file", file3);
        formData.append("email", userData?.email);
        formData.append("type", type);
        formData.append("id", userData?.id);
        formData.append(
          "previous_array",
          userData?.pre_signature_third_document
        );
        // Progress tracking during upload
        const config = {
          onUploadProgress: (progressEvent) => {
            const progressPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progressPercent);
          },
          headers: { "content-type": "multipart/form-data" },
        };
        const response = await form_8879_putData(formData, config); // Pass config to putData
        setShowForm_8879_input(false);
        setShouldReload(!shouldReload);
      } catch (err) {
        console.log(err);
      }
    } else if (type == "receipt") {
      if(!file4){
        setFileFieldError({})
        setFileFieldError({name : 'file4' , message : "Please Select file to proceed"})
      }
    
      setFileType("receipt");
      try {
        formData.append("file", file4);
        formData.append("email", userData?.email);
        formData.append("type", type);
        formData.append("id", userData?.id);
        formData.append(
          "previous_array",
          userData?.pre_signature_fourth_document
        );
        // Progress tracking during upload
        const config = {
          onUploadProgress: (progressEvent) => {
            const progressPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progressPercent);
          },
          headers: { "content-type": "multipart/form-data" },
        };
        const response = await receiptPutData(formData, config); // Pass config to putData
        setShowForm_receipt_input(false);
        handleFileAddedToReceipts()
        if(response.status == 200){
          setShouldReload(!shouldReload);
        }
        
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleFileDelete = async (file, type) => {
    let payload = {
      type: type,
      uploadedUrl: file,
      id: userData?.id,
      email : userData?.email,
      file : getFileNameFromUrl(file)
    };
    try {
      const result = await deletFileMethod(payload);
      if(result.status == 200){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "File Deleted Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      handleCloseModal();

      setShouldReload(!shouldReload);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileView = async (fileName) => {
    console.log(fileName, "File Nameeeeeeeeeeeeee");
    let payload = {
      fileName: fileName,
      email: userData?.email,
    };
    const response = await viewFilePostHook(payload);
    if (response) {
      if (response?.data?.url) {
        window.open(response?.data?.url, "_blank");
      }
    }
  };

  const handleAddMore = (type) => {
    if (type == "john_pre_sign") {
      setShowPre_sign_input(true);
    } else if (type == "john_ammend") {
      setshowAmended_input(true);
    } else if (type == "form_8879") {
      setShowForm_8879_input(true);
    } else if (type == "receipt") {
      setShowForm_receipt_input(true);
    }
  };

  const handleSaveForm = async () => {
    console.log(JSON.parse(userData?.pre_signature_document).length > 0)
    console.log(JSON.parse(userData?.pre_signature_second_document).length > 0)

    if ((userData?.Review_calculation_income_2020 > 0 || userData?.Review_calculation_income_2021 > 0)
    ) {
      console.log("In this");
    } else {
      setSaveButtonError(
        "You must add at least one credit amount (2020 OR 2021)"
      );
      setTimeout(() => {
        setSaveButtonError("");
      }, 4000);
      return null;
    }
    let payload = {
      id: userData?.id,
      final_review_calculation_amount:
        parseInt(userData?.Review_calculation_income_2020 || '0') +
        parseInt(userData?.Review_calculation_income_2021 || '0'),
      admin_text_return_status: true,
      completed_application : 'true'
    };
    
    let consent = await Swal.fire({
      title: "Do we really want to submit? ",
      text : 'This form will be permanently locked after it is submitted.',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Confirm",
    });
 

    if (consent.isConfirmed) {
      let response = await updateUserHookMethod(payload);
      console.log(response);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You have submitted form successfully",
        showConfirmButton: false,
        timer: 2000
      });
      setShouldReload(!shouldReload);
      if(response.status == 200){
        let responseOfUrl = await axiosLib.get(`https://app.setczone.com/api/user/upload-pre-signature/${userData?.id}`);
        console.log(responseOfUrl)
      }
      setShouldReload(!shouldReload);
    } else {
      return null;
    }
  };

  // if(updateUserData && updateUserData?.status == true){
  //   setShouldReload(!shouldReload)
  // }



  const [showDeleteIcon, setShowDeleteIcon] = useState(false); // State to manage showing delete icon
  const [remainingTime, setRemainingTime] = useState(0); // State to store remaining time
  const [fileAddedTimestamp, setFileAddedTimestamp] = useState(null); // State to store timestamp

 
  useEffect(() => {
    const timestamp = localStorage.getItem('fileAddedTimestamp'); 
    console.log("THis is timestamp" , timestamp)// Get timestamp from localStorage
    if (timestamp) {
      setFileAddedTimestamp(parseInt(timestamp, 10)); // Set fileAddedTimestamp state
      const currentTime = Date.now();
      const difference = currentTime - parseInt(timestamp, 10);
      if (difference < 30000) {
        // If less than 30 seconds has passed since the file was added
        const timeLeft = Math.ceil((30000 - difference) / 1000); // Calculate remaining time in seconds
        setRemainingTime(timeLeft); // Set remainingTime state
        const interval = setInterval(() => {
          const currentTime = Date.now();
          const difference = currentTime - parseInt(timestamp, 10);
          const timeLeft = Math.ceil((30000 - difference) / 1000); // Recalculate remaining time in seconds
          setRemainingTime(timeLeft); // Update remainingTime state every second
          if (timeLeft <= 0) {
            clearInterval(interval); 
            setShowDeleteIcon(false)// Clear interval when remaining time is 0
          }
          else{
            setShowDeleteIcon(true)
          }
        }, 1000); // Update every second
        return () => clearInterval(interval); // Cleanup interval on component unmount
        
      }
    }
  }, [remainingTime]);

  // Function to handle file added to receipts
  const handleFileAddedToReceipts = () => {
    const timestamp = Date.now();
    localStorage.setItem('fileAddedTimestamp', timestamp); // Store timestamp in localStorage
    setFileAddedTimestamp(timestamp); // Set fileAddedTimestamp state
    setRemainingTime(30); 
    setShowDeleteIcon(true)// Reset remaining time to 30 seconds
  };

  return (
    <>
          <DeleteConfirmationModal
            isOpen={isModalOpen}
            onCancel={handleCloseModal}
            deleteFileLoading = {deleteFileLoading}
            onConfirm={() => handleFileDelete(fileToDelete, fileTODeleteType)}
          />
        <div
          id="your-form"
          // className={userData?.admin_text_return_status ? "locked" : ""}
        >
         
          <div style={{ marginBottom: "1%" }}>
            <Typography
              sx={{ fontWeight: "bold", marginBottom: "1%" }}
              variant="h6"
            >
              Amended 2020
            </Typography>

            {showPre_sign_input && (
              <div>
              <div className="mb-3 input-group">
                <input
                  required
                  className="form-control"
                  type="file"
                  id="formFile"
                  accept="application/pdf"
                  onClick={()=>{setFileFieldError({})}}
                  onChange={(e) => { setFile1(e.target.files[0]); setFileFieldError({})
                    }}
                />
               
                
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleFileUpload("pre_sign")}
                  >
                    Upload File
                  </button>
                </div>
                
                
                {pre_sign_loading && <div className="spinner ml-3"></div>}
              </div>
              
              {fileFieldError && fileFieldError.name == 'file1' && (
                   <Typography variant="subtitle1" color="error" gutterBottom>
                   Please select File to proceed
                 </Typography>
              )}
              </div>
            )}

          

            <Grid container col={12}>
              {userData?.pre_signature_document?.length > 0 && (
                <ul className="list-group list-group-icons">
                  {JSON.parse(userData?.pre_signature_document).map(
                    (file, index) => (
                      <li
                        key={index}
                        className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center p-2"
                      >
                        <FolderIcon sx={{ marginRight: "6px" }} />
                        {getFileNameFromUrl(file)}
                        <div className="d-flex bg-white">
                          <BsTrash
                            className="text-danger "
                            onClick={() => handleOpenModal(file, "pre_sign")
                             
                            }
                            role="button"
                          />
                          <BsEye
                            className="text-primary"
                            onClick={() => handleFileView(getFileNameFromUrl(file))
                               
                            }
                            role="button"
                          />
                        </div>
                      </li>
                    )
                  )}
                </ul>
              )}
            </Grid>
            {showPre_sign_input == false && (
              <Button
                style={{ marginBottom: "2%", marginTop : "2%" ,  padding: "0" }}
                onClick={
                  () => handleAddMore("john_pre_sign")
                
                }
                variant="contained"
                color="primary"
              >
                <AddIcon />
              </Button>
            )}

            {pre_sign_loading && (
              <div className="progress mt-3">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{ width: `${scaleProgress(progress)}%` }} // Scale progress to fit within 90% range
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {`${progress == 100 ? 90 : progress}%`}
                </div>
              </div>
            )}
          </div>

          <Typography sx={{ fontWeight: "bold" }} variant="h6">
            Amended 2021
          </Typography>

          {showAmended_input && (
            <div>
            <div className="mb-3 input-group">
              <input
                className="form-control"
                type="file"
                id="formFile"
                accept="application/pdf"
                onClick={()=>{setFileFieldError({})}}
                required
                onChange={
                 (e) => setFile2(e.target.files[0])
                   
                }
              />
              

              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={
                    () => handleFileUpload("ammend")
                     
                  }
                >
                  Upload File
                </button>
              </div>
              {ammend_loading && <div className="spinner ml-3"></div>}
            </div>
            {fileFieldError && fileFieldError.name == 'file2' && (
                   <Typography variant="subtitle1" color="error" gutterBottom>
                   Please select File to proceed
                 </Typography>
              )}
            </div>
          )}
        
          <Grid container col={6}>
            {userData?.pre_signature_second_document?.length > 0 && (
              <ul className="list-group list-group-icons">
                {JSON.parse(userData?.pre_signature_second_document)?.map(
                  (file, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center p-2"
                    >
                      <FolderIcon sx={{ marginRight: "6px" }} />
                      {getFileNameFromUrl(file)}
                      <div className="">
                        <BsTrash
                          className="text-danger me-2"
                          onClick={
                            () => handleOpenModal(file, "ammend")
                             
                          }
                          role="button"
                        />
                        <BsEye
                          className="text-primary "
                          onClick={
                            () => handleFileView(getFileNameFromUrl(file))
                             
                          }
                          role="button"
                        />
                      </div>
                    </li>
                  )
                )}
              </ul>
            )}
          </Grid>
          {!showAmended_input && (
            <Button
              style={{ marginBottom: "2%", marginTop : "2%" , padding: "0" }}
              onClick={
               () => handleAddMore("john_ammend")
                 
              }
              variant="contained"
              color="primary"
            >
              <AddIcon />
            </Button>
          )}

          {ammend_loading && (
            <div className="progress mt-3">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{ width: `${scaleProgress(progress)}%` }} // Scale progress to fit within 90% range
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {`${progress == 100 ? 90 : progress}%`}
              </div>
            </div>
          )}
{/* 
          <Typography sx={{ fontWeight: "bold" }} variant="h6">
            Form 8879
          </Typography>

          {showForm_8879_input && (
            <div className="mb-3 input-group">
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={
                  !userData?.admin_text_return_status
                    ? (e) => setFile(e.target.files[0])
                    : undefined
                }
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={
                    !userData?.admin_text_return_status
                      ? () => handleFileUpload("form_8879")
                      : undefined
                  }
                >
                  Upload File
                </button>
              </div>

              {form_8879_loading && <div className="spinner ml-3"></div>}
            </div>
          )}

          {!showForm_8879_input && (
            <Button
              style={{ marginBottom: "2%", padding: "0" }}
              onClick={
                !userData?.admin_text_return_status
                  ? () => handleAddMore("form_8879")
                  : undefined
              }
              variant="contained"
              color="primary"
            >
              <AddIcon />
            </Button>
          )}

          <Grid container col={6}>
            {userData?.pre_signature_third_document?.length > 0 && (
              <ul className="list-group list-group-icons">
                {JSON.parse(userData?.pre_signature_third_document)?.map(
                  (file, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center p-2"
                    >
                      <FolderIcon sx={{ marginRight: "6px" }} />
                      {getFileNameFromUrl(file)}
                      <div className="">
                        <BsTrash
                          className="text-danger me-2"
                          onClick={
                            !userData?.admin_text_return_status
                              ? () => handleOpenModal(file, "form_8879")
                              : undefined
                          }
                          role="button"
                        />
                        <BsEye
                          className="text-primary "
                          onClick={
                            !userData?.admin_text_return_status
                              ? () => handleFileView(getFileNameFromUrl(file))
                              : undefined
                          }
                          role="button"
                        />
                      </div>
                    </li>
                  )
                )}
              </ul>
            )}
          </Grid>
          {form_8879_loading && (
            <div className="progress mt-3">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{ width: `${scaleProgress(progress)}%` }} // Scale progress to fit within 90% range
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {`${progress == 100 ? 90 : progress}%`}
              </div>
            </div>
          )} */}
        <div className="parent-div">
        {userData?.admin_text_return_status == true && (
          <div className="overlay">
            <div className="overlay-content">
              <span>
                <LockIcon sx={{ color: "#f15e5e", fontSize: 45 }} />
              </span>
              <span>Locked</span>
            </div>
          </div>
        )}

          <Typography
            sx={{ fontWeight: "bold", marginBottom: "1%" }}
            variant="h6"
          >
            Credit Amount
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: "bold" }} variant="subtitle2">
                2020:
              </Typography>
              <div className="mb-3 input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="$ Credit"
                  value={credit2020}
                  onChange={
                    !userData?.admin_text_return_status
                      ? (e) => handleCredit2020Change(e)
                      : undefined
                  }
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={
                      !userData?.admin_text_return_status
                        ? () => handleCreditSave(2020)
                        : undefined
                    }
                  >
                    Save Credit
                  </button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: "bold" }} variant="subtitle2">
                2021:
              </Typography>
              <div className="mb-3 input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="$ Credit"
                  value={credit2021}
                  onChange={
                    !userData?.admin_text_return_status
                      ? (e) => handleCredit2021Change(e)
                      : undefined
                  }
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={
                      !userData?.admin_text_return_status
                        ? () => handleCreditSave(2021)
                        : undefined
                    }
                  >
                    Save Credit
                  </button>
                </div>
              </div>
            </Grid>
          </Grid>

          <Typography sx={{ fontWeight: "bold", marginTop: "2%" }} variant="h6">
            Add Note
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="mb-3 input-group">
                <textarea
                  className="form-control"
                  placeholder="Add Note Here"
                  rows="2"
                  value={note}
                  onChange={
                    !userData?.admin_text_return_status
                      ? (e) => setNote(e.target.value)
                      : undefined
                  }
                ></textarea>
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={
                      !userData?.admin_text_return_status
                        ? handleNoteSave
                        : undefined
                    }
                  >
                    Save Note
                  </button>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center", alignItem: "center" }}
      >
        <Button
          style={{ marginBottom: "2%" }}
          onClick={
            !userData?.admin_text_return_status
              ? () => handleSaveForm()
              : undefined
          }
          variant="contained"
          color="primary"
        >
          {userData?.admin_text_return_status == true ? 'Submitted' : 'Submit'}
        </Button>
      </Grid>
      {saveButtonError && <Alert severity="error">{saveButtonError}</Alert>}
        </div>
       
      </div>

      
      
      {/* Receipt field */}
      <Typography sx={{ fontWeight: "bold" }} variant="h6">
        Receipt
      </Typography>
      {showForm_receipt_input && (
        <div>
        <div className="mb-3 input-group">
          <input
            className="form-control"
            type="file"
            id="formFile"
            onClick={()=>{setFileFieldError({})}}
            onChange={(e) => setFile4(e.target.files[0])}
            disabled={userData?.admin_text_return_status == false || userData?.admin_text_return_status == null} // Disable input based on status
            accept="application/pdf"
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-primary"
              onClick={userData?.admin_text_return_status == true ? () => handleFileUpload("receipt") : null}
              disabled={userData?.admin_text_return_status == false || userData?.admin_text_return_status == null} // Disable button based on status
            >
              Upload File
            </button>
          </div>
          {receiptLoading && <div className="spinner ml-3"></div>}
        </div>
        {fileFieldError && fileFieldError.name == 'file4' && (
                   <Typography variant="subtitle1" color="error" gutterBottom>
                   Please select File to proceed
                 </Typography>
              )}
        </div>
      )}
{/* 
      {!showForm_receipt_input && (
        <Button
          style={{ marginBottom: "2%", padding: "0" }}
          onClick={
            !userData?.admin_text_return_status
              ? () => handleAddMore("receipt")
              : undefined
          }
          variant="contained"
          color="primary"
        >
          <AddIcon />
        </Button>
      )} */}

      <Grid container col={6}>
        {userData?.pre_signature_fourth_document?.length > 0 && (
          <ul className="list-group list-group-icons">
            {JSON.parse(userData?.pre_signature_fourth_document)?.map(
              (file, index) => (
                <div style={{display : 'flex' , flexDirection : "column" , gap : "7px" , justifyContent : 'center' , alignItems: 'center'}}>
                <li
                  key={index}
                  className="list-group-item list-group-item-secondary d-flex align-items-center p-2"
                >
                  <FolderIcon sx={{ marginRight: "6px" }} />
                  {getFileNameFromUrl(file)}
                  <div className=" d-flex gap-2 bg-white">
                  
                    {showDeleteIcon && (
                      
                       <BsTrash
                       className="text-danger me-2"
                       onClick={(e) => {
                               handleOpenModal(file, "receipt");
                             }
                       }
                       role="button"
                     />
                     )}
                    <BsEye
                      className="text-primary"
                      onClick={(e) => {
                              handleFileView(getFileNameFromUrl(file));
                              e.preventDefault();
                            }
                      }
                      role="button"
                    />
                  </div>
                  
                </li>
                <div>
                {(remainingTime > 0) && ( // Conditionally render remaining time if it's greater than 0
                      <span className="text-danger">
                        {`Remove icon will disappear in ${remainingTime} seconds`}
                      </span>
                    )}
                </div>
                </div>
              )
            )}
      
          </ul>
         
        )}
      </Grid>
      {receiptLoading && (
        <div className="progress mt-3">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{ width: `${scaleProgress(progress)}%` }} // Scale progress to fit within 90% range
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {`${progress == 100 ? 90 : progress}%`}
          </div>
        </div>
      )}

     
    </>
  );
};

export default YourComponent;
