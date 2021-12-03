select "customers"."firstName",
       "customers"."lastName",
       sum("payments"."amount") as "totalAmount"
  from "customers"
  join "payments" using ("customerId")
group by "customers"."customerId"
order by "totalAmount" desc
