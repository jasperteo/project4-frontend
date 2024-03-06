import UserSummProfile from "./UserSummProfile";
import { RoundedAvatar, dPinkIcon, darkPinkButton } from "../lib/ClassesName";
import {
  categoryIcon,
  BACKEND_URL,
  postRequest,
  CurrentUserContext,
  formatDateandTime,
} from "../lib/Constants";
import { useMutation } from "@tanstack/react-query";
import { useState, useContext } from "react";
import {
  APIProvider,
  Map,
  InfoWindow,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";

export default function ActivityCard({ activity }) {
  const currentUser = useContext(CurrentUserContext);
  const [requestSent, setRequestSent] = useState(false);

  //Request to post request to join to backend
  const { mutate } = useMutation({
    mutationFn: (data) =>
      postRequest(
        `${BACKEND_URL}/activities/${activity.id}/participants`,
        data,
      ),
    onSuccess: () => setRequestSent(true),
  });

  //Handles the click event for the join now button
  //Posts requests to the backend to join the activity
  const handleClick = () => mutate({ userId: currentUser.id });

  return (
    <>
      <div className="lg:card-sides card mt-8 bg-primary shadow-xl">
        <div className="card-body">
          <div className="flex">
            {/* <div className="flex-none">
              <RoundedAvatar image={accOwnerImage} size="8" />
            </div> */}
            {/* to indicidate if user is an attendee */}
            {/* <div className="ml-2 mt-1 flex-auto font-light italic">
              {accOwnerUserName} {accOwnerStatus}
            </div> */}
          </div>
          <div className="font-semibold">
            {activity?.location?.country}, {activity?.location?.city}
          </div>
          <div className="font-semibold">{activity?.title}</div>
          <div className="font-light italic">
            {formatDateandTime(activity.eventDate)}
            {/* {time} */}
          </div>
          <div>{activity.description}</div>
          <div className="items-left flex flex-col flex-wrap space-x-1 ">
            {activity.categories.map((category) => (
              <div className={`${dPinkIcon}`} key={activity.id}>
                <iconify-icon
                  inline
                  icon={`${categoryIcon(category?.activity_categories?.categoryId)}`}
                />
                <p className="text-xs">{category?.categoryName}</p>
              </div>
            ))}
          </div>

          <div className="font-semibold">Organiser:</div>
          <UserSummProfile
            userSummImageURL={activity?.user?.imageUrl}
            userSummFirstName={activity?.user?.firstName}
            userSummUsername={activity?.user?.username}
          />
        </div>
        <img
          className="-mt-2 object-none"
          src={activity?.imageUrl}
          alt="Activity Image"
        />
        {/* <figure>
          <img src="/map.png" alt="map" />
        </figure> */}
        <div id={activity.id} style={{ height: "40vh", width: "100%" }}>
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
            <Map
              center={{
                lat: activity?.latitude,
                lng: activity?.longitude,
              }}
              zoom={15}
            >
              {/* <AdvancedMarker
                key={activity.id}
                position={{
                  lat: activity?.location?.latitude,
                  lng: activity?.location?.longitude,
                }}
                offsetLeft={-20}
                offsetTop={-10}
              ></AdvancedMarker> */}
            </Map>
          </APIProvider>
        </div>

        {/* do not show the join now button if user is an attendee */}
        <div className="card-body -mb-4">
          {requestSent ? (
            <h4 className="text-center">Request sent!</h4>
          ) : (
            <button
              className={`${darkPinkButton} mb-4 text-grey`}
              onClick={handleClick}
            >
              JOIN NOW
            </button>
          )}
        </div>
      </div>
    </>
  );
}
