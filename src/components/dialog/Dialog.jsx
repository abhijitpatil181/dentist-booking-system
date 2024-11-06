import './dialog.css'; 

const Dialog = ({
  isOpen,
  onClose,
  title,
  content,
  confirmText,
  onConfirm,
  cancelText = 'Cancel',
  width = '400px', // Default width
  height = '300px', // Default height
}) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="dialog-overlay">
      <div className="dialog-box" style={{ minWidth: width,maxHeight: height }}>
        <div className="dialog-header">
          <p style={{fontWeight:400,fontSize:'1.5rem',color:'#000000'}}>{title}</p>
          <button className="close-button" onClick={onClose}>✖</button>
        </div>
        <div className="dialog-content">
          {content}
        </div>
        <div className="dialog-footer">
          <button className="dialog-button" onClick={onClose}>{cancelText}</button>
          {confirmText && <button className="dialog-button confirm-button" onClick={onConfirm}>{confirmText}</button>}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
