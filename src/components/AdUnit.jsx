import { useEffect, useRef } from 'react';

/**
 * Google AdSense unit.
 * Replace YOUR_PUBLISHER_ID and slot IDs after AdSense approval.
 * Set enabled={false} until you are approved to avoid console errors.
 */
const AdUnit = ({
  slot = '0000000000',
  format = 'auto',
  responsive = true,
  className = '',
  style = {},
  enabled = false, // set true only after AdSense approval
}) => {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!enabled || pushed.current) return;
    try {
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({});
        pushed.current = true;
      }
    } catch {
      // AdSense not loaded or blocked
    }
  }, [enabled]);

  if (!enabled) {
    // Placeholder so layout stays stable while waiting for approval
    return (
      <div
        className={`ad-placeholder ${className}`}
        style={{
          minHeight: 90,
          margin: '1.5rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          border: '1px dashed var(--color-border, #e2e0f0)',
          color: 'var(--color-text-secondary, #64648b)',
          fontSize: '0.8rem',
          ...style,
        }}
        aria-hidden="true"
      >
        Advertisement
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`} style={{ margin: '1.5rem 0', textAlign: 'center', ...style }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdUnit;
