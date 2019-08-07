# Database Queries

## Find all customers with postal code 1010
SELECT c.* FROM Customers AS c where c.PostalCode = 1010;

## Find the phone number for the supplier with the id 11
SELECT s.Phone FROM Suppliers AS s WHERE s.SupplierID = 11;

## List first 10 orders ever places, descending by the order date
<!-- the first 10 orders requires us to sort by OrderDate ascending -->
<!-- then we need to return that set ordered by OrderDate descending -->
<!-- so we use a subquery -->
SELECT Subset.*
FROM (
  SELECT o.*
  FROM Orders AS o
  ORDER BY OrderDate ASC
  LIMIT 10
) AS Subset
ORDER BY OrderDate DESC;

<!-- - list first 10 orders placed, sorted descending by the order date. The order with date 1997-02-12 should be at the top. -->
<!-- this indicates that the prompt is actually asking you to return the _last 10 orders placed_ rather than the _first 10_, as you're sorting descending by OrderDate. this query would be: -->
SELECT o.*
FROM Orders AS o
ORDER BY OrderDate DESC
LIMIT 10

## Find all customers that live in London, Madrid, or Brazil
SELECT c.*
FROM Customers AS c
WHERE 
  c.City in ('London', 'Madrid') OR 
  c.Country = 'Brazil';

## Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ("The Shire", "Bilbo Baggins", "1 Hobbit-Hole", "Bag End", "111", "Middle Earth");

## Update Bilbo Baggins record so that the postal code changes to "11122"
UPDATE Customers AS c
SET PostalCode = '11122'
WHERE c.CustomerName = "The Shire";

## (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted
SELECT COUNT(*) AS CitiesCount FROM (SELECT DISTINCT c.City FROM Customers AS c) as DistinctCities

## (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
SELECT s.* FROM Suppliers AS s
WHERE length(s.SupplierName) > 20;