import UserSummProfile from "./UserSummProfile";
import RoundedAvatar from "./RoundedAvatar";
import { dPinkIcon } from "../lib/ClassesName";
import { useContext } from "react";
import { CurrentUserContext } from "../lib/Constants";

export default function PastActivityCard({ userStatus, activities }) {
  console.log(activities);
  const currentUser = useContext(CurrentUserContext);

  return (
    <div>
      {activities &&
        activities.map((event) => (
          // <div key={event.id}>
          //   <h2>{event.title || event.activity.title}</h2>
          //   <p>
          //     {
          //       (event.isHosted =
          //         event.hostId === currentUser?.id ? "Organiser" : "Member")
          //     }
          //   </p>
          //   <p>{event.eventDate}</p>
          // </div>
          <div
            className="lg:card-sides card mt-8 bg-grey shadow-xl"
            key={event.id}
          >
            <div className="card-body">
              <div className="flex">
                <div className="flex-none">
                  <RoundedAvatar
                    image="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    size="8"
                  />
                </div>
                {/* to indicidate if user is an attendee */}
                <div className="ml-2 mt-1 flex-auto font-light italic">
                  @userName
                </div>
              </div>
              <div className="font-semibold">Hanoi, Vietnam</div>

              <div className="font-semibold">Event Activity Title</div>

              <div className="font-light italic">Date, Exact Time</div>
              <div>Description</div>
              <div className="flex">
                <div className={`${dPinkIcon}`}>
                  <iconify-icon inline icon="ri:plant-line" />
                </div>
                <div className="mb-4 mt-2 text-xs"> Event Category</div>
              </div>
              {/* remove organiser section if user is the organiser */}
              <div className="-mt-2 font-semibold">Organiser:</div>
              <UserSummProfile
                userSummImageURL="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                userSummFirstName="FirstName"
                userSummUsername="@userName"
              />
              <div className="mt-2 font-semibold">Participants:</div>
              <UserSummProfile
                userSummImageURL="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                userSummFirstName="FirstName"
                userSummUsername="@userName"
              />
            </div>

            <figure>
              <img src="/map.png" alt="map" />
            </figure>
            {/* do not show the join now button if user is an attendee */}
          </div>
        ))}
    </div>
  );
}
