import React, { useEffect } from 'react';

function Topbar({ symbol="AAPL" }) {
    useEffect(() => {
        // Create script element
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
        script.async = true;
        console.log(symbol);
        console.log("dfgihjdnuiygf");
        
        script.innerHTML = JSON.stringify({
          symbol,
          width: "350",
          height: "200",
          locale: "en",
          dateRange: "1D",
          colorTheme: "light",
          isTransparent: true,
          autosize: false,
          largeChartUrl: "",
          noTimeScale: true
        });
        console.log(document.querySelectorAll('.blue-text').forEach(e => e.remove()));
        // Append script to the document body
        document.querySelector('.tradingview-widget-container__widget').appendChild(script);
      }, []);
    //   label__link-dzbd7lyV
  return (
    <>
<div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      </div>
      </>
  )
}
export default Topbar
