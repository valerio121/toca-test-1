'use client';

import { cn } from '@/libs/functions';
import { ChevronDownIcon } from '@sanity/icons'; // Or any other chevron icon
import { useState } from 'react';

interface NewsletterSignupProps {
  title?: string;
  subtitle?: string;
  locations?: string[];
  // formAction?: string; // URL to submit the form to
}

export default function NewsletterSignup({
  title,
  subtitle,
  locations,
  // formAction = '#', // Default or from Sanity
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    // Basic client-side validation
    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      setMessage('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }
    if (locations && locations.length > 0 && !selectedLocation) {
      setMessage('Please select a location.');
      setIsSubmitting(false);
      return;
    }

    setMessage(
      `Thank you for subscribing with ${email} for ${selectedLocation || 'all locations'}! (Demo - not actually submitted)`
    );
    setIsSubmitting(false);
  };

  return (
    <section className='bg-black py-10 text-gray-300 md:py-12'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-12 md:px-8'>
        <div className='md:col-span-4 lg:col-span-5'>
          {title && <h2 className='font-serif text-3xl text-white italic md:text-4xl'>{title}</h2>}
          {subtitle && <p className='mt-2 text-sm text-gray-400'>{subtitle}</p>}
        </div>

        <div className='md:col-span-8 lg:col-span-7'>
          <form onSubmit={handleSubmit} className='grid grid-cols-1 items-end gap-4 sm:grid-cols-10'>
            <div className='sm:col-span-4'>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                type='email'
                name='email-address'
                id='email-address'
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter email address...'
                className='w-full border-0 border-b border-gray-600 bg-transparent py-2.5 text-white placeholder-gray-500 focus:border-white focus:ring-0 sm:text-sm'
                required
              />
            </div>

            {locations && locations.length > 0 && (
              <div className='relative sm:col-span-3'>
                <label htmlFor='location' className='sr-only'>
                  Location
                </label>
                <select
                  id='location'
                  name='location'
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className={cn(
                    'w-full appearance-none border-0 border-b border-gray-600 bg-transparent py-2.5 pr-8 pl-3 text-white focus:border-white focus:ring-0 focus:outline-none sm:text-sm',
                    selectedLocation ? 'text-white' : 'text-gray-500'
                  )}
                  required
                >
                  <option value='' disabled className='bg-black text-gray-500'>
                    Select location...
                  </option>
                  {locations.map((location) => (
                    <option key={location} value={location} className='bg-black text-white'>
                      {location}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className='pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-gray-500' />
              </div>
            )}

            <div className={cn('sm:col-span-2', !(locations && locations.length > 0) && 'sm:col-start-8')}>
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full border border-gray-600 px-4 py-2.5 text-sm font-medium text-white transition hover:border-white focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none disabled:opacity-50'
              >
                {isSubmitting ? 'Sending...' : 'SEND'}
              </button>
            </div>
          </form>
          {message && <p className='mt-3 text-xs text-gray-400'>{message}</p>}
        </div>
      </div>
    </section>
  );
}
