import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import PurchaseButton from "./PurchaseButton";
import { useGetUpcomingSponsorSlots } from "./sponsorHooks";

const BookingCalendar = ({
  productId,
  companyId,
  lsProduct,
  postObject,
  user,
}) => {
  // Example state: Array of Dates representing the start of each available week
  // This could be dynamic, e.g., fetched from a server or based on user input
  const [availableWeekStarts, setAvailableWeekStarts] = useState(() =>
    generateWeekStartsForYear(2024)
  );
  const [selectedWeeks, setSelectedWeeks] = useState([]);
  // State to hold the array of selected date ranges
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const {slots, loading:slotsLoading} = useGetUpcomingSponsorSlots({productId})

  console.log(slots)
   // Convert slots to Date format for easier comparison
   const [unavailableWeeks, setUnavailableWeeks] = useState([]);

   useEffect(() => {
    if(slots?.length){

      const formattedSlots = slots.map(slot => {
        // Validate start and end timestamps before converting
        const startTimestamp = slot.weeks[0].start;
        const endTimestamp = slot.weeks[0].end;
        const isValidStartTimestamp = startTimestamp && !isNaN(startTimestamp);
        const isValidEndTimestamp = endTimestamp && !isNaN(endTimestamp);
    
        if (isValidStartTimestamp && isValidEndTimestamp) {
          return {
            start: new Date(startTimestamp),
            end: new Date(endTimestamp),
          };
        } else {
          // Log error or handle invalid timestamps as needed
          console.error('Invalid timestamp:', slot);
          return null; // Return null or some default value if timestamps are invalid
        }
      }).filter(Boolean); // Filter out null values resulting from invalid timestamps
    
      setUnavailableWeeks(formattedSlots);
    }
  }, [slots]);

   console.log(unavailableWeeks)
   
  // Function to check if a date is in an available week
  const isDateInAvailableWeek = date => {
    const isInUnavailableWeek = unavailableWeeks.some(week =>
      date >= week.start && date <= week.end
    );
    return (
      availableWeekStarts.some(weekStart => {
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7); // Add 6 days to get the end of the week
        return date >= weekStart && date <= weekEnd;
      }) && !isInUnavailableWeek
    );
  };

  // Function to check if a date is before the current week
  const isBeforeCurrentWeek = date => {
    const today = new Date();
    const firstDayOfWeek = new Date(
      today.setDate(
        today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
      )
    );
    firstDayOfWeek.setHours(0, 0, 0, 0); // Start of the first day of the current week
    return date < firstDayOfWeek;
  };

  // Modifiers for DayPicker
  const modifiers = {
    available: isDateInAvailableWeek, // Example: Only weekdays are available
    unavailable: date => !isDateInAvailableWeek(date),    selected: day =>
      selectedWeeks.some(({ start, end }) => day >= start && day <= end),
    beforeCurrentWeek: isBeforeCurrentWeek,
  };

  const modifiersStyles = {
    //   available: { backgroundColor: 'white' }, // Style for available days
    selected: {
      backgroundColor: "#dbeafe",
      color: "#3b82f6",
      borderRadius: "0px",
    }, // Style for selected week days
    unavailable: { backgroundColor: "rgba(0,0,0,0.08)",
    borderRadius: "0px", color:'#999', cursor:'not-allowed' }, // Style for available days,
    beforeCurrentWeek: {
      color: "#ccc",
      backgroundColor: "#f8f8f8",
      pointerEvents: "none",
    }, // Style for dates before the current week
  };

  const handleRemoveDate = rangeToRemove => {
    setSelectedDates(
      selectedDates.filter(
        week =>
          week.start.getTime() !== rangeToRemove.start.getTime() ||
          week.end.getTime() !== rangeToRemove.end.getTime()
      )
    );
    setSelectedWeeks(
      selectedWeeks.filter(
        week =>
          week.start.getTime() !== rangeToRemove.start.getTime() ||
          week.end.getTime() !== rangeToRemove.end.getTime()
      )
    );
  };

  const handleDayClick = (day, modifiers) => {
    if (modifiers.beforeCurrentWeek || !modifiers.available) {
      console.log("This day is not available for selection.");
      return;
    }

    // Calculate the start and end of the clicked week
    const startOfWeek = new Date(day);
    startOfWeek.setDate(
      day.getDate() - day.getDay() + (day.getDay() === 0 ? -6 : 1)
    ); // Adjust for weeks starting on Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const newRange = { start: startOfWeek, end: endOfWeek };

    // Check if this week is already selected
    const isSelected = selectedWeeks.some(
      week =>
        week.start.getTime() === newRange.start.getTime() &&
        week.end.getTime() === newRange.end.getTime()
    );

    if (isSelected) {
      // Remove the week from the selection
      setSelectedWeeks(
        selectedWeeks.filter(
          week =>
            week.start.getTime() !== newRange.start.getTime() ||
            week.end.getTime() !== newRange.end.getTime()
        )
      );
      setSelectedDates(
        selectedWeeks.filter(
          week =>
            week.start.getTime() !== newRange.start.getTime() ||
            week.end.getTime() !== newRange.end.getTime()
        )
      );
    } else {
      // Add the new week to the selection
      setSelectedWeeks([...selectedWeeks, newRange]);
      setSelectedDates([...selectedDates, newRange]);
    }
  };

  return (
    // <div>hi</div>
    <div className="flex bg-white justify-start border border-gray-300/60 rounded-lg">
      <div className="p-4">
        <DayPicker
          onDayClick={handleDayClick}
          onSelect={setSelectedRanges}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          // mode='range'
          // selected={selectedRanges}
          styles={{
            head_cell: {
              // width: "60px",
            },
            table: {
              maxWidth: "none",
            },
            day: {
              margin: "auto",
            },
          }}
          className="bg-white rounded-lg rounded-r-none p-3 w-[fit-content] !mx-0 !my-0"
          // This will apply the "unavailable" style to all days not marked as "available"
          //   className="unavailableDays" // You might need to define and use this class in your global CSS
        />
      </div>
      <div className="p-8 pb-6 w-full border-gray-300/30 border-l rounded-r-lg">
        <SelectedDatesList
          lsProduct={lsProduct}
          companyId={companyId}
          postObject={postObject}
          productId={productId}
          user={user}
          onRemove={handleRemoveDate}
          selectedDates={selectedDates}
        />
      </div>
    </div>
  );
};

