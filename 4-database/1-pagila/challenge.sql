/*
Challenge 1.
Write a SQL query that counts the number of films in each category in the Pagila database.
- The query should return two columns: category and film_count
- category should display the name of each category
- film_count should show the total number of films in that category
- Results should be grouped by category name
 */
-- your query here
SELECT
    c.name AS category,
    COUNT(*) AS film_count
FROM
    public.category c INNER JOIN public.film_category fc 
    ON 
    fc.category_id = c.category_id
GROUP BY
    c.name;

/*
Challenge 2.
Write a SQL query that finds the top 5 customers who have spent the most money in the Pagila database.
- The query should return three columns: first_name, last_name, and total_spent
- total_spent should show the sum of all payments made by that customer
- Results should be ordered by total_spent in descending order
- The query should limit results to only the top 5 highest-spending customers
 */
-- your query here
SELECT
    c.first_name,
    c.last_name,
    SUM(p.amount) as total_spent
FROM
    public.payment p INNER JOIN public.customer c 
ON 
    p.customer_id = c.customer_id
GROUP BY
    c.customer_id
ORDER BY
    total_spent DESC
FETCH FIRST
    5 ROW ONLY;

/*
Challenge 3.
Write a SQL query that lists all film titles that have not been rented in the past 10 years in the Pagila database.
- The query should return one column: title
- title should display the name of each film that hasn't been rented
- The time period for "recent" should be within the last 10 years from the current date
- Results should only include films that have no rental records in this time period
 */
-- your query here
SELECT
    f.title
FROM
    public.film f
WHERE
    f.film_id not in (
        SELECT
            i.film_id
        FROM
            public.inventory i JOIN public.rental r 
        ON 
            i.inventory_id = r.inventory_id
        WHERE
            r.rental_date >= current_date - interval '10 years'
    );
    /*
    Challenge 4.
    Write a SQL query that lists all films that have never been rented in the Pagila database.
    - The query should return two columns: title and inventory_id
    - title should display the name of each film that has never been rented
    - inventory_id should show the inventory ID of the specific copy
     */
    -- your query here
WITH
    films_with_no_rentals AS (
        SELECT
            i.film_id,
            i.inventory_id
        FROM
            public.rental r FULL OUTER JOIN public.inventory i 
        ON 
            r.inventory_id = i.inventory_id
        WHERE
            i.inventory_id NOT IN (
                SELECT
                    inventory_id
                FROM
                    rental
            )
        GROUP BY
            i.film_id,
            i.inventory_id
    )
SELECT
    f.title,
    fwnr.inventory_id
FROM
    public.film f INNER JOIN films_with_no_rentals fwnr 
ON 
    f.film_id = fwnr.film_id;
    /*
    Challenge 5.
    Write a SQL query that lists all films that were rented more times than the average rental count per film in the Pagila database.
    - The query should return two columns: title and rental_count
    - title should display the name of each film
    - rental_count should show the total number of times the film was rented
     */
    -- your query here
WITH movies_count_rented AS(

	SELECT 
        i.film_id,
        COUNT(*) as times_rented
	FROM
        public.rental r INNER JOIN public.inventory i
	ON 
        r.inventory_id = i.inventory_id
	GROUP BY 
        i.film_id
	ORDER BY 
        i.film_id

), average_count_rented AS(
SELECT 
	AVG(times_rented)::numeric(10,0) AS average_rental_count 
FROM 
	movies_count_rented
)
SELECT 
    f.title, mcr.times_rented
FROM 
    public.film f JOIN movies_count_rented mcr
ON 
    f.film_id=mcr.film_id
WHERE 
    times_rented > ( SELECT * FROM average_count_rented)
ORDER BY 
    mcr.times_rented DESC;

    /*
Challenge 6.
Write a SQL query that calculates rental activity for each customer.
- The query should return the customer's first_name and last_name
- It should also return their first rental date as first_rental
- Their most recent rental date should be shown as last_rental
- The difference in days between the first and last rentals should be shown as rental_span_days
- Results should be grouped by customer and ordered by rental_span_days in descending order
    */
-- your query here
SELECT 
    c.first_name,
    c.last_name,
    MIN(r.rental_date) AS first_rental,
    MAX(r.rental_date) AS last_rental,
    DATE_PART('day', MAX(r.rental_date) - MIN(r.rental_date)) AS rental_span_days
FROM 
    public.customer c
JOIN 
    public.rental r ON c.customer_id = r.customer_id
GROUP BY 
    c.customer_id, c.first_name, c.last_name
ORDER BY 
    rental_span_days DESC;

/*
Challenge 7.
Find all *customers who have not rented movies from *every available genre*.
- The result should include the customer's first_name and last_name
- Only include customers who are missing at least one genre in their rental history
    */
-- your query here

WITH total_count_of_genres AS (
	SELECT 
		COUNT(*) AS genre_count
	FROM 
		public.category cat
), customer_genre_rented AS (
	SELECT
	    r.customer_id,
		COUNT(DISTINCT fc.category_id) AS genre_rented
	FROM 
		public.rental r JOIN public.inventory i
	ON 
		r.inventory_id = i.inventory_id JOIN public.film_category fc
	ON 
		i.film_id = fc.film_id
	GROUP BY 
		r.customer_id
	ORDER BY 
		r.customer_id
)
SELECT 
    c.first_name,
    c.last_name
FROM 
    public.customer c JOIN customer_genre_rented cgr
ON 
    c.customer_id = cgr.customer_id
WHERE cgr.genre_rented < (
	SELECT *
	FROM total_count_of_genres
)
ORDER BY 
	c.last_name,
    c.first_name
/*
Bonus Challenge 8 (opt)
Find the Top 3 Most Frequently Rented Films in Each Category and Their Total Rental Revenue.
- The result should include the film title, category name, rental count, and total revenue
- Only the top 3 films per category should be returned
- Results should be ordered by category and ranking within the category
    */
-- your query here