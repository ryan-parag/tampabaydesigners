import React from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import moment from 'moment'
import { atcb_action } from "add-to-calendar-button";
import 'add-to-calendar-button/assets/css/atcb.css';
import { Loader } from 'react-feather'

const AddToCalendar = ({ name, description, dateTime, location}) => {

  const { data, error } = useSWR(`/api/hangout-locations/${location}`, fetcher);

  return (
    <>
      {
        data ? (
          <button
            className="inline-block text-xs mt-2 underline"
            onClick={(e) => {
              e.preventDefault();
              atcb_action({
                name: `${name} at ${data.item.name}`,
                description: description,
                startDate: moment(dateTime).format('YYYY-MM-DD'),
                endDate: moment(dateTime).format('YYYY-MM-DD'),
                startTime: moment(dateTime).format('HH:mm'),
                endTime: moment(dateTime).format('HH:mm'),
                location: data.item.address,
                options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com'],
                timeZone: "America/New_York",
                iCalFileName: "TBD-Event",
              });
            }}
          >
            Add to Calendar
          </button>
        )
        :
        (
          <div className="inline-flex justify-start items-center text-xs mt-2">
            Loading <Loader size={'16'} className="animate-spin ml-2" />
          </div>
        )
      }
    </>
  );

}

export default AddToCalendar