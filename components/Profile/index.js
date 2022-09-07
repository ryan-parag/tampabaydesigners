import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Avatar from '@components/Avatar'
import Link from 'next/link'

export default function Profile({ sm }) {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <Link href="/profile">
        <a className="transition inline-block hover:scale-105">
          <Avatar
            name={user.name}
            img={user.picture}
            sm={sm ? true : false}
          />
        </a>
      </Link>
    )
  );
}