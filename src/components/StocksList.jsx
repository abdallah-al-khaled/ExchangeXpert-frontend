import { useEffect } from "react";
import "../assets/css/stockslist.css"
import TopContainerListItem from "./TopContainerListItem";
function StocksList() {

  useEffect(() => {
    // Load the Finlogix Widget script
    const script = document.createElement('script');
    script.src = "https://widget.finlogix.com/Widget.js";
    script.async = true;

    script.onload = () => {
      // Initialize the widget after the script is loaded
      if (window.Widget) {
        window.Widget.init({
          widgetId: "b1d0a048-a152-466d-a134-baf5418b6821",
          type: "SymbolChartList",
          language: "en",
          symbolIDs: [
            5,
            19,
            44,
            70,
            52,
            10007,
            10014
          ],
          isAdaptive: true,
          withBorderBox: true
        });
      }
    };

    document.body.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
    <div className="single-stock flex row">
       <div className="finlogix-container"></div>
    </div>
    </>
  )
}
export default StocksList