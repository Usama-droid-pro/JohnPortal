import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {FileOpenTwoTone} from '@mui/icons-material'
import {useState , useEffect} from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const modalContentStyle = {
  maxHeight: 400,
  overflowY: 'auto',
};

export default function BasicModal({ handleOpen, open, handleClose, userData , setRejectionFiles}) {
  let documentList = {
    Schedules_2019: {
      files_names: userData &&  JSON.parse(userData?.schedule_pdf)|| [], // its an array 
      files_paths:userData &&  JSON.parse(userData?.schedule_pdf_name) || [] // its an array 
    },
    Tax_Return_2020: {
        files_names: userData &&  JSON.parse(userData?.Tax_Return_2020)|| [], // its an array 
        files_paths:userData &&  JSON.parse(userData?.Tax_Return_2020_name) || [] // its an array 
      },
      Tax_Return_2021: {
        files_names: userData &&  JSON.parse(userData?.Tax_Return_2021)|| [], // its an array 
        files_paths:userData &&  JSON.parse(userData?.Tax_Return_2021_name) || [] // its an array 
      },
      supplemental_attachment_2020: {
        files_names: userData &&  JSON.parse(userData?.supplemental_attachment_2020)|| [], // its an array 
        files_paths:userData &&  JSON.parse(userData?.supplemental_attachment_2020_name) || [] // its an array 
      },
      supplemental_attachment_2021: {
        files_names: userData &&  JSON.parse(userData?.supplemental_attachment_2021)|| [], // its an array 
        files_paths:userData &&  JSON.parse(userData?.supplemental_attachment_2021_name) || [] // its an array 
      },
      FormA1099: {
        files_names: userData &&  JSON.parse(userData?.FormA1099)|| [], // its an array 
        files_paths:userData &&  JSON.parse(userData?.FormA1099_name) || [] // its an array 
      },
      FormB1099: {
        files_names: userData &&  JSON.parse(userData?.FormB1099)|| [], // its an array 
        files_paths:userData &&  JSON.parse(userData?.FormB1099_name) || [] // its an array 
      },
      ks2020_name: {
        files_names: userData &&  JSON.parse(userData?.ks2020)|| [], // its an array 
        files_paths:userData &&  JSON.parse(userData?.ks2020_name) || [] // its an array 
      },

  };

  const [selectedFiles, setSelectedFiles] = useState([]);


  const handleCheckboxChange = (event, file) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedFiles(prevSelected => [...prevSelected, {}]);
    } else {
      setSelectedFiles(prevSelected =>
        prevSelected.filter(selectedFile => selectedFile !== file)
      );
    }
  };

  console.log(selectedFiles)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="subtitle1" color="secondary" gutterBottom>
            *You can select files for rejection among those listed below.
          </Typography>
          <div style={modalContentStyle}>
            {Object.entries(documentList).map(([section, files]) => (
              <div key={section}>
                <Typography variant="subtitle1" fontSize="1.2rem" fontWeight={600} gutterBottom>
                  {files?.files_names?.length > 0 &&  section}
                </Typography>
                <div>
                  {files?.files_names?.map((file, index) => (
                    <div key={index}>
                      <FormControlLabel
                        control={<Checkbox />}
                        onChange={event => handleCheckboxChange(event, files?.files_paths[index])}
                        // checked={selectedFiles.includes(file)}
                        label={ <Box display="flex" alignItems="center">
                        <FileOpenTwoTone style={{ marginRight: '5px' }} />
                        {file}
                      
                      </Box>}
                        style={{color : '#2e8a5f' , textDecoration : 'underline'}}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ textAlign: 'center', marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
              <Button style={{ background: 'orangered', border: '1px solid orangered', borderRadius: '5px', marginRight: '10px' }} variant="contained" onClick={handleClose}>Close</Button>
              <Button style={{ background: 'orangered', border: '1px solid orangered', borderRadius: '5px' }} variant="contained" onClick={handleClose}>Reject</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
