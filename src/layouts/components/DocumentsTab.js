import { useState, useEffect } from "react";
import { baseUrl, docPath1, docPath2 } from "baseUrl";

import React from "react";
import { FileOpenTwoTone } from "@mui/icons-material";

const DocumentsTab = ({ userData }) => {
  const openFileInNewTab = async (fileKey, index, originalFileName) => {
    // Split the original file name using the backslash as the separator
    const parts = originalFileName.split("\\");

    // Get the last part of the resulting array, which is the filename
    const filenameView = parts[parts.length - 1];

    if (
      filenameView.includes("pdf_file_changeable") ||
      filenameView.includes("pdf_file")
    ) {
      const directUrl = `${docPath2}${filenameView}`;
      window.open(directUrl, "_blank");
      return;
    } else {
      const directUrl = `${docPath1}${filenameView}`;
      window.open(directUrl, "_blank");
      return;
    }
  };

  const handleCloseOffer = ()=>{

  }

  return (
    <>
      <div class="file_div" style={{ marginTop: 28 }}>
        <h4>
          A PDF Copy of your 2019 Form 1040 (Tax Return), including ALL
          schedules, if the 2019 Self-Employed Income is higher than 2020. We
          would prefer one PDF file.
        </h4>
        {JSON.parse(userData?.schedule_pdf_name) &&
        JSON.parse(userData?.schedule_pdf_name).length > 0 ? (
          JSON.parse(userData?.schedule_pdf_name).map((file, index) => (
            <div key={index} className="containerr">
              <div className="itemm">
                <FileOpenTwoTone style={{ color: "#2e8a5f" }} />
                <span
                  style={{ textDecoration: "underline" }}
                  onClick={() =>
                    openFileInNewTab(
                      "schedule_pdf_name",
                      index,
                      JSON.parse(userData?.schedule_pdf_name)[index]
                    )
                  }
                  className="namee"
                >
                  {JSON.parse(userData?.schedule_pdf)[index]}
                </span>
              </div>
            </div>
          ))
        ) : (
          <h4 style={{ color: "orangered", fontStyle: "italic" }}>
            No file Uploaded
          </h4>
        )}
      </div>

      <div class="file_div" style={{ marginTop: 28 }}>
        <h4>
          A PDF Copy of your 2020 Form 1040 (Tax Return), including ALL
          schedules.
        </h4>
        {JSON.parse(userData?.Tax_Return_2020_name) &&
        JSON.parse(userData?.Tax_Return_2020_name).length > 0 ? (
          JSON.parse(userData.Tax_Return_2020_name).map((file, index) => (
            <div key={index} className="containerr">
              <div className="itemm">
                <FileOpenTwoTone style={{ color: "#2e8a5f" }} />
                <span
                  style={{ textDecoration: "underline" }}
                  onClick={() =>
                    openFileInNewTab(
                      "Tax_Return_2020_name",
                      index,
                      JSON.parse(userData?.Tax_Return_2020_name)[index]
                    )
                  }
                  className="namee"
                >
                  {JSON.parse(userData?.Tax_Return_2020)[index]}
                </span>
              </div>
            </div>
          ))
        ) : (
          <h4 style={{ color: "orangered", fontStyle: "italic" }}>
            No file Uploaded
          </h4>
        )}
      </div>

      <div class="file_div" style={{ marginTop: 28 }}>
        <h4>
          A PDF Copy of your 2021 Form 1040 (Tax Return), including ALL
          schedules.
        </h4>
        {JSON.parse(userData?.Tax_Return_2021_name) &&
        JSON.parse(userData?.Tax_Return_2021_name).length > 0 ? (
          JSON.parse(userData?.Tax_Return_2021_name).map((file, index) => (
            <div key={index} className="containerr">
              <div className="itemm">
                <FileOpenTwoTone style={{ color: "#2e8a5f" }} />
                <span
                  style={{ textDecoration: "underline" }}
                  onClick={() =>
                    openFileInNewTab(
                      "Tax_Return_2021",
                      index,
                      JSON.parse(userData?.Tax_Return_2021_name)[index]
                    )
                  }
                  className="namee"
                >
                  {JSON.parse(userData?.Tax_Return_2021)[index]}
                </span>
              </div>
            </div>
          ))
        ) : (
          <h4 style={{ color: "orangered", fontStyle: "italic" }}>
            No file Uploaded
          </h4>
        )}
      </div>

      {userData?.Family_Sick_Leave === "Yes" &&
        userData?.employed_as_W2 === "Yes" && (
          <>
            <div class="file_div" style={{ marginTop: 28 }}>
              <h4>
                PDF Copy of All your 2020 Form W-2(s), including ANY Family
                First Coronavirus Response Act (FFCRA) supplemental
                attachment(s).*
              </h4>
              {JSON.parse(userData?.supplemental_attachment_2020_name) &&
              JSON.parse(userData?.supplemental_attachment_2020_name).length >
                0 ? (
                JSON.parse(userData.supplemental_attachment_2020_name).map(
                  (file, index) => (
                    <div key={index} className="containerr">
                      <div className="itemm">
                        <FileOpenTwoTone style={{ color: "#2e8a5f" }} />
                        <span
                          style={{ textDecoration: "underline" }}
                          onClick={() =>
                            openFileInNewTab(
                              "supplemental_attachment_2020_name",
                              index,
                              JSON.parse(
                                userData.supplemental_attachment_2020_name
                              )[index]
                            )
                          }
                          className="namee"
                        >
                          {
                            JSON.parse(userData.supplemental_attachment_2020)[
                              index
                            ]
                          }
                        </span>
                      </div>
                    </div>
                  )
                )
              ) : (
                <h4 style={{ color: "orangered", fontStyle: "italic" }}>
                  No file Uploaded
                </h4>
              )}
            </div>

            <div class="file_div" style={{ marginTop: 28 }}>
              <h4>
                PDF Copy of All your 2021 Form W-2(s), including ANY Family
                First Coronavirus Response Act (FFCRA) supplemental
                attachment(s).
              </h4>
              {JSON.parse(userData?.supplemental_attachment_2021_name) &&
              JSON.parse(userData?.supplemental_attachment_2021_name).length >
                0 ? (
                JSON.parse(userData.supplemental_attachment_2021_name).map(
                  (file, index) => (
                    <div key={index} className="containerr">
                      <div className="itemm">
                        <FileOpenTwoTone style={{ color: "#2e8a5f" }} />
                        <span
                          style={{ textDecoration: "underline" }}
                          onClick={() =>
                            openFileInNewTab(
                              "supplemental_attachment_2021_name",
                              index,
                              JSON.parse(
                                userData.supplemental_attachment_2021_name
                              )[index]
                            )
                          }
                          className="namee"
                        >
                          {
                            JSON.parse(userData.supplemental_attachment_2021)[
                              index
                            ]
                          }
                        </span>
                      </div>
                    </div>
                  )
                )
              ) : (
                <h4 style={{ color: "orangered", fontStyle: "italic" }}>
                  No file Uploaded
                </h4>
              )}
            </div>

            <div class="file_div" style={{ marginTop: 28 }}>
              <h4>PDF Copy of All your 2020 Form 1099-R(s), if any</h4>
              {JSON.parse(userData?.FormA1099_name) &&
              JSON.parse(userData?.FormA1099_name).length > 0 ? (
                JSON.parse(userData.FormA1099_name).map((file, index) => (
                  <div key={index} className="containerr">
                    <div className="itemm">
                      <FileOpenTwoTone style={{ color: "#2e8a5f" }} />
                      <span
                        style={{ textDecoration: "underline" }}
                        onClick={() =>
                          openFileInNewTab(
                            "FormA1099_name",
                            index,
                            JSON.parse(userData.FormA1099_name)[index]
                          )
                        }
                        className="namee"
                      >
                        {JSON.parse(userData.FormA1099)[index]}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <h4 style={{ color: "orangered", fontStyle: "italic" }}>
                  No file Uploaded
                </h4>
              )}
            </div>

            <div class="file_div" style={{ marginTop: 28 }}>
              <h4>PDF Copy of All your 2021 Form 1099-R(s), if any</h4>
              {JSON.parse(userData?.FormB1099_name) &&
              JSON.parse(userData?.FormB1099_name).length > 0 ? (
                JSON.parse(userData.FormB1099_name).map((file, index) => (
                  <div key={index} className="containerr">
                    <div className="itemm">
                      <FileOpenTwoTone style={{ color: "#2e8a5f" }} />
                      <span
                        style={{ textDecoration: "underline" }}
                        onClick={() =>
                          openFileInNewTab(
                            "FormB1099_name",
                            index,
                            JSON.parse(userData.FormB1099_name)[index]
                          )
                        }
                        className="namee"
                      >
                        {JSON.parse(userData.FormB1099)[index]}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <h4 style={{ color: "orangered", fontStyle: "italic" }}>
                  No file Uploaded
                </h4>
              )}
            </div>

            <div class="file_div" style={{ marginTop: 28 }}>
              <h4>PDF Copy of All your 2020 K-1s, if any</h4>
              {JSON.parse(userData?.ks2020_name) &&
              JSON.parse(userData?.ks2020_name).length > 0 ? (
                JSON.parse(userData.ks2020_name).map((file, index) => (
                  <div key={index} className="containerr">
                    <div className="itemm">
                      <FileOpenTwoTone style={{ color: "#2e8a5f" }} />
                      <span
                        style={{ textDecoration: "underline" }}
                        onClick={() =>
                          openFileInNewTab(
                            "ks2020_name",
                            index,
                            JSON.parse(userData.ks2020_name)[index]
                          )
                        }
                        className="namee"
                      >
                        {JSON.parse(userData.ks2020)[index]}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <h4 style={{ color: "orangered", fontStyle: "italic" }}>
                  No file Uploaded
                </h4>
              )}
            </div>
          </>
        )}
   

      {/* 
                                          <div className="d-flex" style={{gap : '10px'}}>
                                            <button
                                              // onClick={handleVerifyModalOpen}
                                              className="approveButton"
                                              style={{
                                                marginTop: 30,
                                                marginBottom: 22,
                                                padding: "3px 19px",
                                              }}>
                                              Verify All Documents
                                            </button>
                                            <button
                                              onClick={handleVerifyModalOpen}
                                              className="approveButton"
                                              style={{
                                                marginTop: 30,
                                                marginBottom: 22,
                                                padding: "3px 19px",
                                              }}>
                                              Reject Documents
                                            </button>
                                          </div>
                                     */}
    </>
  );
};

export default DocumentsTab;
