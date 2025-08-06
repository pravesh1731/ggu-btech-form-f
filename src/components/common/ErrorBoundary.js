import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console or error reporting service
    console.error('Error Boundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
          <div style={{
            maxWidth: '600px',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '60px 40px',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h1 style={{
              fontSize: '3rem',
              marginBottom: '20px',
              fontWeight: '700'
            }}>
              ⚠️ Something went wrong
            </h1>
            
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '30px',
              opacity: '0.9'
            }}>
              We're sorry, but something unexpected happened in the GGU Admission System.
            </p>
            
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                padding: '15px 30px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🔄 Reload Page
            </button>
            
            <div style={{
              marginTop: '30px',
              fontSize: '0.9rem',
              opacity: '0.7'
            }}>
              <p>If this problem persists, please contact the system administrator.</p>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <details style={{
                marginTop: '30px',
                textAlign: 'left',
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '20px',
                borderRadius: '8px',
                fontSize: '0.8rem'
              }}>
                <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>
                  🔍 Error Details (Development)
                </summary>
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
