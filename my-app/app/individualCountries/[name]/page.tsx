type Props = { params: { name?: string } };

export default async function CountryPage({ params }: Props) {
  const resolvedParams = await params;
  const name = resolvedParams.name;

  if (!name) return <div>Invalid country name</div>;

  const res = await fetch(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=false`,
  );

  if (!res.ok) return <div>Country not found</div>;

  const data = await res.json();
  const country = data[0];

  // Handle neighboring countries if available
  const neighbours = country.borders || [];

  // Fetch neighbour countries details
  const neighbourData = await Promise.all(
    neighbours.map(async (code: string) => {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data[0];
    }),
  );

  return (
    <div className="main flex min-h-screen flex-col items-center justify-center">
      <div className="absolute top-[0%] -z-10 h-[30%] w-[100%] items-start bg-[url('/resources/hero-image-sm.jpg')] bg-cover bg-center bg-no-repeat"></div>
      <div className="mh-[80vh] container mt-[19vh] box-border flex w-[95%] flex-col gap-7 rounded-[12px] border-[0.5px] border-solid border-[#555555] bg-[#1c1d1f] pt-[8%] pr-[4%] pb-[6%] pl-[4%] lg:mt-[15vh] lg:w-[100%] lg:flex-row lg:flex-wrap lg:overflow-hidden lg:pt-[4%]">
        <div className="container flex flex-col">
          {/* Country Flag */}
          <div className="country-flag mt-[-20%] flex w-[100%] justify-center">
            <img src={country.flags.png} alt={country.name.common} />
          </div>

          {/* Country Name */}
          <div className="country-name flex flex-col items-center text-[20px]">
            <div className="country-real-name">{country.name.common}</div>
            <div className="country-sub-name text-[18px]">
              {country.name.official}
            </div>
          </div>

          {/* Statistics */}
          <div className="statistics flex justify-between gap-[6%]">
            <div className="population flex w-[50%] justify-between rounded-[12px] bg-[#282b30] p-[3%]">
              <span className="population">Population</span>
              <div className="population-placeholder">
                {country.population.toLocaleString()}
              </div>
            </div>
            <div className="area flex w-[40%] w-[50%] justify-between rounded-[12px] bg-[#282b30] p-[3%]">
              <span className="area">Area(km²)</span>
              <div className="area-placeholder">
                {country.area.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Other Country Info */}
          <div className="other-country-info">
            <div className="capital flex w-[100%] justify-between p-[3%]">
              <span className="capital">Capital</span>
              <span className="capital-placeholder">
                {country.capital?.[0] || "N/A"}
              </span>
            </div>
            <div className="subregion flex w-[100%] justify-between p-[3%]">
              <span className="subregion">Subregion</span>
              <span className="subregion-placeholder">
                {country.subregion || "N/A"}
              </span>
            </div>
            <div className="language flex w-[100%] justify-between p-[3%]">
              <span className="language">Language</span>
              <span className="language-placeholder">
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "N/A"}
              </span>
            </div>
            <div className="currencies flex w-[100%] justify-between p-[3%]">
              <span className="currencies">Currencies</span>
              <span className="currencies-placeholder">
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((c: any) => c.name)
                      .join(", ")
                  : "N/A"}
              </span>
            </div>
            <div className="Continents flex w-[100%] justify-between p-[3%]">
              <span className="Continents">Continent</span>
              <span className="currencies-placeholder">
                {country.continents?.join(", ") || "N/A"}
              </span>
            </div>
          </div>

          {/* Neighbouring Countries */}
          <div className="neighbour-countries test flex w-[100%] flex-col">
            Neighbouring Countries
            <div className="holder flex flex-wrap gap-6">
              {neighbourData.length > 0 ? (
                neighbourData.map(
                  (n) =>
                    n && (
                      <div
                        key={n.cca3}
                        className="neighbour-countries test1 flex w-[20%] flex-col"
                      >
                        <div className="neighbour-flag w-[70%]">
                          <img src={n.flags.png} alt={n.name.common} />
                        </div>
                        <div className="neighbour-name-placeholder">
                          {n.name.common}
                        </div>
                      </div>
                    ),
                )
              ) : (
                <div>No neighbouring countries</div>
              )}
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
