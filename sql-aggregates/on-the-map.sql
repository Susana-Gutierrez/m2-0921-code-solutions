select "countries"."name" as "countries",
       count("cities".*) as "numberOfCities"
  from "cities"
  join "countries" using ("countryId")
group by "countries"."countryId";
