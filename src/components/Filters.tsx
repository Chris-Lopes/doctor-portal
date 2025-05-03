import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  specialty: string;
  minFee: string;
  maxFee: string;
  sortBy: string;
  sortOrder: string;
}

const specialties = [
  "General Physician",
  "Internal Medicine",
  "Pediatrician",
  "Dermatologist",
  "Cardiologist",
  "Neurologist",
];

const sortOptions = [
  { label: "Rating: High to Low", value: "rating-desc" },
  { label: "Rating: Low to High", value: "rating-asc" },
  { label: "Fee: High to Low", value: "fee-desc" },
  { label: "Fee: Low to High", value: "fee-asc" },
];

export default function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    specialty: "",
    minFee: "",
    maxFee: "",
    sortBy: "rating",
    sortOrder: "desc",
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split("-");
    const newFilters = { ...filters, sortBy, sortOrder };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="w-full max-w-md">
      <div className="space-y-4">
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200">
                <span>Specialty</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-blue-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <div className="space-y-2">
                  {specialties.map((specialty) => (
                    <div key={specialty} className="flex items-center">
                      <input
                        type="radio"
                        id={specialty}
                        name="specialty"
                        value={specialty}
                        checked={filters.specialty === specialty}
                        onChange={(e) =>
                          handleFilterChange("specialty", e.target.value)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={specialty} className="ml-2 text-gray-700">
                        {specialty}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200">
                <span>Consultation Fee</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-blue-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="minFee"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Min Fee (₹)
                    </label>
                    <input
                      type="number"
                      id="minFee"
                      value={filters.minFee}
                      onChange={(e) =>
                        handleFilterChange("minFee", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="maxFee"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Max Fee (₹)
                    </label>
                    <input
                      type="number"
                      id="maxFee"
                      value={filters.maxFee}
                      onChange={(e) =>
                        handleFilterChange("maxFee", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200">
                <span>Sort By</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-blue-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <div className="space-y-2">
                  {sortOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        id={option.value}
                        name="sort"
                        value={option.value}
                        checked={
                          `${filters.sortBy}-${filters.sortOrder}` ===
                          option.value
                        }
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={option.value}
                        className="ml-2 text-gray-700"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
