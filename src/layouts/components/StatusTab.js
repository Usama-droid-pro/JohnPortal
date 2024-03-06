import React from "react";
import moment from 'moment'

export const StatusTab = ({ userData }) => {
  
  const fields = {
    "Name": `${userData.first_name ? userData.first_name : '-'} ${userData.middle_name ? userData.middle_name : ''} ${userData.last_name ? userData.last_name : ''}`,
    "Email": userData.email ? userData.email : '-',
    "Phone": userData.phone ? userData.phone : '-',
    "Business Legal Name": userData.business_name ? userData.business_name : '-',
    "Address 1": userData.address_line_1 ? userData.address_line_1 : '-',
    "Address 2": userData.address_line_2 ? userData.address_line_2 : '-',
    "City": userData.city ? userData.city : '-',
    "State": userData.state ? userData.state : '-',
    "Zip": userData.zip ? userData.zip : '-',
    "How did you hear about us?": userData.know_about_us ? userData.know_about_us : '-',
    "Accounting Professional": userData.accounting_professional ? userData.accounting_professional : '-',
    "Self Employed 2020-2021?": userData.self_employed_from ? userData.self_employed_from : '-',
    "Did you file 1040 SE 2020-2021?": userData.have_you_filed_already_for_setc ? userData.have_you_filed_already_for_setc : '-',
    "Positive Net Earnings 2020-2021?": userData.if_you_have_positive_earning ? userData.if_you_have_positive_earning : '-',
    "Did you miss employment 2020?": userData.did_you_miss_SEWDTC_2020 ? userData.did_you_miss_SEWDTC_2020 : '-',
    "Did you miss employment 2021?": userData.did_you_miss_SEWDTC_2021 ? userData.did_you_miss_SEWDTC_2021 : '-',
    "Did receive unemployment 2020?": userData.did_receive_unemployement20 ? userData.did_receive_unemployement20 : '-',
    "Did receive unemployment 2021?": userData.did_receive_unemployement21 ? userData.did_receive_unemployement21 : '-',
    "Personally Sick Symptoms 2020 Days": userData["onedays"] > 0 ? userData["onedays"] : '-',
    "Personally Sick Symptoms 2020 Dates (YYYY-MM-DD)": userData?.personally_sick_symptoms_2020_dates ? JSON.parse(userData?.personally_sick_symptoms_2020_dates).length>0 ? JSON.parse(userData?.personally_sick_symptoms_2020_dates).map((item)=>moment(item).format('YYYY-MM-DD')).join(', ') : '-' : '-',
    "Personally Sick Symptoms 2021 Days": userData["twodays"] > 0 ? userData["twodays"] : '-',
    "Personally Sick Symptoms 2021 Dates (YYYY-MM-DD)":userData?.personally_sick_symptoms_2021_dates ? JSON.parse(userData?.personally_sick_symptoms_2021_dates).length>0 ? JSON.parse(userData?.personally_sick_symptoms_2021_dates).map((item)=>moment(item).format('YYYY-MM-DD')).join(', ') : '-' : '-',
    "COVID Experienced Symptoms 2020 Days": userData["threedays"] > 0  ? userData["threedays"] : '-',
    "COVID Experienced Symptoms 2020 Dates (YYYY-MM-DD)":userData?.covid_experienced_symptoms_2020_dates ?  JSON.parse(userData.covid_experienced_symptoms_2020_dates).length > 0 ? JSON.parse(userData.covid_experienced_symptoms_2020_dates).map((item)=>moment(item).format('YYYY-MM-DD')).join(', ') : '-' : '-',
    "COVID Experienced Symptoms 2021 Days": userData["fourdays"] > 0? userData["fourdays"] : '-',
    "COVID Experienced Symptoms 2021 Dates (YYYY-MM-DD)": userData?.covid_experienced_symptoms_2021_dates ?  JSON.parse(userData.covid_experienced_symptoms_2021_dates).length > 0 ? JSON.parse(userData.covid_experienced_symptoms_2021_dates).map((item)=>moment(item).format('YYYY-MM-DD')).join(', ') : '-' : '-',
    "Child's Daycare 2020 (50 Days)": userData["fivedays"] > 0 ? userData["fivedays"] : '-',
    "Child's Daycare 2020 Dates (YYYY-MM-DD)":userData?.childs_daycare_2020_dates ? JSON.parse(userData.childs_daycare_2020_dates).length > 0 ? JSON.parse(userData.childs_daycare_2020_dates).map((item)=>moment(item).format('YYYY-MM-DD')).join(', ') : '-': '-',
    "Child's Daycare 2021 (60 Days)": userData["sixdays"] > 0 ? userData["sixdays"] : '-',
    "Child's Daycare 2021 Dates (YYYY-MM-DD)":userData?.childs_daycare_2021_dates ? JSON.parse(userData.childs_daycare_2021_dates).length > 0 ? JSON.parse(userData.childs_daycare_2021_dates).map((item)=>moment(item).format('YYYY-MM-DD')).join(', ') : '-' : '-',
       "Setc Program 2020": userData.have_you_filed_already_for_setc ? userData.have_you_filed_already_for_setc : '-',
    "Setc Program 2021": userData.have_you_filed_already_for_setc_2021 ? userData.have_you_filed_already_for_setc_2021 : '-',
    "Employed as W2 2020-2021": userData.employed_as_W2 ? userData.employed_as_W2 : '-',
    "Pay Family Sick Leave": userData.Family_Sick_Leave ? userData.Family_Sick_Leave : '-',
    "Family Sick Amount 2020": userData.amount2020 ? userData.amount2020 : '-',
    "Family Sick Amount 2021": userData.amount2021 ? userData.amount2021 : '-',
    "Net Income 2019": userData.net_income_2019 ? userData.net_income_2019 : '-',
    "Net Income 2020": userData.net_income_2020 ? userData.net_income_2020 : '-',
    "Net Income 2021": userData.net_income_2021 ? userData.net_income_2021 : '-',
    "E File Tax 2020": userData.E_File_My_texes_2020 == 1 ? 'Yes' : userData.E_File_My_texes_2020 == 0 ? "No" : '-',
    "E File Tax 2021": userData.E_File_My_texes_2021 = 1 ? 'Yes' :  userData.E_File_My_texes_2021 == 0 ? "No": '-',
    "Mailed Tax 2020": userData.Mail_My_texes_2020 == 1 ? "Yes" :  userData.Mail_My_texes_2020 == 0 ? "No" : '-',
    "Mailed Tax 2021": userData.Mail_My_texes_2021 == 1 ? "Yes" :  userData.Mail_My_texes_2021 = 0 ? "No" : '-',
    "Joint Return 2020": userData.joint_return_2020 ? userData.joint_return_2020 : '-',
    "Joint Return 2021": userData.joint_return_2021 ? userData.joint_return_2021 : '-',
    "Spouse Name": userData.spouse_name ? userData.spouse_name : '-',
    "Spouse Email": userData.spouse_email ? userData.spouse_email : '-',
    "Spouse DOB": userData.spouse_DOB ? userData.spouse_DOB : '-',
    // Assuming dependents is an array of objects
    "Dependents": userData.dependents ? (
      <ul style={{ paddingLeft: '0.1rem', fontSize: '0.9rem' }}>
          {JSON.parse(userData.dependents).map((dependent, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <div>{dependent.name}</div>
                  <div>{dependent.dob}</div>
              </li>
          ))}
      </ul>
  ) : '-',
  
  
    "Veriff Status": userData.approval_status ? userData.approval_status : '-',
};
return (
  <>
    <h2 className="mb-3 comp-info">Company Info</h2>

    <div className="row justify-content-center">
      {Object.keys(fields).map((key, index) => (
        <div key={index} className="col-lg-6">
          <div className="mb-3">
            <div
              className="form-label-status styleTitle"
              style={{
                marginBottom: '0.25rem',
                lineHeight: '1.25',
                color: 'rgba(20,18,22,.6)'
            
              }}
            >
              {key}
            </div>
            
               {key === "Name" && userData.approval_status == 'approved' ? (
                <> <span class="status-inform "style={{color:"black",fontWeight:"600"}}>{fields[key]}</span> <i class="fas fa-check-circle ms-1" style={{color: "#14e4c4",  fontSize: "15px"}} aria-hidden="true"></i></>
               
              ) : (
                <div style={{ color: key === 'Veriff Status' && fields[key] == 'approved' ? 'green' : null  , fontWeight : key === 'Verification Status' ? '600' : null }} className="status-inform">{fields[key]}</div>          
                )}
            </div>
        
        </div>
      ))}
    </div>
  </>
);
};