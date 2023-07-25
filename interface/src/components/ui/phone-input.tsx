/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import PhoneInputWithCountrySelect from 'react-phone-number-input';

import { Input } from '@/components/ui/input';
import { COUNTRIES } from '@/constants/countries';
import { cn } from '@/lib/utils';

type PhoneInputProps = {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
};

export const PhoneInput: React.FC<PhoneInputProps> = ({
  phoneNumber,
  setPhoneNumber,
}) => {
  const [query, setQuery] = useState('');

  // phone number input
  const [isPhoneNumberSelectOpen, setPhoneNumberSelectOpen] =
    useState<boolean>(false);
  const phoneNumberInputDivRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        phoneNumberInputDivRef.current &&
        !phoneNumberInputDivRef.current.contains(event.target as any) &&
        open
      ) {
        // onToggle();
        setPhoneNumberSelectOpen((prev) => !prev);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [phoneNumberInputDivRef]);

  return (
    <PhoneInputWithCountrySelect
      placeholder="Enter phone number"
      value={phoneNumber}
      onChange={setPhoneNumber}
      // flagUrl={`https://purecatamphetamine.github.io/country-flag-icons/3x2/{xx}.svg`}
      flagComponent={({ country, countryName }) => (
        <img
          alt={countryName}
          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
          className="inline object-contain w-6 h-4 mr-2 rounded-sm"
        />
      )}
      countryOptionsOrder={['🌐', '...']}
      countrySelectComponent={({ disabled, value, onChange }) => (
        <div className={cn('relative')}>
          <button
            type="button"
            className={`${
              disabled ? 'bg-zinc-100' : 'bg-zinc-950'
            } relative w-full border border-zinc-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-zinc-800 focus:border-zinc-800 sm:text-sm`}
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            onClick={() => setPhoneNumberSelectOpen((prev) => !prev)}
            disabled={disabled}
          >
            <span className="flex items-center truncate">
              {!value ? (
                <img
                  alt=""
                  src="/assets/flag-antarctica.png"
                  className="inline object-contain w-6 h-4 mr-2 rounded-sm"
                />
              ) : (
                <img
                  alt={`${value}`}
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value}.svg`}
                  className="inline object-contain w-6 h-4 mr-2 rounded-sm"
                />
              )}
              <span className="font-normal truncate text-zinc-300">
                {/* {selectedValue.title} */}
              </span>
            </span>
            <span
              className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${
                disabled ? 'hidden' : ''
              }`}
            >
              <svg
                className="w-5 h-5 text-zinc-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          <AnimatePresence>
            {isPhoneNumberSelectOpen && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="absolute z-10 w-full mt-1 text-base rounded-lg shadow-lg bg-zinc-800 max-h-80 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                tabIndex={-1}
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-option-3"
              >
                <div className="sticky top-0 z-10 overflow-hidden rounded-t-lg">
                  <li className="relative px-3 py-2 cursor-default select-none text-zinc-900 ">
                    <input
                      type="search"
                      name="search"
                      autoComplete={'off'}
                      className="block w-full rounded-md text-zinc-300 border-zinc-700 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder={'Search a country'}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </li>
                  <div className="h-[1px] w-full bg-zinc-600" />
                </div>

                <div
                  className={
                    'max-h-64 scrollbar scrollbar-track-zinc-100 scrollbar-thumb-zinc-300 hover:scrollbar-thumb-zinc-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll'
                  }
                >
                  <li
                    // key={`${id}-${index}`}
                    className={cn(
                      'relative flex items-center px-3 py-2 transition cursor-default select-none text-zinc-900 hover:bg-zinc-700',
                      !value && 'bg-zinc-700',
                    )}
                    id="listbox-option-0"
                    // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
                    role="option"
                    onClick={() => {
                      onChange('');
                      setQuery('');
                      // onToggle();
                      setPhoneNumberSelectOpen((prev) => !prev);
                    }}
                  >
                    <img
                      alt="International"
                      src="/assets/flag-antarctica.png"
                      className={
                        'inline mr-2 w-6 min-w-6 h-4 min-h-4 rounded-sm bg-zinc-600'
                      }
                    />

                    <span className="font-normal truncate text-zinc-300">
                      International
                    </span>
                    {!value ? (
                      <span className="flex items-center ml-auto text-zinc-200">
                        <Check size={20} strokeWidth={3} />
                      </span>
                    ) : null}
                  </li>

                  {COUNTRIES.filter((country) =>
                    country.title.toLowerCase().startsWith(query.toLowerCase()),
                  ).length === 0 ? (
                    <li className="relative py-2 pl-3 cursor-default select-none text-zinc-900 pr-9">
                      No countries found
                    </li>
                  ) : (
                    COUNTRIES.filter((country) =>
                      country.title
                        .toLowerCase()
                        .startsWith(query.toLowerCase()),
                    ).map((k, index) => {
                      return (
                        <li
                          // key={`${id}-${index}`}
                          key={`-${index}`}
                          className={cn(
                            'relative flex items-center px-3 py-2 transition cursor-default select-none text-zinc-900 hover:bg-zinc-700',
                            k === value && 'bg-zinc-700',
                          )}
                          id="listbox-option-0"
                          // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
                          role="option"
                          onClick={() => {
                            onChange(k.value);
                            setQuery('');
                            // onToggle();
                            setPhoneNumberSelectOpen((prev) => !prev);
                          }}
                        >
                          <img
                            alt={`${k.value}`}
                            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${k.value}.svg`}
                            className={cn(
                              'inline mr-2 w-6 min-w-6 h-4 min-h-4 rounded-sm bg-zinc-600',
                              'inline object-contain w-6 h-4 mr-2 rounded-sm',
                            )}
                          />

                          <span className="font-normal truncate text-zinc-300">
                            {k.title}
                          </span>
                          {k.value === value ? (
                            <span className="flex items-center ml-auto text-zinc-200">
                              <Check size={20} strokeWidth={3} />
                            </span>
                          ) : null}
                        </li>
                      );
                    })
                  )}
                </div>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      )}
      internationalIcon={() => (
        <img
          alt=""
          src="/assets/flag-antarctica.png"
          className="inline object-contain w-6 h-4 mr-2 rounded-sm"
        />
      )}
      inputComponent={Input}
    />
  );
};
