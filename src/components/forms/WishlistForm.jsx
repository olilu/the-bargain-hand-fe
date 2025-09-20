import { Link, Form, useActionData } from 'react-router-dom';

function WishlistForm({email=null, name=null, country_code='CH', language_code='de', actionURL, isModal=false}) {
    const errorData = useActionData();

    let emailInputProps = {
        type: 'email',
        name: 'email',
        id: 'email'
    }
    let nameInputProps = {
        type: 'text',
        name: 'name',
        id: 'name'
    }
    if (email !== null) {
        emailInputProps.defaultValue = email;
    } else {
        emailInputProps.placeholder = 'email@example.com'
    }
    if (name !== null) {
        nameInputProps.defaultValue = name;
    } else {
        nameInputProps.placeholder = 'Enter Wishlist Name'
    }

    // Modal version - simplified without card wrapper
    if (isModal) {
        return (
            <Form method='post' action={actionURL}>
                {errorData && (
                    <div className="alert alert-danger" role="alert" style={{
                        borderRadius: '8px',
                        border: 'none',
                        marginBottom: 'var(--spacing-lg)',
                        backgroundColor: '#f8d7da',
                        color: '#721c24'
                    }}>
                        {errorData.error}
                    </div>
                )}
                
                <div className="mb-4">
                    <label htmlFor="name" style={{ 
                        fontWeight: 'var(--font-weight-medium)', 
                        color: 'white',
                        marginBottom: 'var(--spacing-sm)',
                        display: 'block'
                    }}>
                        Wishlist Name
                    </label>
                    <input 
                        className='form-control' 
                        required 
                        {...nameInputProps}
                        style={{
                            borderRadius: '8px',
                            border: '2px solid #495057',
                            padding: 'var(--spacing-sm) var(--spacing-md)',
                            transition: 'var(--transition-fast)',
                            fontSize: '1rem',
                            backgroundColor: '#495057',
                            color: 'white'
                        }}
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="email" style={{ 
                        fontWeight: 'var(--font-weight-medium)', 
                        color: 'white',
                        marginBottom: 'var(--spacing-sm)',
                        display: 'block'
                    }}>
                        E-Mail
                    </label>
                    <input 
                        className='form-control' 
                        required 
                        {...emailInputProps}
                        style={{
                            borderRadius: '8px',
                            border: '2px solid #495057',
                            padding: 'var(--spacing-sm) var(--spacing-md)',
                            transition: 'var(--transition-fast)',
                            fontSize: '1rem',
                            backgroundColor: '#495057',
                            color: 'white'
                        }}
                    />
                </div>
                
                <div className="row mb-4">
                    <div className="col-6">
                        <label htmlFor="country_code" style={{ 
                            fontWeight: 'var(--font-weight-medium)', 
                            color: 'white',
                            marginBottom: 'var(--spacing-sm)',
                            display: 'block'
                        }}>
                            Country Code
                        </label>
                        <input 
                            className='form-control' 
                            type="text" 
                            name='country_code' 
                            id="country_code" 
                            defaultValue={country_code} 
                            maxLength={2}
                            style={{
                                borderRadius: '8px',
                                border: '2px solid #495057',
                                padding: 'var(--spacing-sm) var(--spacing-md)',
                                transition: 'var(--transition-fast)',
                                fontSize: '1rem',
                                textTransform: 'uppercase',
                                backgroundColor: '#495057',
                                color: 'white'
                            }}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="language_code" style={{ 
                            fontWeight: 'var(--font-weight-medium)', 
                            color: 'white',
                            marginBottom: 'var(--spacing-sm)',
                            display: 'block'
                        }}>
                            Language Code
                        </label>
                        <input 
                            className='form-control' 
                            type="text" 
                            name='language_code' 
                            id="language_code" 
                            defaultValue={language_code} 
                            maxLength={2}
                            style={{
                                borderRadius: '8px',
                                border: '2px solid #495057',
                                padding: 'var(--spacing-sm) var(--spacing-md)',
                                transition: 'var(--transition-fast)',
                                fontSize: '1rem',
                                textTransform: 'lowercase',
                                backgroundColor: '#495057',
                                color: 'white'
                            }}
                        />
                    </div>
                </div>
                
                <div className="d-flex gap-3 justify-content-end mt-4">
                    <Link className="enhanced-btn enhanced-btn-danger" type="button" to=".." style={{
                        textDecoration: 'none',
                        minWidth: '100px'
                    }}>
                        Cancel
                    </Link>
                    <button className="enhanced-btn enhanced-btn-primary" type="submit" style={{
                        minWidth: '100px'
                    }}>
                        {name !== null ? 'Update' : 'Create'}
                    </button>
                </div>
            </Form>
        );
    }

    // Standalone card version
    return (
        <div className="enhanced-card" style={{ 
            maxWidth: '500px', 
            margin: '0 auto',
            background: '#fff'
        }}>
            <div className="card-header" style={{
                background: 'var(--bg-gradient-primary)',
                color: 'white',
                padding: 'var(--spacing-lg)',
                borderRadius: 'var(--card-border-radius) var(--card-border-radius) 0 0',
                textAlign: 'center'
            }}>
                <h4 style={{ 
                    margin: '0',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: '1.25rem'
                }}>
                    {name !== null ? 'Edit Wishlist' : 'Create New Wishlist'}
                </h4>
            </div>
            
            <Form method='post' action={actionURL}>
                <div className="card-body" style={{ padding: 'var(--spacing-lg)' }}>
                    {errorData && (
                        <div className="alert alert-danger" role="alert" style={{
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: 'var(--card-shadow-light)',
                            marginBottom: 'var(--spacing-lg)'
                        }}>
                            {errorData.error}
                        </div>
                    )}
                    
                    <div className="mb-4">
                        <label htmlFor="name" style={{ 
                            fontWeight: 'var(--font-weight-medium)', 
                            color: '#333',
                            marginBottom: 'var(--spacing-sm)',
                            display: 'block'
                        }}>
                            Wishlist Name
                        </label>
                        <input 
                            className='form-control' 
                            required 
                            {...nameInputProps}
                            style={{
                                borderRadius: '8px',
                                border: '2px solid #e9ecef',
                                padding: 'var(--spacing-sm) var(--spacing-md)',
                                transition: 'var(--transition-fast)',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="email" style={{ 
                            fontWeight: 'var(--font-weight-medium)', 
                            color: '#333',
                            marginBottom: 'var(--spacing-sm)',
                            display: 'block'
                        }}>
                            E-Mail
                        </label>
                        <input 
                            className='form-control' 
                            required 
                            {...emailInputProps}
                            style={{
                                borderRadius: '8px',
                                border: '2px solid #e9ecef',
                                padding: 'var(--spacing-sm) var(--spacing-md)',
                                transition: 'var(--transition-fast)',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label htmlFor="country_code" style={{ 
                                fontWeight: 'var(--font-weight-medium)', 
                                color: '#333',
                                marginBottom: 'var(--spacing-sm)',
                                display: 'block'
                            }}>
                                Country Code
                            </label>
                            <input 
                                className='form-control' 
                                type="text" 
                                name='country_code' 
                                id="country_code" 
                                defaultValue={country_code} 
                                maxLength={2}
                                style={{
                                    borderRadius: '8px',
                                    border: '2px solid #e9ecef',
                                    padding: 'var(--spacing-sm) var(--spacing-md)',
                                    transition: 'var(--transition-fast)',
                                    fontSize: '1rem',
                                    textTransform: 'uppercase'
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="language_code" style={{ 
                                fontWeight: 'var(--font-weight-medium)', 
                                color: '#333',
                                marginBottom: 'var(--spacing-sm)',
                                display: 'block'
                            }}>
                                Language Code
                            </label>
                            <input 
                                className='form-control' 
                                type="text" 
                                name='language_code' 
                                id="language_code" 
                                defaultValue={language_code} 
                                maxLength={2}
                                style={{
                                    borderRadius: '8px',
                                    border: '2px solid #e9ecef',
                                    padding: 'var(--spacing-sm) var(--spacing-md)',
                                    transition: 'var(--transition-fast)',
                                    fontSize: '1rem',
                                    textTransform: 'lowercase'
                                }}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="card-footer d-flex gap-3 justify-content-end" style={{
                    background: 'transparent',
                    border: 'none',
                    padding: 'var(--spacing-md) var(--spacing-lg) var(--spacing-lg)'
                }}>
                    <Link className="enhanced-btn enhanced-btn-danger" type="button" to=".." style={{
                        textDecoration: 'none',
                        minWidth: '100px'
                    }}>
                        Cancel
                    </Link>
                    <button className="enhanced-btn enhanced-btn-primary" type="submit" style={{
                        minWidth: '100px'
                    }}>
                        {name !== null ? 'Update' : 'Create'}
                    </button>
                </div>
            </Form>
        </div>
    );
}

export default WishlistForm;