export default BookingCalendar;

function generateWeekStartsForYear(year) {
  const dates = [];
  // Create a date object at the start of the year
  let currentDate = new Date(year, 0, 1);
  // Adjust the date to the first Monday of the year
  // If the first day of the year is not Monday, adjust the date to the next Monday
  while (currentDate.getDay() !== 1) {
    currentDate.setDate(currentDate.getDate() + 1);
  }
  // Loop through the year
  while (currentDate.getFullYear() === year) {
    dates.push(new Date(currentDate)); // Add the current Monday to the list
    currentDate.setDate(currentDate.getDate() + 7); // Move to the next Monday
  }
  return dates;
}

const SelectedDatesList = ({
  selectedDates,
  onRemove,
  user,
  lsProduct,
  productId,
  companyId,
  postObject
}) => {
  return (
    <div className={`flex flex-col h-full ${selectedDates?.length?'justify-between':'justify-start'} px-1`}>
      <h2 className="text-lg font-semibold mb-4">Selected slots</h2>
      {/* <p>Select a week from the calendar (newsletters are sent once per week)</p> */}
      <div className="flex flex-col justify-start h-full">
        {selectedDates?.length ? (
          selectedDates.map(({ start, end }, index) => (
            <div
              key={index}
              className="bg-blue-200/40 p-4 mb-3 rounded-lg relative flex items-center justify-between"
            >
              <div>
                <span className="font-medium">Week {index + 1}: </span>
                {start.toLocaleDateString()} - {end.toLocaleDateString()}
              </div>
              <button
                onClick={() => onRemove({ start, end })}
                className="rounded-full bg-blue-400/40 p-1"
              >
                <svg
                  className="h-3.5 w-3.5 rounded-full text-blue-800 hover:text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <div className="rounded-lg bg-gray-200/60 py-4 px-4 text-gray-500 text-base">
            No slots have been selected from the calendar.
          </div>
        )}
          {selectedDates?.length ? (
          <div className="flex mb-6 justify-end p-3 rounded-lg bg-blue-50/70 ">
            <div className="font-semibold">Total:&nbsp;</div>
            <div className="font-base">
              ${(lsProduct?.attributes?.price / 100) * selectedDates?.length}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex flex-col">
      
        {selectedDates?.length ? (
          <PurchaseButton
            productId={productId}
            companyId={companyId}
            postObject={postObject}
            lsProduct={lsProduct}
            user={user}
            selectedSlots={selectedDates}
          />
        ) : (
          null
        )}
      </div>
    </div>
  );
};
