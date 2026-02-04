export default function Country(props: any) {
  return (
    <div className="country flex justify-between gap-6">
      <div className="flag-placeholder w-[15%]">
        <img src={props.flag} alt={props.countryName} />
      </div>
      <div className="name-placeholder w-[50%] lg:w-[20%] xl:w-[20%]">
        {props.countryName}
      </div>
      <div className="population-placeholder w-[25%]">
        {props.population.toLocaleString()}
      </div>
      <div className="area-placeholder hidden w-[25%] lg:block">
        {props.area?.toLocaleString() || "N/A"}
      </div>
      <div className="region-placeholder hidden w-[25%] xl:block">
        {props.region?.toLocaleString() || "N/A"}
      </div>
    </div>
  );
}
