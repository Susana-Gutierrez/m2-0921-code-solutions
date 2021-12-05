select "categories"."name" as "categories",
  count ("filmCategory".*) as "totalCategory"
  from "categories"
  join "filmCategory" using ("categoryId")
  join "castMembers" using ("filmId")
  join "actors" using ("actorId")
  where "actors"."firstName" =  'Lisa' and "actors"."lastName" = 'Monroe'
group by "categories"."categoryId";
