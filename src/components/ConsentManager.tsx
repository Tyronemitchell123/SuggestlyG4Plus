'use client';
import React from 'react';

// Add gtag type declaration
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type Props = { initial?: string; nonce?: string };

export function ConsentManager({ initial, nonce }: Props) {
  const [open, setOpen] = React.useState(!initial);
  const [state, setState] = React.useState<{analytics:boolean; marketing:boolean}>(
    () => initial ? JSON.parse(initial) : { analytics: false, marketing: false }
  );

  React.useEffect(() => {
    if (!state.analytics && !state.marketing) return;
    const val = JSON.stringify(state);
    document.cookie = `consent=${val}; Path=/; SameSite=Lax; Max-Age=31536000`;
    
    // Track consent in analytics
    if (window.gtag) {
      window.gtag('event', 'consent_update', {
        analytics_consent: state.analytics,
        marketing_consent: state.marketing,
        event_category: 'privacy',
        event_label: 'consent_manager'
      });
    }
    
    // Load marketing content if consented
    document.querySelectorAll<HTMLElement>('[data-consent="marketing"] iframe, [data-consent="marketing"] [data-src]').forEach(el=>{
      const src = (el as any).dataset?.src; 
      if (src) (el as HTMLIFrameElement).src = src;
    });
  }, [state]);

  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-xl border border-luxury-gold/20 bg-luxury-darker p-6 text-luxury-light shadow-luxury">
        <h2 className="text-xl font-display text-luxury-gold mb-2">Privacy Preferences</h2>
        <p className="text-sm text-luxury-gray mb-4">Choose how we use your data to enhance your experience.</p>
        
        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-3 p-3 rounded-lg bg-luxury-dark/50 hover:bg-luxury-dark transition-colors">
            <input 
              type="checkbox" 
              checked={state.analytics} 
              onChange={(e)=>setState(s=>({...s, analytics:e.target.checked}))}
              className="w-4 h-4 text-luxury-gold bg-luxury-darker border-luxury-gold/30 rounded focus:ring-luxury-gold"
            />
            <div>
              <div className="font-semibold text-luxury-light">Analytics</div>
              <div className="text-xs text-luxury-gray">Help us improve our services</div>
            </div>
          </label>
          
          <label className="flex items-center gap-3 p-3 rounded-lg bg-luxury-dark/50 hover:bg-luxury-dark transition-colors">
            <input 
              type="checkbox" 
              checked={state.marketing} 
              onChange={(e)=>setState(s=>({...s, marketing:e.target.checked}))}
              className="w-4 h-4 text-luxury-gold bg-luxury-darker border-luxury-gold/30 rounded focus:ring-luxury-gold"
            />
            <div>
              <div className="font-semibold text-luxury-light">Marketing</div>
              <div className="text-xs text-luxury-gray">Personalized content and offers</div>
            </div>
          </label>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            className="btn-luxury-secondary flex-1" 
            onClick={()=>setOpen(false)}
          >
            Save Preferences
          </button>
          <button 
            className="btn-luxury-outline flex-1" 
            onClick={()=>{setState({analytics:true, marketing:false}); setOpen(false);}}
          >
            Analytics Only
          </button>
          <button 
            className="btn-luxury-primary flex-1" 
            onClick={()=>{setState({analytics:true, marketing:true}); setOpen(false);}}
          >
            Allow All
          </button>
        </div>
      </div>
    </div>
  );
}
