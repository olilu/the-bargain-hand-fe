function PageTitle({ title }) {
  return (
    <div style={{
      textAlign: 'center',
      margin: 'var(--spacing-md) 0',
      padding: '0 var(--spacing-lg)'
    }}>
      <h2 style={{ 
        margin: '0',
        fontWeight: 'var(--font-weight-semibold)',
        fontSize: '1.5rem',
        color: '#2d3748',
        letterSpacing: '0.3px'
      }}>
        {title}
      </h2>
      <div style={{
        width: '60px',
        height: '3px',
        background: 'var(--bg-gradient-primary)',
        margin: 'var(--spacing-sm) auto 0',
        borderRadius: '2px'
      }}></div>
    </div>
  );
}

export default PageTitle;