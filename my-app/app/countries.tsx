// components/Country.tsx
import Link from "next/link";

type CountryProps = {
  flag: string;
  countryName: string;
  population: number;
  area?: number;
  region?: string;
};

export default function Country(props: CountryProps) {
  return (
    <div className="country flex justify-between gap-6">
      <div className="flag-placeholder w-[15%]">
        <img src={props.flag} alt={props.countryName} />
      </div>
      <div className="name-placeholder w-[50%] lg:w-[20%] xl:w-[20%]">
        <Link
          href={`/individualCountries/${encodeURIComponent(props.countryName)}`}
        >
          {props.countryName}
        </Link>
      </div>
      <div className="population-placeholder w-[25%]">
        {props.population.toLocaleString()}
      </div>
      <div className="area-placeholder hidden w-[25%] lg:block">
        {props.area?.toLocaleString() || "N/A"}
      </div>
      <div className="region-placeholder hidden w-[25%] xl:block">
        {props.region || "N/A"}
      </div>
    </div>
  );
}
