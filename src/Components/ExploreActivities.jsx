import Select from "react-select";
import { useState, useContext } from "react";
import {
  multiValue,
  controlForm,
  menu,
  option,
  center,
  pinkButton,
  title,
  exploreCenter,
  exploreForm,
} from "./lib/ClassesName";
import { categories, locations, groupSizes } from "./lib/Constants";
import dayjs, { Dayjs } from "dayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import ActivityCard from "./UiComponents/ActivityCard.jsx";
import { useQuery } from "@tanstack/react-query";
import {
  BACKEND_URL,
  getRequest,
  CurrentUserContext,
} from "./lib/Constants.js";

export default function ExploreActivities() {
  const currentUser = useContext(CurrentUserContext);
  console.log("user", currentUser);

  const { data } = useQuery({
    queryKey: ["getActivities", currentUser],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/excludeHost/${currentUser.id}`),
    enabled: !!currentUser,
  });

  console.log("data", data);

  //format date and time to DD MMM YYYY, HH:MM AM/PM
  function formatDateandTime(dateString) {
    const eventDate = new Date(dateString);
    const formattedDate = eventDate.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return formattedDate;
  }

  const handleChange = (value) => {
    console.log(value);
  };

  const tomorrow = dayjs().add(1, "day");

  /*show organizer, hide Attendee section (acc) */

  return (
    <div>
      <h1 className={title}>EXPLORE ACTIVITIES</h1>
      <div className="mx-auto my-4 flex w-80 items-center justify-center">
        <DateField
          label="Start Date"
          disablePast
          format={"DD/MM/YYYY"}
          defaultValue={tomorrow}
          sx={{
            width: "100%",
            backgroundColor: "#F2F3F4",
            marginRight: "10px",

            "*": {
              fontFamily: "InterVariable !important",
            },
            ".css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
              fontFamily: "InterVariable !important",
            },
          }}
        />

        <DateField
          label="End Date"
          disablePast
          format={"DD/MM/YYYY"}
          sx={{
            width: "100%",
            backgroundColor: "#F2F3F4",

            "*": {
              fontFamily: "InterVariable !important",
            },
            ".css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
              fontFamily: "InterVariable !important",
            },
          }}
        />
      </div>
      <div className={exploreCenter}>
        <Select
          placeholder="Location"
          options={locations}
          onChange={handleChange}
          unstyled
          classNames={{
            control: () => exploreForm,
            menu: () => menu,
            option: () => option,
          }}
        />
      </div>
      <div className={exploreCenter}>
        <Select
          placeholder="Category"
          options={categories}
          isMulti
          onChange={handleChange}
          unstyled
          classNames={{
            control: () => exploreForm,
            multiValue: () => multiValue,
            menu: () => menu,
            option: () => option,
          }}
        />
      </div>
      <div className={exploreCenter}>
        <Select
          placeholder="Group size"
          options={groupSizes}
          onChange={handleChange}
          unstyled
          classNames={{
            control: () => exploreForm,
            menu: () => menu,
            option: () => option,
          }}
        />
      </div>
      <div className={exploreCenter}>
        <input
          type="text"
          placeholder="Search keywords"
          className="input input-bordered input-accent w-full max-w-xs bg-grey"
        />
      </div>
      <div className={exploreCenter}>
        <button className="focus:ring-green-500 btn btn-primary mt-3 justify-center  whitespace-nowrap focus:outline-none focus:ring-2">
          Search
        </button>
      </div>
      <div className="-mb-2 font-semibold">RESULTS:</div>

      {data?.map((activity) => (
        <ActivityCard
          key={activity.id}
          currentUser={currentUser}
          activity={activity}
          date={formatDateandTime(activity.eventDate)}
        />
      ))}
    </div>
  );
}
