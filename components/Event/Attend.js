import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const AddAttendance = ({ user, event, setAttend }) => {

  const submitAttendance = async (name, email, avatar, event, sub) => {
    const res = await fetch(`/api/attendees/${event}/${sub}/add`, {
      method: 'POST',
      body: JSON.stringify({ name, email, avatar, event, sub }),
    });
    if (res.status === 201) {
      setAttend(true)
      alert('added to list')
    } else {
      alert('there was an error')
    }
  };

  return(
    <button className="button button--primary my-0" onClick={() => submitAttendance(user.name, user.email, user.picture, event.id, user.sub)}>
      Attend
    </button>
  )
}

const RemoveAttendance = ({ user, event, setAttend }) => {

  const { data } = useSWR(`/api/attendees/${event.id}/${user.sub}`, fetcher);

  const removeAttendance = async (id) => {
    const res = await fetch(`/api/attendees/${event}/${user.sub}/remove`, {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
    if (res.status === 201) {
      setAttend(false)
      alert('removed from list')
    } else {
      alert('there was an error')
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
  const [attend, setAttend] = useState(false)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const { data } = useSWR(`/api/attendees/${event.id}`, fetcher);

  const checkAttendance = () => {
    if(data && user && data.list.includes(user.sub)) {
      setAttend(true)
    }
  }

  useEffect(() => {
    checkAttendance()
  }, [])

  return (
    user ? (
      <>
        {
          attend ? (
            <RemoveAttendance
              user={user}
              event={event}
              setAttend={setAttend}
            />
          )
          :
          (
            <AddAttendance
              user={user}
              event={event}
              setAttend={setAttend}
            />
          )
        }
      </>
    )
    :
    (
      <a className="button my-0" href="/api/auth/login">Sign in to attend</a>
    )
  );
}