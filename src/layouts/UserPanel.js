import Sidebar from "components/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import routes from "routes.js";
import "./style.css";
import StatusProgress from "./components/StatusProgress/StatusProgress";
import usePut from '../hooks/usePut'
import usePost from '../hooks/usePost'

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Dropdown,
} from "reactstrap";

import ReviewCalculationForm from "./components/ReviewCalculationForm";
import Header from "components/Headers/Header";
import AdminNavbar from "components/Navbars/AdminNavbar";
import "components/GlobalPanelStyles/panel.css";

import axios from "../axios/axios.js";
import { baseUrl, docPath1, docPath2 } from "baseUrl";
import DocumentsTab from "./components/DocumentsTab";
import { StatusTab } from "./components/StatusTab";
import Swal from 'sweetalert2'
// core components

const UserPanel = (props) => {
  const navigate = useNavigate()
  const { id } = useParams(); // Access the user ID from the route params
  // Fetch user data based on userId and display the user panel

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  const [verifyDocModalOpen, setVerifyModalOpen] = React.useState(false);
  const handleVerifyModalOpen = () => setVerifyModalOpen(true);
  const handleVerifyModalClose = () => setVerifyModalOpen(false);

  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState();

  const [activeTab, setActiveTab] = useState("status_tab"); // Default to 'status_tab' or last selected tab


  const [showRemoveButton, setShowRemoveButton] = useState(true);
  const [shouldReload, setShouldReload] = useState(false);


  const [selectedFiles, setSelectedFiles] = useState({
    driving_licence_name: [],
    schedule_pdf_name: [],
    Tax_Return_2020_name: [],
    Tax_Return_2021_name: [],
    supplemental_attachment_2020_name: [],
    supplemental_attachment_2021_name: [],
    FormA1099_name: [],
    FormB1099_name: [],
    ks2020_name: [],
    ks22020: [],
  });

  useEffect(() => {
    if (selectedFiles) {
      console.log(
        "Ssssssssssssssssssssssssssssssssssssssssssssele",
        selectedFiles
      );
    }
  }, [userData]);
  const allFilesSelected = () => {
    return (
      selectedFiles?.driving_licence_name?.length > 0,
      selectedFiles?.schedule_pdf_name?.length > 0,
      selectedFiles?.Tax_Return_2020_name?.length > 0,
      selectedFiles?.Tax_Return_2021_name?.length > 0
    );
  };

  const allFilesSelectedAdditional = () => {
    return (
      selectedFiles?.driving_licence_name?.length > 0,
      selectedFiles?.schedule_pdf_name?.length > 0,
      selectedFiles?.Tax_Return_2020_name?.length > 0,
      selectedFiles?.Tax_Return_2021_name?.length > 0,
      selectedFiles?.supplemental_attachment_2020_name?.length > 0,
      selectedFiles?.supplemental_attachment_2021_name?.length > 0,
      selectedFiles?.FormA1099_name?.length > 0,
      selectedFiles?.FormB1099_name?.length > 0,
      selectedFiles?.ks2020_name?.length > 0,
      selectedFiles?.ks22020?.length > 0
    );
  };


  const {
    data: updateUserData,
    loading: updateUserLoading,
    error: updateUserError,
    putData: updateUserHookMethod,
  } = usePut("user/updateUser");

  const {
    data: offerClosedEmailData,
    loading: offerClosedEmailLoading,
    error: offerClosedEmailError,
    postData : offerClosedEmailPostHook
  } = usePost("sendEmail/offerCloseEmail");

  


  const handleCloseOffer = async ()=>{
    let consent = await Swal.fire({
      title : "Are you sure?",
      text: "Do you really want to close this lead offer?",
      showDenyButton: false,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    });
    if(consent.isConfirmed){
      let payload = {
        id : userData?.id ,
        process_4 : null,
        admin_text_return_status : false,
        Review_calculation : null,
        completed_application : null,
        is_docs_verify : 'not verified',
        closed_offer : true
      }

      const response = await updateUserHookMethod(payload);
      console.log(response)
      if(response.status == 200){
        Swal.fire({
          title: "Successfull!",
          text: "Successfully Closed the offer",
          icon: "success"
        });
        const offerClosedEmailResponse = await offerClosedEmailPostHook(userData?.id);
        if(offerClosedEmailResponse){
          console.log("offerClosedEmailSent")
        }
        navigate('/admin/tables')
      }
    }else return null;
  }



  const [steps, setSteps] = useState([
    {
      title: "Application Started",
      description: "Started 30 Nov.",
      isCompleted: true,
    },
    {
      title: "Documents Uploaded",
      isCompleted: false,
    },
    {
      title: "Application in Process",
      description: "2-3 Days",
      isCompleted: false,
    },
    {
      title: "Review Calculation",
      isCompleted: false,
    },
    {
      title: "Sign Agreement and Remit Payment",
      isCompleted: false,
    },
    {
      title: "Filed SETC with the IRS",
      isCompleted: false,
    },
    {
      title: "Awaiting SETC Payment (12-20 weeks)",
      description: "6-9 weeks",
      isCompleted: false,
    },
  ]);

  useEffect(() => {
    const storedTab = localStorage.getItem("activeTab");
    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    localStorage.setItem("activeTab" , tabId);
  };


  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       //  alert(token, 'useeffect tokeeeeeeeeeeeennnnnnnnnnnnnn')
  //       try {
  //         const response = await fetch("https://app.setczone.com/api/user/getbyid", {
  //           method: "GET",
  //         });
  //         if (response.ok) {

  //           const userData = await response.json();
  //           setUserData(userData);
  //           const currentStep = userData.step;
  //           setActiveStep(currentStep || 0);

  //           setSelectedFiles((prevSelectedFiles) => ({
  //             ...prevSelectedFiles,
  //             driving_licence_name: userData?.driving_licence_name,
  //             schedule_pdf_name: userData?.schedule_pdf_name,
  //             Tax_Return_2020_name: userData?.Tax_Return_2020_name,
  //             Tax_Return_2021: userData?.Tax_Return_2021,
  //             supplemental_attachment_2020_name: userData?.supplemental_attachment_2020_name,
  //             supplemental_attachment_2021_name: userData?.supplemental_attachment_2021_name,
  //             FormA1099_name: userData?.FormA1099_name,
  //             FormB1099_name: userData?.FormB1099_name,
  //             ks2020_name: userData?.ks2020_name,
  //             ks22020: userData?.ks22020,

  //           }));
  //         } else {
  //           console.error("Error fetching user data");
  //         }
  //       } catch (error) {
  //         console.error("Network error", error);
  //       }
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let user_id = id.replace(":", "");
        const response = await axios.get(
          `user/view_user_profile?id=${user_id}`
        );
        console.log(response.status);
        if (response.status != 200) {
          throw new Error("Network response was not ok");
        }

        const data = response?.data;
        let userData = data?.result;
        setUserData(userData);
        const currentStep = userData?.step;
        setActiveStep(currentStep || 0);

        setSelectedFiles((prevSelectedFiles) => ({
          ...prevSelectedFiles,
          driving_licence_name: userData?.driving_licence_name,
          schedule_pdf_name: userData?.schedule_pdf_name,
          Tax_Return_2020_name: userData?.Tax_Return_2020_name,
          Tax_Return_2021_name: userData?.Tax_Return_2021_name,
          supplemental_attachment_2020_name:
            userData?.supplemental_attachment_2020_name,
          supplemental_attachment_2021_name:
            userData?.supplemental_attachment_2021_name,
          FormA1099_name: userData?.FormA1099_name,
          FormB1099_name: userData?.FormB1099_name,
          ks2020_name: userData?.ks2020_name,
          ks22020: userData?.ks22020,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [shouldReload]);

  useEffect(() => {
    let timer;
    if (
      (userData?.applicationStatus === false ||
        userData?.applicationWithDocument === false) &&
      showRemoveButton
    ) {
      timer = setTimeout(() => {
        setShowRemoveButton(false);
      }, 1800000);
      // }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [userData, showRemoveButton]);

  const updateDocumentUploadedStatus = () => {
    let isCompleted = false;

    if (userData?.Family_Sick_Leave === "Yes") {
      if (allFilesSelectedAdditional()) {
        isCompleted = true;
      }
    } else {
      if (allFilesSelected()) {
        isCompleted = true;
      }
    }

    // Update 'isCompleted' status for 'Documents Uploaded' step
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.title === "Documents Uploaded" ? { ...step, isCompleted } : step
      )
    );
  };

  useEffect(() => {
    updateDocumentUploadedStatus();
    // Add dependencies if needed
  }, [userData, selectedFiles]);

  if (userData) {
    return (
      <>
        {/* <VerifyModal open={verifyDocModalOpen} handleOpen={handleVerifyModalOpen} handleClose={handleVerifyModalClose} userData = {userData && userData} setRejectionFiles={setRejectionFiles} /> */}
        <Sidebar
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("../assets/img/brand/argon-react.png"),
            imgAlt: "...",
          }}
        />
        <div className="main-content">
          <AdminNavbar
            {...props}
            brandText={getBrandText(props?.location?.pathname)}
          />
          {/* Header */}
          <Header tables={"tables"} />

          {/* Page content */}
          <Container className="mt--7 " fluid>
            {/* Table */}
            <Row>
              <div className="col" style={{ padding: "0px 0px 50px 0px" }}>
                <Card className="" style={{ backgroundColor: "#4969a0" }}>
                  <CardHeader className="bg-transparent border-0">
                    <h3 className="text-white mb-0">Lead Panel Information</h3>
                  </CardHeader>
                  <div className="status-page">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-xl-7 col-lg-12 col-sm-12 col-md-12">
                          <div className="contain">
                            <div className="row ">
                              <div className="main_tab_content col-lg-9 col-md-12">
                                <div className="row justify-content-center">
                                  <div className="col-lg-12 col-md-12 ">
                                    <ul
                                      className="nav nav-tab tabs-heading mb-4"
                                      role="tab"
                                      style={{
                                        alignItems: "center !important",
                                      }}
                                    >
                                      <li className="tab-item me-4">
                                        <a
                                          className={`status-heading nav-link ${
                                            activeTab === "status_tab"
                                              ? "active"
                                              : ""
                                          }`}
                                          data-bs-toggle="tab"
                                          href="#status_tab"
                                          style={{
                                            marginTop: 5,
                                            fontSize: 18,
                                            textDecoration: "underline",
                                          }}
                                          onClick={() =>
                                            handleTabChange("status_tab")
                                          }
                                        >
                                          Status
                                        </a>
                                      </li>
                                      <li className="tab-item me-3">
                                        <a
                                          className={`status-heading nav-link ${
                                            activeTab === "document_tab"
                                              ? "active"
                                              : ""
                                          }`}
                                          data-bs-toggle="tab"
                                          href="#document_tab"
                                          style={{
                                            fontSize: 18,
                                            textDecoration: "underline",
                                            marginTop: "5px",
                                          }}
                                          onClick={() =>
                                            handleTabChange("document_tab")
                                          }
                                        >
                                          Documents
                                        </a>
                                      </li>
                                      <li className="tab-item me-3">
                                        <a
                                          className={`status-heading nav-link ${
                                            activeTab ===
                                            "review_calculation_tab"
                                              ? "active"
                                              : ""
                                          }`}
                                          data-bs-toggle="tab"
                                          href="#review_calculation_tab"
                                          style={{
                                            fontSize: 18,
                                            textDecoration: "underline",
                                            marginTop: "5px",
                                          }}
                                          onClick={() =>
                                            handleTabChange(
                                              "review_calculation_tab"
                                            )
                                          }
                                        >
                                          Review Calculation
                                        </a>
                                      </li>
                                    </ul>

                                    <div className="tab-content mt-2">
                                      <div
                                        className={`tab-pane fade ${
                                          activeTab === "status_tab"
                                            ? "show active"
                                            : ""
                                        }`}
                                        id="status_tab"
                                      >
                                        <StatusTab
                                          userData={userData && userData}
                                        />
                                      </div>

                                      {userData?.applicationStatus == true ||
                                      userData?.applicationWithDocument ==
                                        true ||
                                      userData?.process_2 != null ? (
                                        <>
                                          <div
                                            className={`tab-pane fade ${
                                              activeTab === "document_tab"
                                                ? "show active"
                                                : ""
                                            }`}
                                            id="document_tab"
                                          >
                                            <DocumentsTab
                                              userData={userData && userData}
                                            />
                                                <div
                                            className="d-flex"
                                            style={{ gap: "10px" }}
                                          >
                                            <button
                                              onClick={handleCloseOffer}
                                              className="approveButton"
                                              style={{
                                                marginTop: 30,
                                                marginBottom: 22,
                                                padding: "3px 19px",
                                              }}
                                            >
                                              Close Offer
                                            </button>
                                          </div>
                                          </div>
                                      
                                        </>
                                      ) : (
                                        <>
                                          <div
                                          className={`tab-pane fade ${
                                            activeTab === "document_tab"
                                              ? "show active"
                                              : ""
                                          }`}
                                          id="document_tab"
                                        >
                                          No Any Documents Uploaded
                                          <div className="d-flex" style={{ gap: "10px" }}>
                                           <button
                                             onClick={handleCloseOffer}
                                             className="approveButton"
                                             style={{
                                               marginTop: 30,
                                               marginBottom: 22,
                                               padding: "3px 19px",
                                             }}
                                           >
                                             Close Offer
                                           </button>
                                         </div>
                                        </div>
                                          
                                        </>
                                      
                                      )}

                                      {
                                        <div
                                          className={`tab-pane fade ${
                                            activeTab ===
                                            "review_calculation_tab"
                                              ? "show active"
                                              : ""
                                          }`}
                                          id="review_calculation_tab"
                                        >
                                          <ReviewCalculationForm
                                            userData={userData}
                                            setShouldReload={setShouldReload}
                                            shouldReload={shouldReload}
                                          />
                                        </div>
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="col-xl-5 col-lg-12 col-sm-12 col-md-12 ps-0"
                          style={{ backgroundColor: "#4969a0" }}
                        >
                          <StatusProgress userData={userData} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Row>
          </Container>
        </div>
      </>
    );
  } else {
    return <div></div>;
  }
};

export default UserPanel;
