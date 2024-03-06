import React from 'react';
import './style.css'
import ClearIcon from '@mui/icons-material/Clear';

const ConfirmationModal = ({ isOpen, onCancel, onConfirm , deleteFileLoading}) => {
  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog modal-confirm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="icon-box">
            <ClearIcon sx={{ color: '#f15e5e', fontSize: 55}} /> 
            </div>
            <h4 className="modal-title">Are you sure?</h4>
            <button type="button" className="close" onClick={onCancel} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          {deleteFileLoading ? (
            <>
             <div class="spinner-border text-primary" role="status">
            </div>
            <div>deleting file...</div>
            </>
             
            ):  <p>Do you really want to delete this file? This process cannot be undone.</p>}
           
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-info" onClick={onCancel}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              Delete
            </button>
            
          </div>
          <div style = {{justifyContent : 'center' , display : 'flex' , alignItems: 'center' , marginTop : '2px'}}>
       
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
