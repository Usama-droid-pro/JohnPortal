import React from 'react'
import './statusprogress.css'
import CheckIcon from '@mui/icons-material/Check';
function StatusProgress({userData}) {
    let percentage = '';

    if(userData?.process_2){
        percentage = '22%'
    }
    if(userData?.process_3){
        percentage = '44%'
    }if(userData?.process_4){
        percentage = '66%'
    }
    if(userData?.process_5){
        percentage = '84%'
    }
    if(userData?.process_6){
        percentage = '100%'
    }

  return (
    <div className="status-progress">
    <div className="">
        <div className="progress1" style={{ width: "6px" }}>
            <div
                className="progress-bar1"
                role="progressbar"
                style={{ height: `${percentage}`, width: "100%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
            ></div>
        </div>

        
        {/* <div className="d-flex justify-content-between flex-wrap">
            <h3>Progress</h3>
    
        </div> */}
        <div className="progress-status">
            <div
                className="progrs-nmber"
                style={{ background: "rgb(13, 189, 243)" }}
            >
                {<CheckIcon />}
            </div>
            <div>
                <p className="progress-head">Application Submitted</p>
            </div>
        </div>
        <div className="progress-status">
            <div className="progrs-nmber" style={{ background: userData?.process_2 ? "rgb(13, 189, 243)" : '' }} >{userData?.process_2 ? <CheckIcon /> : '2'}</div>
            <div>
                <p className="progress-head">Documents Uploaded</p>
                {/* <!-- <p>Started 8 Dec. View response</p> --> */}
            </div>
        </div>
        <div className="progress-status">
            <div className="progrs-nmber" style={{ background: userData?.process_3 ? "rgb(13, 189, 243)" : '' }}>{userData?.process_3 ? <CheckIcon /> : '3'}</div>
            <div>
                <p className="progress-head">Application in Process</p>
            </div>
        </div>
        <div className="progress-status">
            <div className="progrs-nmber" style={{ background: userData?.process_4 ? "rgb(13, 189, 243)" : '' }}>{userData?.process_4 ? <CheckIcon /> : '4'}</div>
            <div>
                <p className="progress-head">Review Calculation</p>
                {/* <!-- <p>Started 8 Dec. View response</p> --> */}
            </div>
        </div>
        <div className="progress-status">
            <div className="progrs-nmber" style={{ background: userData?.process_5 ? "rgb(13, 189, 243)" : '' }}>{userData?.process_5 ? <CheckIcon /> : '5'}</div>
            <div>
                <p className="progress-head">
                    Sign Agreement and Remit Payment
                </p>
            </div>
        </div>
        <div className="progress-status">
            <div className="progrs-nmber" style={{ background: userData?.process_6 ? "rgb(13, 189, 243)" : '' }}>{userData?.process_6 ? <CheckIcon /> : '6'}</div>
            <div>
                <p className="progress-head">Filed SETC with the IRS</p>
            </div>
        </div>
        <div className="progress-status">
            <div className="progrs-nmber" style={{ background: userData?.process_7 ? "rgb(13, 189, 243)" : '' }}>{userData?.process_7 ? <CheckIcon /> : '7'}</div>
            <div>
                <p className="progress-head">
                    Awaiting SETC Payment (12-20 weeks)
                </p>
            </div>
        </div>
    </div>
</div>
  )
}

export default StatusProgress