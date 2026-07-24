import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const AddAttendance = ({ user, event, onResult }) => {

  const submitAttendance = async () => {
    const res = await fetch(`/api/attendees/${event.id}/${user.sub}/add`, {
      method: 'POST',
      body: JSON.stringify({ name: user.name, email: user.email, avatar: user.picture, event: event.id, sub: user.sub }),
    });
    if (res.status === 201) {
      onResult(true, "You're on the list! 🎉")
    } else {
      onResult(false, 'Something went wrong — please try again')
    }
  };

  return(
    <button className="button button--primary my-0" onClick={() => submitAttendance()}>
      Attend
    </button>
  )
}

const RemoveAttendance = ({ user, event, onResult }) => {

  const { data } = useSWR(`/api/attendees/${event.id}/${user.sub}`, fetcher);

  const removeAttendance = async (id) => {
    const res = await fetch(`/api/attendees/${event.id}/${user.sub}/remove`, {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
    if (res.status === 201) {
      onResult(false, 'Your RSVP has been removed')
    } else {
      onResult(true, 'Something went wrong — please try again')
    }
  };

  return(
    <>
      {
        data && (
          <button className="button button--danger my-0" onClick={() => removeAttendance(data.user.id)}>
            Cancel RSVP
          </button>
        )
      }
    </>
  )
}

export default function Attend({event}) {
  const { user, error, isLoading } = useUser();
  const { data, mutate } = useSWR(`/api/attendees/${event.id}`, fetcher);
  // null until the user acts; afterwards it overrides the server-derived value
  const [override, setOverride] = useState(null)
  const [status, setStatus] = useState(null)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const attending = override ?? Boolean(data && user && data.list.includes(user.sub))

  const handleResult = (isAttending, message) => {
    setOverride(isAttending)
    setStatus(message)
    mutate()
  }

  return (
    user ? (
      <div className="flex flex-col items-end">
        {
          attending ? (
            <RemoveAttendance
              user={user}
              event={event}
              onResult={handleResult}
            />
          )
          :
          (
            <AddAttendance
              user={user}
              event={event}
              onResult={handleResult}
            />
          )
        }
        {
          status && (
            <span role="status" className="text-xs mt-2 text-black text-opacity-60 dark:text-white dark:text-opacity-60">
              {status}
            </span>
          )
        }
      </div>
    )
    :
    (
      <a className="button my-0" href="/api/auth/login">Sign in to attend</a>
    )
  );
}
