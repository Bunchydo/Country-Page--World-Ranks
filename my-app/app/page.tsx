"use client";

import Country from "./countries";
import "./globals.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [countries, setCountries] = useState<any[]>([]); // store multiple countries
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<string>("population");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]); // multiple regions
  const [isUNMemberOnly, setIsUNMemberOnly] = useState(false);
  const [isIndependentOnly, setIsIndependentOnly] = useState(false);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,unMember,independent,area",
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched countries:", data);
        setCountries(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let filtered = countries.filter((country) => {
      const name = country.name?.common?.toLowerCase() || "";
      const region = country.region?.toLowerCase() || "";
      const search = searchInput.toLowerCase();

      const matchesSearch = name.includes(search);

      const matchesRegion =
        selectedRegions.length > 0 ? selectedRegions.includes(region) : true;

      const matchesUN = isUNMemberOnly ? country.unMember === true : true;

      const matchesIndependent = isIndependentOnly
        ? country.independent === true
        : true;

      return matchesSearch && matchesRegion && matchesUN && matchesIndependent;
    });

    // sorting (unchanged)
    if (sortBy === "population") {
      filtered.sort((a, b) => b.population - a.population);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sortBy === "area") {
      filtered.sort((a, b) => a.area - b.area);
    }
    setFilteredCountries(filtered);
  }, [
    searchInput,
    countries,
    sortBy,
    selectedRegions,
    isUNMemberOnly,
    isIndependentOnly,
  ]);

  return (
    <div className="main flex min-h-screen flex-col items-center justify-center">
      <div className="absolute top-[0%] -z-10 h-[30%] w-[100%] items-start bg-[url('/resources/hero-image-sm.jpg')] bg-cover bg-center bg-no-repeat"></div>

      {/*Country Holder Container*/}
      <div className="container mt-[22vh] box-border flex w-[95%] flex-col gap-7 rounded-[12px] border-[0.5px] border-solid border-[#555555] bg-[#1c1d1f] pt-[8%] pr-[4%] pl-[4%] lg:mt-[15vh] lg:w-[100%] lg:flex-row lg:flex-wrap lg:overflow-hidden lg:pt-[4%]">
        <div className="top-section hidden lg:mb-[3%] lg:flex lg:w-[100%] lg:justify-between">
          <div className="1st-row w-[20%] text-[18px] lg:block">
            Found {filteredCountries.length} Countries
          </div>
          <div className="search box-border w-[100%] justify-center gap-[3%] rounded-[13px] bg-[#282b30] pt-[1%] pb-[1%] lg:block lg:flex lg:w-[30%]">
            <img className="h-auto w-[7%]" src="/resources/Search.svg" alt="" />

            <input
              className="search-stuff w-[80%] font-bold"
              type="text"
              name=""
              id=""
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                console.log(e.target.value);
              }}
              placeholder="Search by Name, Region..."
            />
          </div>
        </div>
        {/*Filters Section For Everything*/}
        <div className="filters-section border-box flex w-[100%] flex-col gap-8 lg:w-[35%] lg:gap-10 xl:w-[30%]">
          <div className="1st-row w-[80%] text-[18px] lg:hidden">
            Found {filteredCountries.length} Countries
          </div>
          {/*Search Button*/}
          <div className="search box-border flex w-[100%] justify-center gap-[3%] rounded-[13px] bg-[#282b30] pt-[1%] pb-[1%] lg:hidden">
            <img className="h-auto w-[7%]" src="/resources/Search.svg" alt="" />

            <input
              className="search-stuff w-[60%] font-bold"
              type="text"
              name=""
              id=""
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                console.log(e.target.value);
              }}
              placeholder="Search by Name, Region..."
            />
          </div>
          {/*Sort By */}
          <div className="sort-by border-box relative flex w-[100%] flex-col">
            <span>Sort by</span>
            <select
              className="appearance-none rounded-[12px] border border-[#72767c] bg-[#1c1d1f] bg-[url('/resources/Expand_down.svg')] bg-[right_4%_center] bg-no-repeat pt-2 pr-[40px] pb-2 pl-[3%]"
              name=""
              id=""
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="population">Population</option>
              <option value="name">Alphabetical Order</option>{" "}
              <option value="area">Area(km²)</option>
            </select>
          </div>

          {/*Region Section*/}
          <div className="region-box flex h-auto flex-wrap gap-[10%] font-bold">
            <div className="region-title w-[100%]">Region</div>
            {[
              "americas",
              "antarctic",
              "africa",
              "asia",
              "europe",
              "oceania",
            ].map((region) => (
              <button
                key={region}
                value={region}
                className={`rounded px-4 py-2 ${
                  selectedRegions.includes(region)
                    ? "rounded-[12px] bg-blue-500 text-white"
                    : "text-gray-200"
                }`}
                onClick={() => {
                  if (selectedRegions.includes(region)) {
                    // remove region if already selected
                    setSelectedRegions(
                      selectedRegions.filter((r) => r !== region),
                    );
                  } else {
                    // add region
                    setSelectedRegions([...selectedRegions, region]);
                  }
                }}
              >
                {region.charAt(0).toUpperCase() + region.slice(1)}
              </button>
            ))}
          </div>
          {/*Status Section*/}
          <div className="status-section flex flex-col gap-3">
            Status
            <div className="united-nations-member flex gap-[7%]">
              <input
                type="checkbox"
                checked={isUNMemberOnly}
                onChange={(e) => setIsUNMemberOnly(e.target.checked)}
                className="h-6 w-6 cursor-pointer rounded-[12px] accent-blue-500"
              />{" "}
              Member of the United Nations
            </div>
            <div className="Independent flex gap-[7%]">
              <input
                type="checkbox"
                checked={isIndependentOnly}
                onChange={(e) => setIsIndependentOnly(e.target.checked)}
                className="h-6 w-6 cursor-pointer rounded-[12px] accent-blue-500"
              />{" "}
              Independent
            </div>
          </div>
        </div>

        <div className="country-information-table flex flex-col lg:h-[90vh] lg:w-[55%]">
          <div className="country-table-column flex justify-between gap-6">
            <div className="flag w-[15%]">Flag</div>
            <div className="name w-[50%] lg:w-[20%] xl:w-[20%]">Name</div>
            <div className="population w-[25%]">Population</div>
            <div className="area hidden lg:block lg:w-[25%]">Area(km²)</div>
            <div className="region hidden w-[25%] xl:block">Region</div>
          </div>
          <hr className="mt-[3%] mb-[7%]" />
          {/* Map over all countries */}
          <div className="hide-scrollbar scrolling-column flex flex-1 lg:overflow-y-auto">
            <div className="flex flex-col gap-y-8">
              {filteredCountries.map((country, index) => (
                <Country
                  key={index}
                  flag={country.flags?.png || ""}
                  countryName={country.name?.common || ""}
                  population={country.population || 0}
                  area={country.area || 0}
                  region={country.region || ""}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
