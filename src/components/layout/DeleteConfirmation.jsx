import React from 'react'
import { Modal, Button } from "react-bootstrap";

function DeleteConfirmation({ showModal, hideModal, confirmModal, message, uuid }) {

    return (
        <Modal 
            show={showModal} 
            onHide={hideModal} 
            contentClassName='bg-dark text-light'
            centered
            size="sm"
            style={{
                '--bs-modal-border-radius': 'var(--card-border-radius)'
            }}
        >
            <Modal.Header 
                closeButton 
                style={{
                    background: 'var(--bg-gradient-secondary)',
                    color: 'white',
                    borderBottom: 'none',
                    borderRadius: 'var(--card-border-radius) var(--card-border-radius) 0 0',
                    padding: 'var(--spacing-lg)'
                }}
            >
                <Modal.Title style={{
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: '1.1rem',
                    margin: '0'
                }}>
                    ⚠️ Delete Confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{
                padding: 'var(--spacing-lg)',
                backgroundColor: '#343a40'
            }}>
                <div style={{
                    background: 'rgba(248, 215, 218, 0.2)',
                    border: '1px solid rgba(220, 53, 69, 0.3)',
                    borderRadius: '8px',
                    padding: 'var(--spacing-md)',
                    color: '#f8d7da',
                    fontSize: '0.95rem',
                    lineHeight: '1.4'
                }}>
                    {message}
                </div>
                <div style={{
                    marginTop: 'var(--spacing-md)',
                    padding: 'var(--spacing-sm)',
                    background: 'rgba(255, 193, 7, 0.1)',
                    borderLeft: '3px solid #ffc107',
                    borderRadius: '4px',
                    color: '#fff3cd',
                    fontSize: '0.85rem'
                }}>
                    <strong>Warning:</strong> This action cannot be undone.
                </div>
            </Modal.Body>
            <Modal.Footer style={{
                background: 'transparent',
                borderTop: 'none',
                padding: 'var(--spacing-md) var(--spacing-lg) var(--spacing-lg)',
                display: 'flex',
                gap: 'var(--spacing-sm)',
                justifyContent: 'flex-end'
            }}>
                <button 
                    className="enhanced-btn enhanced-btn-primary"
                    onClick={hideModal}
                    style={{
                        minWidth: '100px'
                    }}
                >
                    Cancel
                </button>
                <button 
                    className="enhanced-btn enhanced-btn-danger"
                    onClick={() => confirmModal(uuid)}
                    style={{
                        minWidth: '100px'
                    }}
                >
                    Delete
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteConfirmation;