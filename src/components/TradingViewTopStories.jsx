import React, { useEffect } from "react";

const TradingViewTopStories = ({ symbol = "AAPL" }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      feedMode: "symbol",
      isTransparent: true,
      displayMode: "regular",
      width: "100%",
      largeChartUrl: "",
      height: 600,
      colorTheme: "light",
      locale: "en",
      symbol: symbol,
    });

    const widgetContainer = document.getElementById("tradingview-widget");
    widgetContainer.appendChild(script);

    return () => {
      // Cleanup the widget on unmount
      widgetContainer.innerHTML = "";
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div
        id="tradingview-widget"
        className="tradingview-widget-container__widget"
      ></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
};

export default TradingViewTopStories;
