import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    src={`icons/${item.weather?.[0]?.icon}.png`}
                    className="icon-small"
                    alt="weather"
                  />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">{item.weather?.[0]?.description ?? "N/A"}</label>
                  <label className="min-max">
                    {Math.round(item.main?.temp_max ?? 0)}°C /
                    {Math.round(item.main?.temp_min ?? 0)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure:</label>
                  <label>{item.main?.pressure ?? "N/A"}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity:</label>
                  <label>{item.main?.humidity ?? "N/A"}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds:</label>
                  <label>{item.clouds?.all ?? "N/A"}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind speed:</label>
                  <label>{item.wind?.speed ?? "N/A"} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea level:</label>
                  <label>{item.main?.sea_level ?? "N/A"}m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like:</label>
                  <label>{item.main?.feels_like ?? "N/A"}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
