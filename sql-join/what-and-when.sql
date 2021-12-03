select "films"."title",
       "films"."releaseYear",
       "categories"."name" as "category"
  from "films"
  join "filmCategory" using ("filmId")
  join "categories" using ("categoryId")
 where "films"."title" = 'Boogie Amelie';
